import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, IconButton, Box, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const DetailDialog = ({ open, onClose, data }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth 
      sx={{ '& .MuiDialog-paper': { width: '50%', margin: 'auto' } }}
    >
      {/* Close button in the top-right corner with red background */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          backgroundColor: '#d41818',  // Red background
          color: 'white',          // White "X" icon
          borderRadius: '4px',     // Square shape
          '&:hover': {
            backgroundColor: 'darkred',  // Darker red on hover
          },
          padding: '5px',          // Optional: adds spacing around icon
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* Centered title */}
      <DialogTitle>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontSize: '28px',
            color: '#003366', // Dark blue color
            fontWeight: 'bold',
          }}
        >
          Chi tiết
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ margin: '10px' }}>
        {data && (
          <DialogContentText component="div">
            {[
              { label: "Thời gian", value: data.thoigian },
              { label: "Trực chỉ huy", value: data.truc_CH },
              { label: "Trực ban trưởng cũ", value: data.truc_ban_cu_1 },
              { label: "Trực ban phó cũ", value: data.truc_ban_cu_2 },
              { label: "Trực ban trưởng mới", value: data.truc_ban_moi_1 },
              { label: "Trực ban phó mới", value: data.truc_ban_moi_2 },
              { label: "Tổng quân số", value: data.tong_qs },
              { label: "Quân số có mặt", value: data.qs_co_mat },
              { label: "Quân số vắng", value: data.qs_vang },
              { label: "Lý do", value: data.ly_do },
              { label: "Tình hình", value: data.tinh_hinh },
              { label: "Việc đột xuất", value: data.viec_dotxuat },
              { label: "Nội dung bàn giao", value: data.noidung_bangiao },
            ].map((field, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  fontSize: '14px',
                  marginBottom: '5px',
                }}
              >
                <Box
                  component="strong"
                  sx={{
                    color: '#00008B', // Dark blue color for labels
                    minWidth: '150px', // Adjust field label width as needed
                    flexShrink: 0,
                  }}
                >
                  {field.label}:
                </Box>
                <Box
                  sx={{
                    color: '#000000', // Black color for values
                    wordWrap: 'break-word',
                    paddingLeft: '10px', // Indent wrapped lines
                  }}
                >
                  {field.value}
                </Box>
              </Box>
            ))}
          </DialogContentText>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog;
