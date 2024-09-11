import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, Typography, CardActionArea, Badge } from '@mui/material';
import { TableView  , QuestionAnswer, Group, Favorite, UploadFile } from '@mui/icons-material';

const Management = () => {
  const loggedUser = useSelector(state => state.user.loggedUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser == null||loggedUser.levelId != 2) {
      navigate("/notFound");
    }
  }, [loggedUser, navigate]);


  
  const cards = [
    { title: "ניהול הרשאות", icon: <Group style={{ fontSize: 65 }} />, link: "permissions" }, 
    { title: "טבלאות", icon: <TableView   style={{ fontSize: 65 }} />, link: "lookUpTables" }, 
    { title: "אישור שיעורים", icon: <UploadFile   style={{ fontSize: 65 }} />, link: "unApproveLessons" }, 
    { title: "פניות משתמשים", icon: <QuestionAnswer style={{ fontSize: 65 }} />, link: "contacts" },
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

export default Management;
