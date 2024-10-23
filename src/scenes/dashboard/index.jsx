import React from 'react';
import { Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { FaUser, FaFileAlt, FaTasks, FaBuilding } from 'react-icons/fa';
import dutyScheduleData from '../data/duty_schedule.json';
import documentMixedData from '../data/document_mixed.json';

function Dashboard() {
  const members = 100; 
  const documents = 50; 
  const tasks = 75; 
  const agencies = 10; 

  // Filter the data for the specific date
  const dutyForSpecificDate = dutyScheduleData.find(duty => duty['Ngày'] === '24/10/2024');

  return (
    <div>
      <Grid container spacing={3} style={{ marginBottom: '20px' }}>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <FaUser size={30} />
              <Typography variant="h6">Thành viên quản lý: {members}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <FaFileAlt size={30} />
              <Typography variant="h6">Văn bản quản lý: {documents}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <FaTasks size={30} />
              <Typography variant="h6">Tổng số nhiệm vụ: {tasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card>
            <CardContent>
              <FaBuilding size={30} />
              <Typography variant="h6">Đơn vị trực thuộc: {agencies}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h6">Danh sách trực ngày 24/10/2024</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vị trí trực</TableCell>
                  <TableCell>Tên người trực</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dutyForSpecificDate && Object.entries(dutyForSpecificDate).map(([position, name], index) => (
                  position !== 'Ngày' && (
                    <TableRow key={index}>
                      <TableCell>{position}</TableCell>
                      <TableCell>{name}</TableCell>
                    </TableRow>
                  )
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6">Sổ sách văn kiện</Typography>
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
