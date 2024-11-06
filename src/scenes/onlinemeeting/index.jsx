import React, { useState } from "react";
import { 
  Button, 
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
  Tooltip
} from "@mui/material";
import { Visibility, Edit, Delete, CheckCircle } from '@mui/icons-material';
import renderGbnTT from "../../export/sogiaobanngayTT";
import { saveAs } from "file-saver";
import { Packer } from "docx";
import ImageBased64 from "../data/ImageBased64";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OnlineMeeting = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedData, setSelectedData] = useState(null);

  // Data mẫu cho bảng
  const meetingData = [
    {
      thoigian: "15/03/2024",
      truc_CHTT: "Đại tá Nguyễn Văn A",
      truc_cqtm: "Thượng tá Trần Văn B",
      tbtc: "Thiếu tá Lê Văn C", 
      truc_cqct: "Trung tá Phạm Văn D",
      quanso_tong: "159",
      quanso_co_mat: "142",
      quanso_SQ: "45",
      quanso_QNCN: "28",
      quanso_HSQ_BS: "86",
      quanso_CCQP: "0",
      quanso_phep: "8",
      quanso_hoc: "0", 
      quanso_om: "4",
      quanso_ct: "3",
      quanso_tt: "2",
      quanso_khac: "0",
      sung_k54: "45/45",
      dan_k54: "900/900",
      sung_ak: "120/120", 
      dan_ak: "3600/3600",
      ketqua_diemmanh: "- Thực hiện nghiêm túc chế độ trực SSCĐ\n- Duy trì tốt các hệ thống thông tin liên lạc\n- Hoàn thành tốt nhiệm vụ được giao",
      ketqua_tontai: "- Một số cán bộ chiến sĩ còn chậm giờ trong ca trực\n- Cần tăng cường công tác kiểm tra đột xuất",
      noidung_dukien: "- 07:00: Chào cờ đầu tuần\n- 08:00: Họp giao ban đơn vị\n- 14:00: Huấn luyện theo kế hoạch",
      noidung_ketluan: "- Tiếp tục duy trì nghiêm túc chế độ trực SSCĐ\n- Tăng cường công tác kiểm tra, đôn đốc\n- Thực hiện tốt công tác phòng chống dịch"
    }
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleApprove = (data) => {
    const docData = {
      ...data,
      signatureImage: ImageBased64
    };
    const doc = renderGbnTT(docData);
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, `Giao ban ngày ${data.thoigian}.docx`);
    });
    toast.success("Xuất biên bản thành công!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <Box>
      {/* <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button 
          variant="contained" 
          color="primary" 
          style={{ width: '15%' }}
          onClick={() => handleApprove(meetingData[0])}
        >
          Xuất biên bản giao ban
        </Button>
      </Box> */}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Ngày</TableCell>
              <TableCell>Trực chỉ huy trung tâm</TableCell>
              <TableCell>Trực cơ quan tham mưu</TableCell>
              <TableCell>Trực ban tác chiến</TableCell>
              <TableCell>Trực cơ quan chính trị</TableCell>
              <TableCell>Quân số</TableCell>
              <TableCell sx={{ width: '180px' }}>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetingData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((meeting, index) => (
                <TableRow key={index}>
                  <TableCell>{meeting.thoigian}</TableCell>
                  <TableCell>{meeting.truc_CHTT}</TableCell>
                  <TableCell>{meeting.truc_cqtm}</TableCell>
                  <TableCell>{meeting.tbtc}</TableCell>
                  <TableCell>{meeting.truc_cqct}</TableCell>
                  <TableCell>{`${meeting.quanso_co_mat}/${meeting.quanso_tong}`}</TableCell>
                  <TableCell sx={{ width: '180px' }}>
                    <Tooltip title="Xem chi tiết">
                      <IconButton><Visibility sx={{ color: '#6c6cd0f0' }} /></IconButton>
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa">
                      <IconButton><Edit sx={{ color: '#e8a90e' }} /></IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton><Delete sx={{ color: '#f52c2cdb' }}/></IconButton>
                    </Tooltip>
                    <Tooltip title="Phê duyệt">
                      <IconButton onClick={() => handleApprove(meeting)}><CheckCircle sx={{ color: '#3bc73b' }} /></IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={meetingData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <ToastContainer />
    </Box>
  );
};

export default OnlineMeeting;
