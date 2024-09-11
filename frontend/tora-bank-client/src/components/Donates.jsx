import React, { useEffect, useState } from 'react';
import { GetAllDonates, GetDonateByUserId } from '../utils/donateUtil';
import { useSelector } from 'react-redux';
import { Button, Card, CardContent, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { VolunteerActivism } from '@mui/icons-material';
import PDFViewer from './PDFViewer';
import AlertMessage from './AlertMessage';


const Donates = () => {
  const [donates, setDonates] = useState([]);
  const loggedUser = useSelector(state => state.user.loggedUser);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');
  const showAlert = (message, severity = 'info') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
  };

  useEffect(() => {
    if (loggedUser) {
      console.log("all donate");
      {
        GetDonateByUserId(loggedUser?.userId).then(res => {
          console.log(res);
          setDonates(res);
        })
      }
    }
  }, [loggedUser]);

  return (
    <Container style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
      <Button variant='contained' style={{
        fontSize: '1.2rem', padding: '15px 25px', backgroundColor: 'grey',
        color: 'white'
      }} onClick={() => navigate('/privateArea/donation')}>
        החזקת תורה
      </Button>
      <Typography variant="h4" style={{ marginTop: '20px', fontSize: '28px', fontWeight: 'bold' }}>
        התרומות שלי
      </Typography>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '20px', justifyContent: 'center' }}>
        {donates.map((donate, index) => (
          <Card key={index} style={{ width: '300px', position: 'relative' }}>
            <CardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              {/* Icon in the top left corner */}
              <Box sx={{ position: 'absolute', top: 8, left: 8 }}>
                <VolunteerActivism fontSize="small" />
              </Box>

              {/* Text content aligned to the right */}
              <Typography variant="body1" style={{ textAlign: 'right' }}>שם רב: {donate.rav?.name}</Typography>
              <Typography variant="body1" style={{ textAlign: 'right' }}> סכום: {donate.sum} ₪</Typography>
              <Typography variant="body1" style={{ textAlign: 'right' }}>תאריך: {donate.date}</Typography>
              <Typography variant="body1" style={{ textAlign: 'right' }}> {<PDFViewer filePath={ donate.file}></PDFViewer>}</Typography>
            </CardContent>
          </Card>
        ))}

      </div>
    </Container>
  );
}

export default Donates;
