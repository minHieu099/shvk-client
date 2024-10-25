import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText } from "@mui/material";

const DetailDialog = ({ open, onClose, data }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Chi tiết</DialogTitle>
      <DialogContent>
        {data && (
          <DialogContentText>
            <strong>Thời gian:</strong> {data.thoigian}<br />
            <strong>Trực chỉ huy:</strong> {data.truc_CH}<br />
            <strong>Trực ban trưởng cũ:</strong> {data.truc_ban_cu_1}<br />
            <strong>Trực ban phó cũ:</strong> {data.truc_ban_cu_2}<br />
            <strong>Trực ban trưởng mới:</strong> {data.truc_ban_moi_1}<br />
            <strong>Trực ban phó mới:</strong> {data.truc_ban_moi_2}<br />
            <strong>Tổng quân số:</strong> {data.tong_qs}<br />
            <strong>Quân số có mặt:</strong> {data.qs_co_mat}<br />
            <strong>Quân số vắng:</strong> {data.qs_vang}<br />
            <strong>Lý do:</strong> {data.ly_do}<br />
            <strong>Tình hình:</strong> {data.tinh_hinh}<br />
            <strong>Việc đột xuất:</strong> {data.viec_dotxuat}<br />
            <strong>Nội dung bàn giao:</strong> {data.noidung_bangiao}<br />
          </DialogContentText>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
