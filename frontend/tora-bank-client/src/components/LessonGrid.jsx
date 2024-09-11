import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DeleteLesson, UpdateLesson } from "../utils/lessonUtil";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AddUserLesson, DeleteUserLesson, GetAllUserLessonForUserId } from "../utils/userLesson";
import LessonForm from "./LessonForm";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { setSavedLessons, removeSavedLesson, addSavedLesson } from "../redux/savedLessonSlice";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { removeLesson, setLesson } from "../redux/lessonSlice";

const LessonGrid = ({ lesson, index, onEditLesson,onLessonDelete }) => {

  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.user.loggedUser);
  const { lessonId, description, date, link, status } = lesson;
  const navigate = useNavigate();
  const savedLessons = useSelector((state) => state.savedLesson.savedLessons || []);
  const [message, setMessage] = useState("");
  const iframeRef = useRef(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const isInFavorites = savedLessons.some(savedLesson => savedLesson.lessonId === lesson.lessonId);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); // אפשרויות: 'success', 'error', 'warning', 'info'
  const lessons = useSelector((state) => state.lesson.lessons || []);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      const player = new window.YT.Player(iframeRef.current, {
        events: {
          onReady: (event) => {
            event.target.playVideo();
          },
        },
      });
    };
    if (!savedLessons.length) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage('');
      }, 5000); // ההתראה תיסגר אחרי 5 שניות

      return () => clearTimeout(timer); // ניקוי הטיימר אם הרכיב יוסר
    }
  }, [alertMessage]);


  if (!lesson) {
    return null;
  }
  const fetchData = async () => {
    try {
      setMessage("טוען...");
      const res = await GetAllUserLessonForUserId(loggedUser.userId);
      console.log(loggedUser.userId)
      console.log("Fetched lessons:", res);
      dispatch(setSavedLessons(res));
      if (res.length === 0) {
        setMessage("לא נמצאו נתונים ...😜");
      } else {
        setMessage("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setMessage("בעיה בטעינת נתונים, אנא נסה שוב מאוחר יותר.");
    }
  };

  const handleDeleteLesson = async () => {
    try {
      await DeleteLesson(lessonId);
      if (onLessonDelete) onLessonDelete();
      setAlertMessage('השיעור נמחק בהצלחה!');
      setAlertSeverity('success');
      dispatch(removeLesson(lessonId));
    } catch (error) {
      setAlertMessage('שגיאה במחיקת שיעור.');
      setAlertSeverity('error');
    }
  };

  const handleRemoveFromFavorites = async (lessonId) => {
    const userLesson = savedLessons.find(item => item.lessonId === lessonId);

    if (!userLesson) {
      console.error('UserLesson not found');
      return;
    }
    const userLessonsId = userLesson.userLessonsId; // קבל את ה-`userLessonId`

    try {
      console.log(`Attempting to delete userLessonId: ${userLessonsId}`);
      await DeleteUserLesson(userLessonsId);
      dispatch(removeSavedLesson(userLessonsId));
      setAlertMessage('השיעור הוסר מהמועדפים');
      setAlertSeverity('success');
      console.log(savedLessons)
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setAlertMessage('שגיאה: השיעור לא נמצא ברשימה');
        setAlertSeverity('error');
      } else if (error.response && error.response.status === 400) {
        // שגיאה במידה ויש בעיה עם הבקשה
        setAlertMessage('שגיאה: בקשה לא חוקית');
        setAlertSeverity('error');
      } else {
        // שגיאות אחרות
        setAlertMessage('שגיאה: לא ניתן להסיר את השיעור מהמועדפים');
        setAlertSeverity('error');
      }
    }
  };

  const handleAddToFavorites = async (lesson) => {
    if (!loggedUser) {
      setAlertMessage("עליך להתחבר כדי להוסיף למועדפים");
      setAlertSeverity('error');
      return;
    }

    try {
      let userLessonData = {

        userId: loggedUser.userId,
        lessonId: lesson.lessonId,
      };
      let res = await AddUserLesson(userLessonData);
      userLessonData.userLessonsId = res.userLessonsId;
      userLessonData.lesson = lesson;
      dispatch(addSavedLesson(userLessonData));
      setAlertMessage('השיעור נוסף למועדפים!');
      setAlertSeverity('success');
    } catch (error) {
      console.log(error);
      setAlertMessage(`השיעור כבר קיים ברשימת המועדפים שלך`);
      setAlertSeverity('error');
    }
  };

  const handleApproveLesson = async () => {
    if (!loggedUser || loggedUser.levelId !== 2) {
      setAlertMessage("אין לך הרשאות לאשר שיעור");
      setAlertSeverity('error');

      return;
    }
    const updatedLesson = { ...lesson, status: true };
    try {
      await UpdateLesson(lessonId, updatedLesson);
      setAlertMessage("השיעור אושר בהצלחה");
      setAlertSeverity('success');
    } catch (error) {
      console.log(lesson);
      setAlertMessage("שגיאה באישור השיעור");
      setAlertSeverity('error');
    }
  };


  return (
    <div>
      {alertMessage && (
        <Stack sx={{
          width: '50%', top: 70, position: 'fixed', zIndex: 2000, left: '50%',
          transform: 'translateX(-50%)', alignItems: 'center'
        }} spacing={2}>
          <Alert severity={alertSeverity} color="warning">{alertMessage}</Alert>
        </Stack>
      )}
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Card
          key={index}
          sx={{
            height: "320px",
            width: "350px",
            p: "10px",
            borderRadius: "10px",
            marginBottom: "5px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            overflow: "hidden",
            "&:hover": {
              border: "1px solid #ccc",
              transform: "scale(1.15)",
              transition: "transform 0.3s ease",
              filter: "brightness(0.9)",
              zIndex: 10,
            },
          }}
        >
          <iframe
            ref={iframeRef}
            src={link}
            width="100%"
            height="200px"
            allowFullScreen
            style={{ borderRadius: "10px 10px 0 0" }}
          ></iframe>
          <Box p="10px">
            <Typography variant="body2" color="textSecondary">
              {description}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 'bold' }}>
              {date}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: "10px",
              position: "relative",
              zIndex: 1,
            }}
          >
            {loggedUser && loggedUser.levelId === 2 && (
              <>
                <Button onClick={handleDeleteLesson} variant="outlined">
                  מחיקה
                  <DeleteIcon />
                </Button>
                <Button onClick={() => {
                  setOpenEditDialog(true);
                  onEditLesson(lesson);
                }} variant="outlined">
                  עריכה
                  <ModeEditIcon />
                </Button>
              </>
            )}
            {loggedUser && lesson.status === true && (
              <Button
                onClick={isInFavorites ? () => handleRemoveFromFavorites(lesson.lessonId) : () => handleAddToFavorites(lesson)}
                variant="outlined"
                startIcon={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {isInFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    <Box sx={{ width: '8px' }} /> {/* המרווח בין האייקון לטקסט */}
                  </Box>
                }
              >
                {isInFavorites ? 'מועדפים' : 'מועדפים'}
              </Button>
            )}
          </Box>
        </Card>
      </Grid>
    </div>
  );
};

export default LessonGrid;
