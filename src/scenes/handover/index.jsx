import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Visibility, Edit, Delete, CheckCircle, FileDownload } from '@mui/icons-material';
import handOverData from '../data/handOverData.json';
import DetailDialog from './DetailDialog';
import Tooltip from '@mui/material/Tooltip';
import EditModal from './EditModal';
import renderGbnTT from "../../export/giaobanngayTT";
import renderGbnTTBatch from "../../export/giaobanngayTTBatch";
import { saveAs } from "file-saver";
import { Packer } from "docx";
import ImageBased64 from "../data/ImageBased64";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundMusic from "../../assets/music/backgroundMusic.mp3";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { DateField } from '@mui/x-date-pickers/DateField';

import { LicenseInfo } from '@mui/x-license';

LicenseInfo.setLicenseKey('x0jTPl0USVkVZV0SsMjM1kDNyADM5cjM2ETPZJVSQhVRsIDN0YTM6IVREJ1T0b9586ef25c9853decfa7709eee27a1e');


const Handover = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [data, setData] = useState(handOverData);
  // const [selectedDate, setSelectedDate] = useState(dayjs());
  const [value, setValue] = useState(dayjs('2023-01-01'));
  const [openExportModal, setOpenExportModal] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: dayjs(),
    endDate: dayjs()
  });

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
      
      toast.success("Bàn giao thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  };

  // const handleDateChange = (newDate) => {
  //   setSelectedDate(newDate);
  //   const formattedDate = newDate.format('DD/MM/YYYY');
  //   const filteredData = handOverData.filter(item => item.thoigian === formattedDate);
  //   setData(filteredData);
  // };

  const today = new Date();
  const todayFormatted = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear()}`;

  const handleExportModalOpen = () => setOpenExportModal(true);
  const handleExportModalClose = () => setOpenExportModal(false);
  
  const handleExportBatch = () => {
    const startDateFormatted = dateRange.startDate.format('DD/MM/YYYY');
    const endDateFormatted = dateRange.endDate.format('DD/MM/YYYY');
    
    const filteredData = data
      .filter(item => {
        const itemDate = dayjs(item.thoigian, 'DD/MM/YYYY');
        const start = dateRange.startDate.startOf('day');
        const end = dateRange.endDate.endOf('day');
        
        return itemDate.isAfter(start) || itemDate.isSame(start) && 
               (itemDate.isBefore(end) || itemDate.isSame(end));
      })
      .sort((a, b) => {
        // Chuyển đổi chuỗi ngày thành đối tượng dayjs để so sánh
        const dateA = dayjs(a.thoigian, 'DD/MM/YYYY');
        const dateB = dayjs(b.thoigian, 'DD/MM/YYYY');
        return dateA.diff(dateB); // Sắp xếp tăng dần
      });

    // Sử dụng hàm renderGbnTTBatch với dữ liệu đã được sắp xếp
    const doc = renderGbnTTBatch({
      startDate: startDateFormatted,
      endDate: endDateFormatted,
      reports: filteredData,
      signatureImage: ImageBased64
    });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `Báo cáo giao ban ${startDateFormatted} đến ${endDateFormatted}.docx`);
      handleExportModalClose();
      
      toast.success("Xuất quyển báo cáo thành công!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
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
      <ToastContainer /> 

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Chọn ngày"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            format="DD/MM/YYYY"
          />
        </LocalizationProvider> */}
        
        <Button 
          variant="contained" 
          sx={{ 
            bgcolor: '#1976d2',
            color: 'white',
            '&:hover': { bgcolor: '#1565c0' },
            display: 'flex',
            alignItems: 'center',
          }}
          onClick={handleExportModalOpen}
          startIcon={<FileDownload />}
        >
          Xuất quyển báo cáo
        </Button>
      </Box>

      <Dialog 
        open={openExportModal} 
        onClose={handleExportModalClose}
        maxWidth="sm"
        PaperProps={{
          sx: {
            position: 'fixed',
            top: '23%',  // Di chuyển dialog lên phía trên
            m: 0  // Xóa margin mặc định
          }
        }}
      >
        <DialogTitle>Chọn khoảng thời gian xuất báo cáo</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box sx={{ mb: 2 }}>
                <DatePicker
                  label="Từ ngày"
                  value={dateRange.startDate}
                  onChange={(newValue) => setDateRange(prev => ({ ...prev, startDate: newValue }))}
                  format="DD/MM/YYYY"
                  sx={{ width: '100%' }}
                />
              </Box>
              <Box>
                <DatePicker
                  label="Đến ngày"
                  value={dateRange.endDate}
                  onChange={(newValue) => setDateRange(prev => ({ ...prev, endDate: newValue }))}
                  format="DD/MM/YYYY"
                  sx={{ width: '100%' }}
                />
              </Box>
            </LocalizationProvider>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleExportModalClose}
            variant="contained"
            sx={{ 
              bgcolor: '#d32f2f',
              color: 'white',
              '&:hover': { bgcolor: '#b71c1c' }
            }}
          >
            Hủy
          </Button>
          <Button 
            onClick={handleExportBatch} 
            variant="contained"
            sx={{ 
              bgcolor: '#2e7d32',
              color: 'white',
              '&:hover': { bgcolor: '#1b5e20' }
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Handover;
