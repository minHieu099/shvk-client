import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from "@mui/material";
import { Visibility, Edit, Delete, CheckCircle } from '@mui/icons-material';
import handOverData from '../data/handOverData.json';
import DetailDialog from './DetailDialog';
import Tooltip from '@mui/material/Tooltip';
import EditModal from './EditModal';
import renderGbnTT from "../../export/giaobanngayTT";
import { saveAs } from "file-saver";
import { Packer } from "docx";
import ImageBased64 from "../data/ImageBased64";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Handover = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [data, setData] = useState(handOverData);

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

  const handleEditOpen = (data) => {
    setSelectedData(data);
    setEditOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedData(null);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedData(null);
  };

  const handleSave = (updatedData) => {
    const updatedDataList = data.map(item => item.id === updatedData.id ? updatedData : item);
    setData(updatedDataList);
    console.log('Updated Data:', updatedDataList);
    setEditOpen(false);

  
    toast.success("Cập nhật thành công!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleApprove = (data) => {
    const docData = {
      ...data,
      signatureImage: ImageBased64
    };
    const doc = renderGbnTT(docData);

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `Bàn giao kíp trực.docx`);
    });
  };

  const today = new Date();
  const todayFormatted = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

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
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, index) => {
              const isToday = data.thoigian === todayFormatted;
              return (
                <TableRow key={index} style={{ backgroundColor: isToday ? '#f0f8ff' : 'inherit' }}>
                  <TableCell>{data.thoigian}</TableCell>
                  <TableCell>{data.truc_CH}</TableCell>
                  <TableCell>{data.truc_ban_cu_1}</TableCell>
                  <TableCell>{data.truc_ban_moi_1}</TableCell>
                  <TableCell>
                    <Tooltip title="Xem chi tiết">
                      <IconButton onClick={() => handleOpen(data)}><Visibility sx={{ color: '#6c6cd0f0' }} /></IconButton>
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                      <IconButton onClick={() => handleEditOpen(data)}><Edit sx={{ color: '#e8a90e' }} /></IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton><Delete sx={{ color: '#f52c2cdb' }} /></IconButton>
                    </Tooltip>
                    <Tooltip title="Phê duyệt">
                      <IconButton onClick={() => handleApprove(data)}><CheckCircle sx={{ color: '#3bc73b' }} /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <DetailDialog open={open} onClose={handleClose} data={selectedData} />
      <EditModal open={editOpen} onClose={handleEditClose} data={selectedData} onSave={handleSave} />
      <ToastContainer /> {/* Hiển thị ToastContainer để quản lý các thông báo */}
    </>
  );
};

export default Handover;
