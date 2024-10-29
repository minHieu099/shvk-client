import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TablePagination } from "@mui/material";
import { Visibility, Edit, Delete, CheckCircle } from '@mui/icons-material';
import Tooltip from '@mui/material/Tooltip';
// import EditModal from './EditModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HandoverTBCm = () => {
  const [page, setPage] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      tui là bàn gia0 kíp trực Trực Ban Cụm
    </>
  );
};

export default HandoverTBCm;
