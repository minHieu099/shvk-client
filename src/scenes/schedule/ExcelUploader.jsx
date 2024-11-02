import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import * as ExcelJS from 'exceljs';
import { toast } from 'react-toastify';
import officersData from '../data/officers.json';
import ErrorModal from './ErrorModal';

const ExcelUploader = ({ isOpen, onClose, onDataUploaded }) => {
  const [errors, setErrors] = useState([]);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const validateDate = (dateStr) => {
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    return regex.test(dateStr);
  };

  const validateOfficer = (name) => {
    return officersData.some(officer => officer['Họ tên'] === name);
  };

  const validateNoNumbers = (str) => {
    return !/\d/.test(str);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const workbook = new ExcelJS.Workbook();
    const errorList = [];
    
    try {
      await workbook.xlsx.load(file);
      const worksheet = workbook.worksheets[0];
      const data = [];
      let hasError = false;

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;

        const rowData = {
          'Ngày': row.getCell(1).text,
          'Trực giám sát': row.getCell(2).text,
          'Trực trinh sát': row.getCell(3).text,
          'Trực BĐATTT': row.getCell(4).text,
          'Trực ban tác chiến': row.getCell(5).text,
          'Trực chỉ huy': row.getCell(6).text
        };

        // Validate date
        if (!validateDate(rowData['Ngày'])) {
          errorList.push(`Dòng ${rowNumber}, cột Ngày: "${rowData['Ngày']}" - Định dạng ngày không hợp lệ (DD/MM/YYYY)`);
          hasError = true;
        }

        // Validate officers
        Object.entries(rowData).forEach(([key, value]) => {
          if (key !== 'Ngày') {
            if (!validateNoNumbers(value)) {
              errorList.push(`Dòng ${rowNumber}, cột ${key}: "${value}" - Không được chứa số`);
              hasError = true;
            }
            if (!validateOfficer(value)) {
              errorList.push(`Dòng ${rowNumber}, cột ${key}: "${value}" - Không tồn tại trong CSDL`);
              hasError = true;
            }
          }
        });

        if (!hasError) {
          data.push(rowData);
        }
      });

      if (hasError) {
        setErrors(errorList);
        setShowErrorModal(true);
        toast.error('Upload lịch trực thất bại!');
      } else {
        onDataUploaded(data);
        onClose();
        toast.success('Upload lịch trực thành công!');
      }
    } catch (error) {
      setErrors(['Lỗi đọc file Excel: ' + error.message]);
      setShowErrorModal(true);
      toast.error('Có lỗi xảy ra khi đọc file Excel');
    }
  };

  return (
    <>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>Tải lên lịch trực</DialogTitle>
        <DialogContent>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            id="excel-upload"
          />
          <label htmlFor="excel-upload">
            <Button variant="contained" component="span">
              Chọn file Excel
            </Button>
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Đóng</Button>
        </DialogActions>
      </Dialog>

      <ErrorModal 
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        errors={errors}
      />
    </>
  );
};

export default ExcelUploader; 