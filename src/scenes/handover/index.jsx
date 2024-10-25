import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from "@mui/material";
import { Visibility, Edit, Delete, CheckCircle, Description } from '@mui/icons-material';
import handOverData from '../data/handOverData.json';
import DetailDialog from './DetailDialog';
import Tooltip from '@mui/material/Tooltip';

const Handover = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpen = (data) => {
    setSelectedData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedData(null);
  };

  const today = new Date();
  const todayFormatted = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`; // Format today's date as 'DD/MM/YYYY'

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thời gian</TableCell>
              <TableCell>Trực chỉ huy</TableCell>
              <TableCell>Trực ban trưởng cũ</TableCell>
              <TableCell>Trực ban trưởng mới</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {handOverData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
              const isToday = data.thoigian === todayFormatted; // Check if the date matches today
              return (
                <TableRow key={index} style={{ backgroundColor: isToday ? '#f0f8ff' : 'inherit' }}>
                  <TableCell>{data.thoigian}</TableCell>
                  <TableCell>{data.truc_CH}</TableCell>
                  <TableCell>{data.truc_ban_cu_1}</TableCell>
                  <TableCell>{data.truc_ban_moi_1}</TableCell>
                  <TableCell>
                    {/* <IconButton onClick={() => handleOpen(data)}><Visibility /></IconButton> */}
                    <Tooltip title="Xem chi tiết">
                <IconButton><Visibility sx={{ color: '#6c6cd0f0' }} onClick={() => handleOpen(data)} /></IconButton>
              </Tooltip>
            
              <Tooltip title="Chỉnh sửa">
                <IconButton><Edit sx={{ color: '#e8a90e' }} /></IconButton>
              </Tooltip>
            
              <Tooltip title="Xóa">
                <IconButton><Delete sx={{ color: '#f52c2cdb' }}/></IconButton>
              </Tooltip>
              <Tooltip title="Phê duyệt">
                <IconButton><CheckCircle sx={{ color: '#3bc73b' }}/></IconButton>
              </Tooltip>
                    {/* <IconButton><CheckCircle /></IconButton> */}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={handOverData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <DetailDialog open={open} onClose={handleClose} data={selectedData} />
    </>
  );
};

export default Handover;
