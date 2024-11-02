import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, List, ListItem, ListItemText, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ErrorModal = ({ isOpen, onClose, errors }) => {
  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{ '& .MuiDialog-paper': { width: '60%', margin: 'auto' } }}
    >
      {/* Close button */}
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

      {/* Title */}
      <DialogTitle>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontSize: '28px',
            color: '#d32f2f',
            fontWeight: 'bold',
            marginTop: '10px'
          }}
        >
          Upload thất bại - Danh sách lỗi
        </Typography>
      </DialogTitle>

      {/* Content */}
      <DialogContent sx={{ margin: '10px' }}>
        <List>
          {errors.map((error, index) => (
            <ListItem 
              key={index}
              sx={{
                borderLeft: '4px solid #d32f2f',
                margin: '8px 0',
                backgroundColor: 'rgba(211, 47, 47, 0.05)',
                borderRadius: '4px',
                padding: '12px'
              }}
            >
              <ListItemText 
                primary={error} 
                sx={{ 
                  '& .MuiListItemText-primary': {
                    color: '#d32f2f',
                    fontSize: '16px'
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </DialogContent>

      {/* Actions */}
      <DialogActions sx={{ padding: '16px' }}>
        <Button 
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: '#d32f2f',
            color: 'white',
            '&:hover': {
              backgroundColor: 'darkred',
            }
          }}
        >
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorModal; 