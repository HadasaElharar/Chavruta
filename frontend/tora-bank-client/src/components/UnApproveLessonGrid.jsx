import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DeleteLesson, UpdateLesson } from "../utils/lessonUtil";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LessonForm from "./LessonForm";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const UnApproveLessonGrid = ({ lesson, onEditLesson, index, unApproveLessons, setUnApproveLessons }) => {

    const loggedUser = useSelector((state) => state.user.loggedUser);
    const navigate = useNavigate();
    const { lessonId, description, date, link, status } = lesson;
    const iframeRef = useRef(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('success'); //

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


        return () => {
            // Cleanup Youtube API script
            const tag = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
            if (tag) tag.remove();
        };
    }, [link]);

    useEffect(() => {
        if (alertMessage) {
            const timer = setTimeout(() => {
                setAlertMessage('');
            }, 5000); // ההתראה תיסגר אחרי 5 שניות

            return () => clearTimeout(timer); // ניקוי הטיימר אם הרכיב יוסר
        }
    }, [alertMessage]);

    if (!lesson) {
        return null; // Return null if lesson is null
    }

    const handleDeleteLesson = async () => {
        try {
            await DeleteLesson(lessonId);
            setAlertMessage('שיעור נמחק בהצלחה!');
            setAlertSeverity('success');
            let updatedUnApproveLesson = unApproveLessons.filter(u => u.lessonId !== lesson.lessonId);
            setUnApproveLessons(updatedUnApproveLesson);
        } catch (error) {
            setAlertMessage('שגיאה במחיקת שיעור.');
            setAlertSeverity('error');
        }
    };

    const handleApproveLesson = async () => {
        lesson.status = true;
        try {
            const res = await UpdateLesson(lesson.lessonId, lesson);
            if (res) {
                setAlertMessage('שיעור אושר בהצלחה!');
                setAlertSeverity('success');
                let updatedUnApproveLesson = unApproveLessons.filter(u => u.lessonId !== lesson.lessonId);
                setUnApproveLessons(updatedUnApproveLesson);
            }
        } catch (error) {
            setAlertMessage('שגיאה באישור שיעור.');
            setAlertSeverity('error');
        }
    };

    // Ensure date is a Date object
    const formattedDate = new Date(date).toDateString();

    return (
        <div>
            {alertMessage && (
                <Stack sx={{
                    width: '50%', top: 70, position: 'fixed', zIndex: 1000, left: '50%',
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
                        style={{ borderRadius: "10px 10px 0 0", border: 'none' }}
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
                                {lesson.status !== true && (
                                    <Button onClick={handleApproveLesson}  variant="outlined">
                                        אישור
                                        <CheckCircleIcon />
                                    </Button>
                                )}
                            </>
                        )}
                    </Box>
                </Card>
            </Grid>
        </div>
    );
};

export default UnApproveLessonGrid;
