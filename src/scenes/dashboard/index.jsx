import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import { FaUser, FaFileAlt, FaTasks, FaBuilding } from 'react-icons/fa';
import dutyScheduleData from '../data/duty_schedule.json';
import documentMixedData from '../data/document_mixed.json';

function Dashboard() {
  const [message, setMessage] = useState('');
  const members = 159; 
  const documents = 10; 
  const tasks = 75; 
  const agencies = 7; 


  const today = new Date();
  const todayDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;


  const dutyForToday = dutyScheduleData.find(duty => duty['Ngày'] === todayDate);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:19999'); 

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      setMessage(event.data);
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div>
      {message && <div className="greeting-message">{message}</div>}
      <Grid container spacing={3} style={{ marginBottom: '20px' }}>
        <Grid item xs={3}>
          <Card className="grid-card bg-green">
            <CardContent className="card-content">
              <Typography variant="h6" className="title">Tổng quân số</Typography>
              <Typography variant="h1" style={{ fontSize: '35px', fontWeight: '700', color: '#fff', lineHeight: '45px' }}>
                {members}
              </Typography>
            </CardContent>
            <Box className="icon-box icon-green">
              <FaUser size={30} color="white" />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card className="grid-card bg-purple">
            <CardContent className="card-content">
              <Typography variant="h6" className="title">Văn bản</Typography>
              <Typography variant="h1" style={{ fontSize: '35px', fontWeight: '700', color: '#fff', lineHeight: '45px' }}>{documents}</Typography>
            </CardContent>
            <Box className="icon-box icon-purple">
              <FaFileAlt size={24} color="white" />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card className="grid-card bg-blue">
            <CardContent className="card-content">
              <Typography variant="h6" className="title">Nhiệm vụ</Typography>
              <Typography variant="h1" style={{ fontSize: '35px', fontWeight: '700', color: '#fff', lineHeight: '45px' }}>{tasks}</Typography>
            </CardContent>
            <Box className="icon-box icon-blue">
              <FaTasks size={24} color="white" />
            </Box>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card className="grid-card bg-yellow">
            <CardContent className="card-content">
              <Typography variant="h6" className="title">Đơn vị</Typography>
              <Typography variant="h1" style={{ fontSize: '35px', fontWeight: '700', color: '#fff', lineHeight: '45px' }}>{agencies}</Typography>
            </CardContent>
            <Box className="icon-box icon-yellow">
              <FaBuilding size={24} color="white" />
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h6" className='title-table'>Danh sách trực ngày {todayDate}</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Thành phần</TableCell>
                  <TableCell>Tên người trực</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dutyForToday ? Object.entries(dutyForToday).map(([position, name], index) => (
                  position !== 'Ngày' && (
                    <TableRow key={index}>
                      <TableCell>{position}</TableCell>
                      <TableCell>{name}</TableCell>
                    </TableRow>
                  )
                )) : (
                  <TableRow>
                    <TableCell colSpan={2}>Không có dữ liệu cho ngày hôm nay</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" className='title-table'>Sổ sách văn kiện</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên đầu sổ</TableCell>
                  <TableCell>Trạng thái hoàn thành</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documentMixedData.map((book, index) => (
                  <TableRow key={index}>
                    <TableCell>{book.DocumentName}</TableCell>
                    <TableCell>{book.Status ? '✔️' : '❌'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
