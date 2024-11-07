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
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          backgroundColor: '#d41818',
          color: 'white',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: 'darkred',
          },
          padding: '5px',
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogTitle>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontSize: '28px',
            color: '#003366',
            fontWeight: 'bold',
          }}
        >
          Chi tiết giao ban trực tuyến
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ margin: '10px' }}>
        {data && (
          <DialogContentText component="div">
            <Box sx={{ marginLeft: "10px", marginBottom: 2 }}>
            {[
              { label: "Ngày", value: data.thoigian },
              { label: "Trực chỉ huy trung tâm", value: data.truc_CHTT },
              { label: "Trực cơ quan tham mưu", value: data.truc_cqtm },
              { label: "Trực ban tác chiến", value: data.tbtc },
              { label: "Trực cơ quan chính trị", value: data.truc_cqct }
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
                      color: 'rgb(0 0 0 / 65%)', // Black color for values
                      wordWrap: 'break-word',
                      paddingLeft: '10px', // Indent wrapped lines
                    }}
                  >
                    {field.value}
                  </Box>
                </Box>
              ))}
            </Box>
            <Typography variant="h5" sx={{ color: '#003366', fontWeight: 'bold', marginTop: 2 }}>
              1. Quân số
            </Typography>

            <Box sx={{ display: 'flex', gap: 4, marginLeft: "10px" }}>
              <Typography sx={{ marginRight: "30%" }}>- Tổng quân số: {data.quanso_tong}</Typography>
              <Typography>Có mặt: {data.quanso_co_mat}</Typography>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 4, marginLeft: "10px" }}>
              <Typography sx={{ marginRight: "5%" }} >(SQ: {data.quanso_SQ}</Typography>
              <Typography sx={{ marginRight: "5%" }}>QNCN: {data.quanso_QNCN}</Typography>
              <Typography sx={{ marginRight: "5%" }}>HSQ-BS: {data.quanso_HSQ_BS}</Typography>
              <Typography>CCQP: {data.quanso_CCQP})</Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 4, marginLeft: "10px" }}>
              <Typography>- Vắng: {parseInt(data.quanso_tong) - parseInt(data.quanso_co_mat)}</Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 4, marginLeft: "10px" }}>
              <Typography sx={{ marginRight: "10%" }}>Phép: {data.quanso_phep}</Typography>
              <Typography sx={{ marginRight: "10%" }}>Học: {data.quanso_hoc}</Typography>
              <Typography>Ốm: {data.quanso_om}</Typography>
            </Box>

            <Box sx={{ display: 'flex', gap: 4, marginLeft: "10px" }}>
              <Typography sx={{ marginRight: "10%" }}>Công tác: {data.quanso_ct}</Typography>
              <Typography sx={{ marginRight: "10%" }}>Tranh thủ: {data.quanso_tt}</Typography>
              <Typography>Khác: {data.quanso_khac}</Typography>
            </Box>

            <Typography variant="h5" sx={{ color: '#003366', fontWeight: 'bold', marginTop: 2 }}>
              2. Vũ khí trang bị
            </Typography>
            <Box sx={{ display: 'flex', gap: 4, marginLeft: "10px" }}>
              <Typography sx={{ marginRight: "30%" }}>- Súng K54: {data.sung_k54}</Typography>
              <Typography>Đạn K54: {data.dan_k54}</Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 4, marginLeft: "10px" }}>
              <Typography sx={{ marginRight: "30%" }}>- Súng AK: {data.sung_ak}</Typography>
              <Typography>Đạn AK: {data.dan_ak}</Typography>
            </Box>

            <Typography variant="h5" sx={{ color: '#003366', fontWeight: 'bold', marginTop: 2 }}>
              3. Kết quả thực hiện nhiệm vụ
            </Typography>
            <Box sx={{ marginLeft: "10px" }}>
              <Typography sx={{ fontWeight: 'bold' }}>- Điểm mạnh:</Typography>
              <Typography sx={{ whiteSpace: 'pre-line', marginLeft: "10px" }}>{data.ketqua_diemmanh}</Typography>
              <Typography sx={{ fontWeight: 'bold' }}>- Điểm yếu:</Typography>
              <Typography sx={{ whiteSpace: 'pre-line', marginLeft: "10px" }}>{data.ketqua_tontai}</Typography>
            </Box>

            <Typography variant="h5" sx={{ color: '#003366', fontWeight: 'bold', marginTop: 2 }}>
              4. Dự kiến kế hoạch sắp tới
            </Typography>
            <Typography sx={{ whiteSpace: 'pre-line', marginLeft: 2 }}>{data.noidung_dukien}</Typography>

            <Typography variant="h5" sx={{ color: '#003366', fontWeight: 'bold', marginTop: 2 }}>
              5. Kết luận của Trực chỉ huy Bộ Tư lệnh
            </Typography>
            <Typography sx={{ whiteSpace: 'pre-line', marginLeft: 2 }}>{data.noidung_ketluan}</Typography>
          </DialogContentText>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailDialog; 