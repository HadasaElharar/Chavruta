import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Button, Collapse, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useSelector } from 'react-redux';
import { GetQaByUserId, GetQaByRavId, UpdateQa } from '../utils/qaUtil';
import { useNavigate } from 'react-router-dom';
import AlertMessage from './AlertMessage';


const MyQuestions = () => {
  const loggedUser = useSelector(state => state.user.loggedUser);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [openQuestion, setOpenQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showAnswered, setShowAnswered] = useState(false);  // State to toggle between answered and unanswered questions
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  useEffect(() => {
    fetchQuestions();
  }, [loggedUser.userId, loggedUser.levelId]);

  const fetchQuestions = async () => {
    try {
      let myQuestions;
      if (loggedUser.levelId === 3) { // Check if the user is a Rav
        myQuestions = await GetQaByRavId(loggedUser.userId);
        // Filter out questions that have a response
        myQuestions = myQuestions.filter(question => question.response === null);
      } else {
        myQuestions = await GetQaByUserId(loggedUser.userId);
      }
      setQuestions(myQuestions);
    } catch (err) {
      console.error(err);
      setError("שגיאה בהבאת השאלות");
    }
  };
  const showAlert = (message, severity = 'info') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
  };
  const handleQuestionClick = async (question) => {
    if (openQuestion !== question.qaId && question.response !== null && loggedUser.levelId !== 3) {
      question.status = true;
      try {
        await UpdateQa(question.qaId, question).then(res => {
          console.log(res);
        });
        setQuestions(questions.map(q =>
          q.qaId === question.qaId ? { ...q, status: true } : q
        ));
      } catch (err) {
        console.error(err);
        setError("שגיאה בעדכון השאלה");
        showAlert("שגיאה בעדכון השאלה", 'error');
      }
    }

    setOpenQuestion(openQuestion === question.qaId ? null : question.qaId);
  };

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleAnswerSubmit = (question) => {
    setSelectedQuestion(question);
    setOpenConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    selectedQuestion.response = answer;
    try {
      await UpdateQa(selectedQuestion.qaId, selectedQuestion).then(res => {
        console.log(res);
      });
      // עדכון הרשימה לאחר שליחת תשובה
      setQuestions(questions.filter(q => q.qaId !== selectedQuestion.qaId));
      setAnswer('');
      setOpenQuestion(null);
      setOpenConfirmDialog(false);
    } catch (err) {
      console.error(err);
      setError("שגיאה בעדכון השאלה");
      showAlert("שגיאה בעדכון השאלה", 'error');
    }
  };

  const handleCancelSubmit = () => {
    setOpenConfirmDialog(false);
    setSelectedQuestion(null);
  };

  const navigate = useNavigate();

  const handleCreateNewQuestion = () => {
    navigate('/privateArea/ask');
  };

  const handleViewHistory = () => {
    navigate('/privateArea/answerHistory');
  };

  const renderQuestions = () => (
    <List>
      {[...questions].reverse().map((question) => {
        const primaryText = question.subject;
        const secondaryText = loggedUser.levelId !== 3 
          ? question.response 
            ? (question.status ? 'נקרא' : 'לא נקרא') 
            : 'טרם התקבלה תשובה'
          : null;

        return (
          <Box key={question.qaId} sx={{ mb: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <ListItem
              button
              onClick={() => handleQuestionClick(question)}
              sx={{ backgroundColor: question.response ? 'white' : '#f0f0f0' }}
            >
              <ListItemText 
                primary={primaryText}
                secondary={secondaryText}
                primaryTypographyProps={{ fontWeight: question.status === null && question.response !== null ? 'bold' : 'normal', fontSize: '1.4rem' }}
                sx={{ direction: 'rtl', textAlign: 'right' }}
              />
            </ListItem>
            <Collapse in={openQuestion === question.qaId} timeout="auto" unmountOnExit>
              <Box sx={{ p: 2 }}>
                <Typography variant="body1" sx={{ mt: 2 ,direction: 'ltr'}}>
                  <strong>תאריך יצירה:</strong> {question.createDate}
                </Typography>
                <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: '4px', mt: 2 }}>
                  <Typography variant="body1">
                    <strong>שאלה:</strong> {question.message}
                  </Typography>
                </Box>
                {loggedUser.levelId !== 3 && (
                  <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: '4px', mt: 2 }}>
                    <Typography variant="body1" sx={{ mt: 2 }}>
                      <strong>תשובה:</strong> {question.response ? question.response : 'התשובה טרם התקבלה'}
                    </Typography>
                  </Box>
                )}
                {loggedUser.levelId === 3 && (
                  <>
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="תשובה"
                      multiline  // Enable multiline input
                      rows={4}   
                      value={answer}
                      onChange={handleAnswerChange}
                      sx={{ mt: 2 }}
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAnswerSubmit(question)}
                      sx={{ mt: 2 }}
                    >
                      שלח תשובה
                    </Button>
                  </>
                )}
              </Box>
            </Collapse>
          </Box>
        );
      })}
    </List>
  );

  return (
    <Container maxWidth="sm">
      
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          {loggedUser.levelId === 3 ? 'פניות אלי' : 'השאלות שלי'}
        </Typography>
        {loggedUser.levelId !== 3 && (
          <Button variant="contained" sx={{ backgroundColor: 'brown', color: 'white' }} onClick={handleCreateNewQuestion}>
            שאל את הרב
          </Button>
        )}
        {loggedUser.levelId === 3 && (
          <Button variant="contained" sx={{ backgroundColor: 'brown', color: 'white' }} onClick={handleViewHistory}>
            היסטוריית התשובות שלי
          </Button>
        )}
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      {renderQuestions()}
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelSubmit}
      >
        <DialogTitle>אישור שליחת תשובה</DialogTitle>
        <DialogContent>
          <DialogContentText>האם אתה בטוח שברצונך לשלוח את התשובה?</DialogContentText>
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
      <AlertMessage
        message={alertMessage}
        severity={alertSeverity}
        onClose={() => setAlertMessage('')}
      />
    </Container>
  );
};

export default MyQuestions;
