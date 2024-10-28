import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';

const EditModal = ({ open, onClose, data, onSave }) => {
  const TOTAL_QUAN_SO = 156; 
  const [qsCoMat, setQsCoMat] = useState(0);
  const [congTac, setCongTac] = useState(0);
  const [diHoc, setDiHoc] = useState(0);
  const [phep, setPhep] = useState(0);
  const [tranhThu, setTranhThu] = useState(0);
  const [om, setOm] = useState(0);
  const [vien, setVien] = useState(0);
  const [thaiSan, setThaiSan] = useState(0);
  const [choHuu, setChoHuu] = useState(0);
  const [tangCuong, setTangCuong] = useState(0);
  const [khongLyDo, setKhongLyDo] = useState(0);
  const [tinhHinh, setTinhHinh] = useState('');
  const [viecDotXuat, setViecDotXuat] = useState('');
  const [noiDungBanGiao, setNoiDungBanGiao] = useState('');
  const [qsVang, setQsVang] = useState(0);

  useEffect(() => {
    if (data) {
      setCongTac(data.cong_tac || 0);
      setDiHoc(data.di_hoc || 0);
      setPhep(data.phep || 0);
      setTranhThu(data.tranh_thu || 0);
      setOm(data.om || 0);
      setVien(data.vien || 0);
      setThaiSan(data.thai_san || 0);
      setChoHuu(data.cho_huu || 0);
      setTangCuong(data.tang_cuong || 0);
      setKhongLyDo(data.khong_ly_do || 0);
      setTinhHinh(data.tinh_hinh || '');
      setViecDotXuat(data.viec_dotxuat || '');
      setNoiDungBanGiao(data.noidung_bangiao || '');
    }
  }, [data]);

  useEffect(() => {
  
    const vangMat = parseInt(congTac) + parseInt(diHoc) + parseInt(phep) + parseInt(tranhThu) + parseInt(om) + parseInt(vien) + parseInt(thaiSan) + parseInt(choHuu) + parseInt(tangCuong) + parseInt(khongLyDo);
    setQsVang(vangMat);
    setQsCoMat(TOTAL_QUAN_SO - vangMat);
  }, [congTac, diHoc, phep, tranhThu, om, vien, thaiSan, choHuu, tangCuong, khongLyDo]);

  const handleSave = () => {
    const updatedData = {
      ...data,
      qs_co_mat: qsCoMat,
      qs_vang: qsVang,
      cong_tac: congTac,
      di_hoc: diHoc,
      phep: phep,
      tranh_thu: tranhThu,
      om: om,
      vien: vien,
      thai_san: thaiSan,
      cho_huu: choHuu,
      tang_cuong: tangCuong,
      khong_ly_do: khongLyDo,
      tinh_hinh: tinhHinh,
      viec_dotxuat: viecDotXuat,
      noidung_bangiao: noiDungBanGiao,
    };
    onSave(updatedData);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        p: 4,
        backgroundColor: '#f5f5f5',
        color: '#333',
        margin: 'auto',
        width: '80%',
        maxWidth: 600,
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        <Typography variant="h6" component="h2" textAlign="center" mb={2}>
          Cập nhật báo cáo
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <TextField label="Tổng quân số" value={TOTAL_QUAN_SO} disabled variant="outlined" style={{ width: '30%' }} />
          <TextField label="Có mặt" value={qsCoMat} disabled variant="outlined" style={{ width: '30%' }} />
          <TextField label="Vắng mặt" value={qsVang} disabled variant="outlined" style={{ width: '30%' }} />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <TextField label="Công tác" value={congTac} onChange={(e) => setCongTac(e.target.value)} variant="outlined" style={{ width: '18%' }} />
          <TextField label="Đi học" value={diHoc} onChange={(e) => setDiHoc(e.target.value)} variant="outlined" style={{ width: '18%' }} />
          <TextField label="Phép" value={phep} onChange={(e) => setPhep(e.target.value)} variant="outlined" style={{ width: '18%' }} />
          <TextField label="Tranh thủ" value={tranhThu} onChange={(e) => setTranhThu(e.target.value)} variant="outlined" style={{ width: '18%' }} />
          <TextField label="Ốm" value={om} onChange={(e) => setOm(e.target.value)} variant="outlined" style={{ width: '18%' }} />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <TextField label="Viện" value={vien} onChange={(e) => setVien(e.target.value)} variant="outlined" style={{ width: '18%' }} />
          <TextField label="Thai sản" value={thaiSan} onChange={(e) => setThaiSan(e.target.value)} variant="outlined" style={{ width: '18%' }} />
          <TextField label="Chờ hưu" value={choHuu} onChange={(e) => setChoHuu(e.target.value)} variant="outlined" style={{ width: '18%' }} />
          <TextField label="Tăng cường" value={tangCuong} onChange={(e) => setTangCuong(e.target.value)} variant="outlined" style={{ width: '18%' }} />
          <TextField label="Không lý do" value={khongLyDo} onChange={(e) => setKhongLyDo(e.target.value)} variant="outlined" style={{ width: '18%' }} />
        </Box>
        <TextField label="Tình hình trong ngày" fullWidth value={tinhHinh} onChange={(e) => setTinhHinh(e.target.value)} variant="outlined" multiline  minRows={4}/>
        <TextField label="Những việc đột xuất xảy ra" fullWidth value={viecDotXuat} onChange={(e) => setViecDotXuat(e.target.value)} variant="outlined" multiline  minRows={4}/>
        <TextField label="Nội dung bàn giao" fullWidth value={noiDungBanGiao} onChange={(e) => setNoiDungBanGiao(e.target.value)} variant="outlined" multiline  minRows={4}/>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Lưu
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;
