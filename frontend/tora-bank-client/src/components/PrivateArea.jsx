import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardActionArea, Badge } from '@mui/material';
import { GetQaByUserId } from '../utils/qaUtil'; 
import { VolunteerActivism,CalendarToday , QuestionAnswer, Group, Favorite, UploadFile } from '@mui/icons-material';

const PrivateArea = () => {
  const loggedUser = useSelector(state => state.user.loggedUser);
  const navigate = useNavigate();
  const [unreadResponsesCount, setUnreadResponsesCount] = useState(0);

  useEffect(() => {
    if (loggedUser == null) {
      navigate("/notFound");
    }
  }, [loggedUser, navigate]);

  useEffect(() => {
    

    if (loggedUser) {
      countUnreadResponses(loggedUser.userId);
    }
  }, [loggedUser]);

  const countUnreadResponses = async (userId) => {
    try {
      const questions = await GetQaByUserId(userId);
      // ספור את השאלות שלא נקראו (status הוא null ויש תשובה ב-response)
      const unreadCount = questions.filter(question => question.status === null && question.response !== null).length;
      setUnreadResponsesCount(unreadCount);
    } catch (err) {
      console.error("שגיאה בהבאת השאלות", err);
      setUnreadResponsesCount(0);
    }
  };
  
  const cards = [
    { title: "קהילת חברותא", icon: <Group style={{ fontSize: 65 }} />, link: "myChavrutaStatus" }, 
    { title: " יומן", icon: <CalendarToday  style={{ fontSize: 65 }} />, link: "myCalendar" },
    //{ title: " חברותות שלי", icon: <Group style={{ fontSize: 65 }} />, link: "chavruta" }, 
    { title: "שיעורים שמורים", icon: <Favorite style={{ fontSize: 65 }} />, link: "savedLessons" }, 
    { title: "העלאת שיעור חדש", icon: <UploadFile   style={{ fontSize: 65 }} />, link: "uploadLesson" }, 
    { title: "הפניות שלי", icon: <Badge badgeContent={unreadResponsesCount} color="error"><QuestionAnswer style={{ fontSize: 65 }} /></Badge>, link: "MyQuestions" },
    { title: "התרומות שלי", icon: <VolunteerActivism style={{ fontSize: 65 }} />, link: "donates" },
];

  return (
    <Grid container spacing={3} justifyContent="center" style={{ margin: '20px -24px' }}>
      {cards.map((card, index) => (
        <Grid item xs={10} sm={3.2} key={index}>
          <Card style={{ height: '100%' }}>
            <CardActionArea component={Link} to={card.link} style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CardContent style={{ textAlign: 'center' }}>
                {card.icon}
                <Typography variant="h6" component="div" style={{ marginTop: 10 }}>
                  {card.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PrivateArea;
