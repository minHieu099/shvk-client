import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Select, MenuItem, Typography } from '@mui/material';

const AddOfficerModal = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState('');
  const [rank, setRank] = useState('');
  const [unit, setUnit] = useState('');
  const [position, setPosition] = useState('');

  const handleAdd = () => {
    const newOfficer = {
      'Họ tên': name,
      'Cấp bậc': rank,
      'Đơn vị': unit,
      'Chức vụ': position,
    };
    onAdd(newOfficer);
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
        maxWidth: 500,
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
          Thêm Cán Bộ
        </Typography>
        <TextField
          label="Tên cán bộ"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          InputLabelProps={{
            style: { color: '#333' }
          }}
        />
        <Select
          fullWidth
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          displayEmpty
          variant="outlined"
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled>Chọn cấp bậc</MenuItem>
          <MenuItem value="Đại tá">Đại tá</MenuItem>
          <MenuItem value="Thượng tá">Thượng tá</MenuItem>
          <MenuItem value="Trung tá">Trung tá</MenuItem>
          <MenuItem value="Thiếu tá">Thiếu tá</MenuItem>
          <MenuItem value="Đại úy">Đại úy</MenuItem>
          <MenuItem value="Trung úy">Trung úy</MenuItem>
          <MenuItem value="Thượng úy">Thượng úy</MenuItem>
        </Select>
        <Select
          fullWidth
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          displayEmpty
          variant="outlined"
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled>Chọn đơn vị</MenuItem>
          <MenuItem value="BTL 86">BTL 86</MenuItem>
          <MenuItem value="Phòng tham mưu">Phòng tham mưu</MenuItem>
          <MenuItem value="Đội 1 Cụm 21">Đội 1 Cụm 21</MenuItem>
          <MenuItem value="Đội 2 Cụm 21">Đội 2 Cụm 21</MenuItem>
          <MenuItem value="Đội 3 Cụm 21">Đội 3 Cụm 21</MenuItem>
          <MenuItem value="Đội 4 Cụm 21">Đội 4 Cụm 21</MenuItem>
          <MenuItem value="Đội 5 Cụm 22">Đội 5 Cụm 22</MenuItem>
          <MenuItem value="Đội 6 Cụm 22">Đội 6 Cụm 22</MenuItem>
          <MenuItem value="Đội 7 Cụm 22">Đội 7 Cụm 22</MenuItem>
          <MenuItem value="Đội 8 Cụm 22">Đội 8 Cụm 22</MenuItem>
          <MenuItem value="Đội 9 Cụm 23">Đội 9 Cụm 23</MenuItem>
          <MenuItem value="Đội 10 Cụm 23">Đội 10 Cụm 23</MenuItem>
          <MenuItem value="Đội 11 Cụm 23">Đội 11 Cụm 23</MenuItem>
          <MenuItem value="Đội 12 Cụm 23">Đội 12 Cụm 23</MenuItem>
        </Select>
        <Select
          fullWidth
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          displayEmpty
          variant="outlined"
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="" disabled>Chọn chức vụ</MenuItem>
          <MenuItem value="Chỉ huy trưởng">Chỉ huy trưởng</MenuItem>
          <MenuItem value="Phó chỉ huy">Phó chỉ huy</MenuItem>
          <MenuItem value="Đội trưởng">Đội trưởng</MenuItem>
          <MenuItem value="Phó đội trưởng">Phó đội trưởng</MenuItem>
          <MenuItem value="Nhân viên">Nhân viên</MenuItem>
        </Select>
        <Button variant="contained" color="primary" onClick={handleAdd}>
          Thêm
        </Button>
      </Box>
    </Modal>
  );
};

export default AddOfficerModal;
