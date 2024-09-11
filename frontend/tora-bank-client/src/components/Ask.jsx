import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography, Container, Box, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { GetAllRabaies } from '../utils/userUtil';
import { AddQa } from '../utils/qaUtil';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Event } from '@mui/icons-material';
import AlertMessage from './AlertMessage';


const Ask = () => {
  const loggedUser = useSelector(state => state.user.loggedUser);
  const [rabaies, setRabaies] = useState([]);
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    userId: loggedUser.userId,
    ravId: '',
    CreateDate: format(new Date(), 'yyyy-MM-dd'),
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  useEffect(() => {
    getAllRabbisExceptLoggedIn();
  }, []);
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage('');
      }, 5000); // ההתראה תיסגר אחרי 5 שניות

      return () => clearTimeout(timer); // ניקוי הטיימר אם הרכיב יוסר
    }
  }, [alertMessage]);

  const getAllRabbisExceptLoggedIn = async () => {
    try {
      const rabbisResponse = await GetAllRabaies();
      const filteredRabbis = rabbisResponse.filter(rabbi => rabbi.levelId === 3 && rabbi.userId !== loggedUser.userId &&
        rabbi.status !== false);
        setRabaies(filteredRabbis);
    } catch (error) {
      console.error("Failed to get rabbis:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData); // Logging form data

    // Basic validation check
    if (!formData.ravId || !formData.subject || !formData.message) {
      setError("אנא מלא את כל השדות");
      return;
    }
    setOpenConfirmDialog(true);
  };

  const showAlert = (message, severity = 'info') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
  };

  const handleConfirmSubmit = async () => {
    try {
      await AddQa(formData);
      showAlert("השאלה נשלחה בהצלחה", 'success'); 
      setTimeout(() => {
        navigate('/privateArea/MyQuestions'); // Replace with your actual path
      }, 3000); // Adjust the delay as needed
// שימוש ב navigate במקום history
    } catch (err) {
      console.error(err);
      setError("השליחה נכשלה נסה שוב");
      showAlert("השליחה נכשלה נסה שוב", 'error');
    }
  };

  const handleCancelSubmit = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <div>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          שליחת שאלה לרב
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel id="ravId-label">שם הרב</InputLabel>
            <Select
              labelId="ravId-label"
              id="ravId"
              name="ravId"
              value={formData.ravId}
              onChange={handleChange}
              label="שם הרב"
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300, // Adjust the height of the dropdown menu if needed
                  },
                },
              }}
            >
              {rabaies.map((rabbi) => (
                <MenuItem key={rabbi.userId} value={rabbi.userId}>
                  {rabbi.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            id="subject"
            name="subject"
            label="נושא השאלה"
            value={formData.subject}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            id="message"
            name="message"
            label="השאלה"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="תאריך"
            type="text"
            name="date"
            value={formData.CreateDate}
            onChange={handleChange}
            disabled
            InputProps={{
              startAdornment: (
                <IconButton size="small">
                  <Event />
                </IconButton>
              ),
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="תשובת הרב"
            value={null}
            InputProps={{
              readOnly: true,
              style: {
                pointerEvents: 'none', // מבטל אינטראקציה עם העכבר
                color: 'black', // צבע הטקסט
              }
            }}
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'gray', // צבע המסגרת
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'gray', // צבע המסגרת במצב hover
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'gray', // צבע המסגרת במצב focus
              },
              backgroundColor: '#f5f5f5', // צבע הרקע
            }}
          />

          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
            שלח
          </Button>
          {error && <Typography color="error">{error}</Typography>}
        </Box>
        <Dialog
          open={openConfirmDialog}
          onClose={handleCancelSubmit}
        >
          <DialogTitle>אישור שליחת שאלה</DialogTitle>
          <DialogContent>
            <DialogContentText>האם אתה בטוח שברצונך לשלוח את השאלה?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelSubmit} color="primary">
              ביטול
            </Button>
            <Button onClick={handleConfirmSubmit} color="primary" autoFocus>
              שלח
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <AlertMessage
        message={alertMessage}
        severity={alertSeverity}
        onClose={() => setAlertMessage('')}
      />
    </div>
  );
};

export default Ask;
