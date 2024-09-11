import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText, Button, Collapse } from '@mui/material';
import { useSelector } from 'react-redux';
import { GetQaByRavId } from '../utils/qaUtil'; // נניח ש-GetQaByRavId כבר קיימת
import { useNavigate } from 'react-router-dom';

const AnswerHistory = () => {
  const loggedUser = useSelector(state => state.user.loggedUser);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const [openQuestionId, setOpenQuestionId] = useState(null); // Track open question

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        let answeredQuestions = await GetQaByRavId(loggedUser.userId);
        // Filter questions with responses
        answeredQuestions = answeredQuestions.filter(question => question.response !== null);
        setQuestions(answeredQuestions);
      } catch (err) {
        console.error(err);
        setError("שגיאה בהבאת השאלות");
      }
    };

    fetchQuestions();
  }, [loggedUser.userId]);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/privateArea');
  };

  const handleQuestionClick = (qaId) => {
    setOpenQuestionId(openQuestionId === qaId ? null : qaId);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom>
          היסטוריית התשובות שלי
        </Typography>
        <Button variant="contained" sx={{ backgroundColor: 'brown', color: 'white' }} onClick={handleBack}>
          חזור
        </Button>
      </Box>
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {[...questions].reverse().map((question) => (
          <Box key={question.qaId} sx={{ mb: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <ListItem
              button
              onClick={() => handleQuestionClick(question.qaId)}
              sx={{ backgroundColor: 'white', padding: 2 }}
            >
              <ListItemText
                primary={question.subject}
                secondary={`תאריך שאלה: ${question.createDate}`}
                primaryTypographyProps={{ fontWeight: 'bold', fontSize: '1.2rem' }}
                sx={{ direction: 'rtl', textAlign: 'right' }}
              />
            </ListItem>
            <Collapse in={openQuestionId === question.qaId} timeout="auto" unmountOnExit>
  <Box sx={{ p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
    <Typography variant="body1" sx={{ mt: 2, direction: 'rtl', textAlign: 'right' }}>
      <strong>שאלה:</strong> {question.message}
    </Typography>
    <Typography variant="body1" sx={{ mt: 2, direction: 'rtl', textAlign: 'right' }}>
      <strong>תשובה:</strong> {question.response}
    </Typography>
  </Box>
</Collapse>

          </Box>
        ))}
      </List>
    </Container>
  );
};

export default AnswerHistory;
