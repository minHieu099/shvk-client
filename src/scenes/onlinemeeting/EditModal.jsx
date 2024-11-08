import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography, DialogTitle } from '@mui/material';
import '../../css/style.css';

const EditModal = ({ open, onClose, data, onSave }) => {
  const [quanSoTong, setQuanSoTong] = useState('');
  const [quanSoCoMat, setQuanSoCoMat] = useState('');
  const [quanSoVang, setQuanSoVang] = useState('');
  const [quanSoSQ, setQuanSoSQ] = useState('');
  const [quanSoQNCN, setQuanSoQNCN] = useState('');
  const [quanSoHSQ_BS, setQuanSoHSQ_BS] = useState('');
  const [quanSoCCQP, setQuanSoCCQP] = useState('');
  const [quanSoPhep, setQuanSoPhep] = useState('');
  const [quanSoHoc, setQuanSoHoc] = useState('');
  const [quanSoOm, setQuanSoOm] = useState('');
  const [quanSoCT, setQuanSoCT] = useState('');
  const [quanSoTT, setQuanSoTT] = useState('');
  const [quanSoKhac, setQuanSoKhac] = useState('');
  const [sungK54, setSungK54] = useState('');
  const [danK54, setDanK54] = useState('');
  const [sungAK, setSungAK] = useState('');
  const [danAK, setDanAK] = useState('');
  const [diemManh, setDiemManh] = useState('');
  const [tonTai, setTonTai] = useState('');
  const [duKien, setDuKien] = useState('');
  const [ketLuan, setKetLuan] = useState('');

  useEffect(() => {
    if (data) {
      setQuanSoTong(data.quanso_tong || '');
      setQuanSoCoMat(data.quanso_co_mat || '');
      setQuanSoSQ(data.quanso_SQ || '');
      setQuanSoQNCN(data.quanso_QNCN || '');
      setQuanSoHSQ_BS(data.quanso_HSQ_BS || '');
      setQuanSoCCQP(data.quanso_CCQP || '');
      setQuanSoPhep(data.quanso_phep || '');
      setQuanSoHoc(data.quanso_hoc || '');
      setQuanSoOm(data.quanso_om || '');
      setQuanSoCT(data.quanso_ct || '');
      setQuanSoTT(data.quanso_tt || '');
      setQuanSoKhac(data.quanso_khac || '');
      setSungK54(data.sung_k54 || '');
      setDanK54(data.dan_k54 || '');
      setSungAK(data.sung_ak || '');
      setDanAK(data.dan_ak || '');
      setDiemManh(data.ketqua_diemmanh || '');
      setTonTai(data.ketqua_tontai || '');
      setDuKien(data.noidung_dukien || '');
      setKetLuan(data.noidung_ketluan || '');
    }
  }, [data]);

  useEffect(() => {
    if (quanSoTong && quanSoCoMat) {
      const vangMat = parseInt(quanSoTong) - parseInt(quanSoCoMat);
      setQuanSoVang(vangMat.toString());
    }
  }, [quanSoTong, quanSoCoMat]);

  useEffect(() => {
    const vangMat = parseInt(quanSoPhep || 0) + 
                    parseInt(quanSoHoc || 0) + 
                    parseInt(quanSoOm || 0) + 
                    parseInt(quanSoCT || 0) + 
                    parseInt(quanSoTT || 0) + 
                    parseInt(quanSoKhac || 0);
    setQuanSoVang(vangMat.toString());
  }, [quanSoPhep, quanSoHoc, quanSoOm, quanSoCT, quanSoTT, quanSoKhac]);

  useEffect(() => {
    if (quanSoTong && quanSoVang) {
      const coMat = parseInt(quanSoTong) - parseInt(quanSoVang);
      setQuanSoCoMat(coMat.toString());
    }
  }, [quanSoTong, quanSoVang]);

  const handleSave = () => {
    const updatedData = {
      ...data,
      quanso_tong: quanSoTong,
      quanso_co_mat: quanSoCoMat,
      quanso_SQ: quanSoSQ,
      quanso_QNCN: quanSoQNCN,
      quanso_HSQ_BS: quanSoHSQ_BS,
      quanso_CCQP: quanSoCCQP,
      quanso_phep: quanSoPhep,
      quanso_hoc: quanSoHoc,
      quanso_om: quanSoOm,
      quanso_ct: quanSoCT,
      quanso_tt: quanSoTT,
      quanso_khac: quanSoKhac,
      sung_k54: sungK54,
      dan_k54: danK54,
      sung_ak: sungAK,
      dan_ak: danAK,
      ketqua_diemmanh: diemManh,
      ketqua_tontai: tonTai,
      noidung_dukien: duKien,
      noidung_ketluan: ketLuan,
    };
    onSave(updatedData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="modal-content">
      <DialogTitle sx={{ padding: "0px!important" }}>
        <Typography
          sx={{
            textAlign: 'center',
            color: '#003366', // Dark blue color
            fontWeight: 'bold',
            paddingBottom: 0,
            fontSize: '20px',
            
          }}
        >
          CẬP NHẬT BÁO CÁO GIAO BAN NGÀY
        </Typography>
      </DialogTitle>
        <Typography variant="h5" className="section-header">
          1. Quân số
        </Typography>

        <Box display="flex" justifyContent="space-between" gap={2}>
          <TextField 
            className="text-field"
            label="Tổng quân số" 
            value={quanSoTong} 
            disabled
            variant="outlined" 
            style={{ width: '32%' }} 
          />
          <TextField 
            className="text-field"
            label="Có mặt" 
            value={quanSoCoMat} 
            disabled
            variant="outlined" 
            style={{ width: '32%' }} 
          />
          <TextField 
            className="text-field"
            label="Vắng mặt" 
            value={quanSoVang} 
            disabled
            variant="outlined" 
            style={{ width: '32%' }} 
          />
        </Box>

        <Box display="flex" justifyContent="space-between" gap={2}>
          <TextField 
            className="text-field"
            label="Sĩ quan" 
            value={quanSoSQ} 
            onChange={(e) => setQuanSoSQ(e.target.value)} 
            variant="outlined" 
            style={{ width: '23%' }} 
          />
          <TextField 
            className="text-field"
            label="QNCN" 
            value={quanSoQNCN} 
            onChange={(e) => setQuanSoQNCN(e.target.value)} 
            variant="outlined" 
            style={{ width: '23%' }} 
          />
          <TextField 
            className="text-field"
            label="HSQ-BS" 
            value={quanSoHSQ_BS} 
            onChange={(e) => setQuanSoHSQ_BS(e.target.value)} 
            variant="outlined" 
            style={{ width: '23%' }} 
          />
          <TextField 
            className="text-field"
            label="CCQP" 
            value={quanSoCCQP} 
            onChange={(e) => setQuanSoCCQP(e.target.value)} 
            variant="outlined" 
            style={{ width: '23%' }} 
          />
        </Box>

        <Box display="flex" justifyContent="space-between" gap={3}>
          <TextField 
            className="text-field"
            label="Phép" 
            value={quanSoPhep} 
            onChange={(e) => setQuanSoPhep(e.target.value)} 
            variant="outlined" 
            style={{ width: '12%' }} 
          />
          <TextField 
            className="text-field"
            label="Học" 
            value={quanSoHoc} 
            onChange={(e) => setQuanSoHoc(e.target.value)} 
            variant="outlined" 
            style={{ width: '12%' }} 
          />
          <TextField 
            className="text-field"
            label="Ốm" 
            value={quanSoOm} 
            onChange={(e) => setQuanSoOm(e.target.value)} 
            variant="outlined" 
            style={{ width: '12%' }} 
          />
          <TextField 
            className="text-field"
            label="Công tác" 
            value={quanSoCT} 
            onChange={(e) => setQuanSoCT(e.target.value)} 
            variant="outlined" 
            style={{ width: '12%' }} 
          />
          <TextField 
            className="text-field"
            label="Tranh thủ" 
            value={quanSoTT} 
            onChange={(e) => setQuanSoTT(e.target.value)} 
            variant="outlined" 
            style={{ width: '12%' }} 
          />
          <TextField 
            className="text-field"
            label="Khác" 
            value={quanSoKhac} 
            onChange={(e) => setQuanSoKhac(e.target.value)} 
            variant="outlined" 
            style={{ width: '12%' }} 
          />
        </Box>

        <Typography variant="h5" className="section-header">
          2. Vũ khí trang bị
        </Typography>
        <Box display="flex" justifyContent="space-between" gap={2}>
          <TextField 
            className="text-field"
            label="Súng K54" 
            value={sungK54} 
            onChange={(e) => setSungK54(e.target.value)} 
            variant="outlined" 
            style={{ width: '48%' }} 
          />
          <TextField 
            className="text-field"
            label="Đạn K54" 
            value={danK54} 
            onChange={(e) => setDanK54(e.target.value)} 
            variant="outlined" 
            style={{ width: '48%' }} 
          />
        </Box>

        <Box display="flex" justifyContent="space-between" gap={2}>
          <TextField 
            className="text-field"
            label="Súng AK" 
            value={sungAK} 
            onChange={(e) => setSungAK(e.target.value)} 
            variant="outlined" 
            style={{ width: '48%' }} 
          />
          <TextField 
            className="text-field"
            label="Đạn AK" 
            value={danAK} 
            onChange={(e) => setDanAK(e.target.value)} 
            variant="outlined" 
            style={{ width: '48%' }} 
          />
        </Box>

        <Typography variant="h5" className="section-header">
          3. Kết quả thực hiện nhiệm vụ trong ngày
        </Typography>

        <TextField 
          className="text-field"
          label="Điểm mạnh" 
          fullWidth 
          value={diemManh} 
          onChange={(e) => setDiemManh(e.target.value)} 
          variant="outlined" 
          multiline 
          minRows={3} 
        />
        <TextField 
          className="text-field"
          label="Tồn tại" 
          fullWidth 
          value={tonTai} 
          onChange={(e) => setTonTai(e.target.value)} 
          variant="outlined" 
          multiline 
          minRows={3} 
        />

        <Typography variant="h5" className="section-header">
          4. Dự kiến kế hoạch sắp tới
        </Typography>

        <TextField 
          className="text-field"
          fullWidth 
          value={duKien} 
          onChange={(e) => setDuKien(e.target.value)} 
          variant="outlined" 
          multiline 
          minRows={3} 
        />

        <Typography variant="h5" className="section-header">
          5. Kết luận của chỉ huy
        </Typography>

        <TextField 
          className="text-field"
          fullWidth 
          value={ketLuan} 
          onChange={(e) => setKetLuan(e.target.value)} 
          variant="outlined" 
          multiline 
          minRows={3} 
        />

        <Button variant="contained" color="primary" onClick={handleSave} sx={{ marginTop: 2 }}>
          Lưu
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal; 