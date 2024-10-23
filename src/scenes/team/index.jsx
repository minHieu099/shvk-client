import React, { useState, useEffect } from 'react';
import { Box, Select, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, IconButton, Button } from '@mui/material';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import officersData from '../data/officers.json';
import AddOfficerModal from './AddOfficerModal';

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
        width: '8%',         // Độ rộng của select
        marginLeft: '1%',     // Cách lề trái 3%
        height: '42px',
      }}
    >
      <MenuItem value="Tất cả">Tất cả</MenuItem>
      <MenuItem value="Cụm 21">Cụm 21</MenuItem>
      <MenuItem value="Cụm 22">Cụm 22</MenuItem>
      <MenuItem value="Cụm 23">Cụm 23</MenuItem>
    </Select>

    <Button
      variant="contained"
      style={{
        backgroundColor: 'green',   // Màu xanh lá cây
        color: 'white',             // Chữ trắng
        width: '10%',               // Độ rộng button
        marginRight: '1%',          // Cách lề phải 3%
//        padding: '6px',             // Padding để tạo chiều cao hơn chữ 6px
        display: 'flex',            // Sử dụng flexbox để căn giữa chữ
        justifyContent: 'center',   // Căn giữa chữ theo chiều ngang
        alignItems: 'center',       // Căn giữa chữ theo chiều dọc
        height: '42px',
      }}
      onClick={() => setIsModalOpen(true)}
    >
      Thêm cán bộ
    </Button>
  </Box>

  <AddOfficerModal open={isModalOpen} onClose={() => setIsModalOpen(false)} onAdd={handleAddOfficer} />

  <TableContainer component={Paper} style={{ margin: '0 1%', width: '98%' }}>  {/* Cách đều 2 lề khoảng 3% */}
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>Họ tên</TableCell>
          <TableCell style={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>Cấp bậc</TableCell>
          <TableCell style={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>Đơn vị</TableCell>
          <TableCell style={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>Chức vụ</TableCell>
          <TableCell style={{ fontWeight: 'bold', backgroundColor: '#1976d2', color: 'white', textAlign: 'center' }}>Chức năng</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {filteredOfficers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((officer, index) => (
          <TableRow key={index}>
            <TableCell style={{ textAlign: 'center' }}>{officer['Họ tên']}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{officer['Cấp bậc']}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{officer['Đơn vị']}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>{officer['Chức vụ']}</TableCell>
            <TableCell style={{ textAlign: 'center' }}>
              <IconButton><Visibility /></IconButton>
              <IconButton><Edit /></IconButton>
              <IconButton><Delete /></IconButton>
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
