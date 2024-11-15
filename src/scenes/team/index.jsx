import React, { useState, useEffect } from 'react';
import { Box, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Button } from '@mui/material';
import { Visibility, Edit, Delete, PersonAdd } from '@mui/icons-material';
import officersData from '../data/officers.json';
import AddOfficerModal from './AddOfficerModal';
import Tooltip from '@mui/material/Tooltip';

function Team() {
  const [selectedGroup, setSelectedGroup] = useState('Tất cả');
  const [filteredOfficers, setFilteredOfficers] = useState(officersData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selectedGroup === 'Tất cả') {
      setFilteredOfficers(officersData);
    } else {
      setFilteredOfficers(officersData.filter(officer => officer['Đơn vị'].includes(selectedGroup)));
    }
  }, [selectedGroup]);

  const handleAddOfficer = (newOfficer) => {
    setFilteredOfficers([...filteredOfficers, newOfficer]);
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
  <Box display="flex" justifyContent="space-between" mb={2}>
    <Select
      value={selectedGroup}
      onChange={(e) => setSelectedGroup(e.target.value)}
      displayEmpty
      style={{
        width: '10%',        
        marginLeft: '1%',     
        height: '42px',
      }}
    >
      <MenuItem value="Tất cả">Tất cả</MenuItem>
      <MenuItem value="Cụm 21">Cụm 21</MenuItem>
      <MenuItem value="Cụm 22">Cụm 22</MenuItem>
      <MenuItem value="Cụm 23">Cụm 23</MenuItem>
    </Select>

    <Button
      className="create-new-btn"
      variant="contained"
      style={{
        width: '12%',
        marginRight: '1%',
        // height: '42px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onClick={() => setIsModalOpen(true)}
      startIcon={<PersonAdd />}
    >
      <span style={{ marginTop: '5px' }}>Thêm cán bộ</span>
    </Button>
  </Box>

  <AddOfficerModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddOfficer} />

  <TableContainer component={Paper} style={{ margin: '0 1%', width: '98%' }}>  {/* Cách đều 2 lề khoảng 3% */}
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Họ tên</TableCell>
          <TableCell>Cấp bậc</TableCell>
          <TableCell>Đơn vị</TableCell>
          <TableCell>Chức vụ</TableCell>
          <TableCell>Chức năng</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredOfficers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((officer, index) => (
          <TableRow key={index}>
            <TableCell>{officer['Họ tên']}</TableCell>
            <TableCell>{officer['Cấp bậc']}</TableCell>
            <TableCell>{officer['Đơn vị']}</TableCell>
            <TableCell>{officer['Chức vụ']}</TableCell>
            {/* <TableCell>
              <IconButton><Visibility /></IconButton>
              <IconButton><Edit /></IconButton>
              <IconButton><Delete /></IconButton>
            </TableCell> */}
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
      count={filteredOfficers.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </TableContainer>
</Box>

  );
}

export default Team;
