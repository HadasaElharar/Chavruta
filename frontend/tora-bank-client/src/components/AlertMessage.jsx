import React, { useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';

const AlertMessage = ({ message, severity, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // ההתראה תיסגר אחרי 5 שניות

      return () => clearTimeout(timer); // ניקוי הטיימר אם הרכיב יוסר
    }
  }, [message, onClose]);

  return (
    <Snackbar
      open={!!message}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertMessage;
