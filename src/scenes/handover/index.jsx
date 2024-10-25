import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from "@mui/material";
import { Visibility, Edit, Delete, CheckCircle, Description } from '@mui/icons-material';
import handOverData from '../data/handOverData.json';
import DetailDialog from './DetailDialog';

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

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thời gian</TableCell>
              <TableCell>Trực chỉ huy</TableCell>
              <TableCell>Trực ban trưởng cũ</TableCell>
              <TableCell>Trực ban phó cũ</TableCell>
              <TableCell>Trực ban trưởng mới</TableCell>
              <TableCell>Trực ban phó mới</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {handOverData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => (
              <TableRow key={index}>
                <TableCell>{data.thoigian}</TableCell>
                <TableCell>{data.truc_CH}</TableCell>
                <TableCell>{data.truc_ban_cu_1}</TableCell>
                <TableCell>{data.truc_ban_cu_2}</TableCell>
                <TableCell>{data.truc_ban_moi_1}</TableCell>
                <TableCell>{data.truc_ban_moi_2}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(data)}><Visibility /></IconButton>
                  <IconButton><Description /></IconButton>
                  <IconButton><Edit /></IconButton>
                  <IconButton><Delete /></IconButton>
                  <IconButton><CheckCircle /></IconButton>
                </TableCell>
              </TableRow>
            ))}
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
