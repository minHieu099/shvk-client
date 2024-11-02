import React, { useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Button } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';

import ExcelUploader from './ExcelUploader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import dutyScheduleData from '../data/duty_schedule.json';
import Tooltip from '@mui/material/Tooltip';

const ScheduleManagement = () => {
  const [scheduleData, setScheduleData] = useState(dutyScheduleData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleDataUploaded = (newData) => {
    if (newData && newData.length > 0) {
      setScheduleData(newData);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <ToastContainer />
      <ExcelUploader 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDataUploaded={handleDataUploaded}
      />
      <Box display="flex" justifyContent="flex-end" mb={2}>

    <Button
      className="create-new-btn"
      variant="contained"
      style={{
        width: '15%',               // Độ rộng button
      }}
      onClick={() => setIsModalOpen(true)}
    >
      Tạo mới lịch trực
    </Button>
  </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ngày</TableCell>
              <TableCell>Trực giám sát</TableCell>
              <TableCell>Trực trinh sát</TableCell>
              <TableCell>Trực BĐATTT</TableCell>
              <TableCell>Trực ban tác chiến</TableCell>
              <TableCell>Trực chỉ huy</TableCell>
              <TableCell>Chức năng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduleData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((schedule, index) => (
              <TableRow key={index}>
                <TableCell>{schedule['Ngày']}</TableCell>
                <TableCell>{schedule['Trực giám sát']}</TableCell>
                <TableCell>{schedule['Trực trinh sát']}</TableCell>
                <TableCell>{schedule['Trực BĐATTT']}</TableCell>
                <TableCell>{schedule['Trực ban tác chiến']}</TableCell>
                <TableCell>{schedule['Trực chỉ huy']}</TableCell>
                <TableCell>
                <Tooltip title="Xem chi tiết">
                <IconButton><Visibility sx={{ color: '#6c6cd0f0' }} /></IconButton>
              </Tooltip>
            
              <Tooltip title="Chỉnh sửa">
                <IconButton><Edit sx={{ color: '#e8a90e' }} /></IconButton>
              </Tooltip>
            
              <Tooltip title="Xóa">
                <IconButton><Delete sx={{ color: '#f52c2cdb' }}/></IconButton>
              </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={scheduleData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}

export default ScheduleManagement;
