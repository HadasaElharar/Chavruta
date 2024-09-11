import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { AddDonate } from '../utils/donateUtil';
import { GetAllRabaies } from '../utils/userUtil';
import { useSelector } from 'react-redux';
import { Button, TextField, Grid, Paper, Typography, Container, FormControl, InputLabel, MenuItem, Select, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Money, Event } from '@mui/icons-material';
import AlertMessage from './AlertMessage';

const Donation = () => {
  const loggedUser = useSelector(state => state.user.loggedUser);
  const [donation, setDonation] = useState({
    userId: loggedUser.userId,
    ravId: '',
    sum: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    file: ''
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [rabbis, setRabbis] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');
    const showAlert = (message, severity = 'info') => {
      setAlertMessage(message);
      setAlertSeverity(severity);
  };

  useEffect(() => {
    getAllRabbisExceptLoggedIn();
  }, []);

  const getAllRabbisExceptLoggedIn = async () => {
    try {
      const rabbisResponse = await GetAllRabaies();
      const filteredRabbis = rabbisResponse.filter(rabbi => rabbi.levelId === 3 && rabbi.userId !== loggedUser.userId &&
        rabbi.status !== false);
      setRabbis(filteredRabbis);
    } catch (error) {
      console.error("Failed to get rabbis:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDonation({
      ...donation,
      [name]: value
    });
  };

  const handleInput = (event) => {
    const inputValue = event.target.value;
    const filteredValue = inputValue.replace(/\D/g, '');
    setDonation({
      ...donation,
      sum: filteredValue
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await AddDonate(donation);
      showAlert("תודה על תרומתך", 'success');
      setTimeout(() => {
        navigate('/privateArea'); // Replace with your actual path
      }, 3000); // Adjust the delay as needed
    } catch (err) {
      console.error(err);
      showAlert("התרומה לא נשלחה. נסה שוב.", 'error');
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h5" align="center" gutterBottom>הוספת תרומה חדשה</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" required error={donation.ravId === -1}>
                <InputLabel id="rav-label">רב</InputLabel>
                <Select
                  labelId="rav-label"
                  id="rav"
                  value={donation.ravId > 0 ? donation.ravId : ''}
                  name="ravId"
                  onChange={handleChange}
                  label="רב"
                >
                  <MenuItem value="" disabled></MenuItem>
                  {rabbis.map((rabbi) => (
                    <MenuItem
                      key={rabbi.userId}
                      value={rabbi.userId}
                    >
                      {rabbi.name}
                    </MenuItem>
                  ))}
                </Select>
                {donation.userId === -1 && <Typography color="error" variant="caption">שדה חובה</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="סכום"
                type="text"
                name="sum"
                value={donation.sum}
                onInput={handleInput}
                required
                InputProps={{
                  startAdornment: (
                    <IconButton size="small">
                      <Money />
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="תאריך"
                type="text"
                name="date"
                value={donation.date}
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
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                sx={{ backgroundColor: 'grey', color: 'white', '&:hover': { backgroundColor: 'darkgrey' } }}
                fullWidth
              >
                אישור תרומה
              </Button>
            </Grid>
          </Grid>
        </form>
        {error && <Typography variant="body2" color="error">{error}</Typography>}
      </Paper>
      <AlertMessage
                    message={alertMessage}
                    severity={alertSeverity}
                    onClose={() => setAlertMessage('')}
                />
    </Container>
  );
};

export default Donation;
