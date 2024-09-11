import React, { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button, Grid, Typography, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
    GetAllUserLessonForUserIdByPage,
} from "../utils/userLesson";
import LessonGrid from "./LessonGrid";
import { useNavigate } from "react-router-dom";
import { setSavedLessonsByPage } from "../redux/savedLessonSlice";
import LessonForm from "./LessonForm";


export default function SavedLesson() {

    const [currentPage, setCurrentPage] = useState(1);
    const [hasNext, setHasNext] = useState(true);
    const [open, setOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const loggedUser = useSelector((state) => state.user.loggedUser);
    const savedLessonsByPage = useSelector((state) => state.savedLesson.savedLessonsByPage || []);

    const [savedLesson, setSavedLesson] = useState({

        userLessonsId: null,
        userId: null,
        lessonId: null,
        lesson: null,

    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!savedLessonsByPage.length) {
            fetchData(currentPage);
        }
    }, []);

    
    const fetchData = async (page) => {
        try {
            setMessage("טוען...");
            const res = await GetAllUserLessonForUserIdByPage(loggedUser.userId, page);
            console.log(loggedUser.userId, page)
            console.log("Fetched lessons:", res); 
            const lastElementIsNull = res[res.length - 1] === null;
            setHasNext(!lastElementIsNull);
            if (lastElementIsNull) {
                res.pop(); 
            }
            dispatch(setSavedLessonsByPage(res)); // Update Redux state with new lessons
            setCurrentPage(page);
            if (res.length === 0) {
                setMessage("לא נמצאו נתונים ...😜");
            } else {
                setMessage(""); // Clear message if data is fetched
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage("בעיה בטעינת נתונים, אנא נסה שוב מאוחר יותר.");
        }
    };
    const handleDeleteLesson = async () => {
        await fetchData(currentPage); // קורא ל-fetchData כדי לעדכן את הרשימה
    };

    const handleNextPage = () => {
        fetchData(currentPage + 1);
    };
    const handlePrevPage = () => {
        fetchData(currentPage - 1);
    };
    const handleNavigateToUpload = () => {
        navigate('/privateArea/uploadLesson');
    };
    const handleEditLesson = (lesson) => {
        setSelectedLesson(lesson);
        setOpen(true);
    };
    const handleLessonUpdate = async () => {
        await fetchData(currentPage);
    };
    

    return (
        <>
           <LessonForm
                open={open}
                onClose={setOpen}
                lesson={selectedLesson}
                onUpdate={handleLessonUpdate}

            />
            <Container maxWidth="xl" sx={{ display: 'flex', height: '100vh', paddingTop: '32px' }}>
                <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, position: "sticky" }}>
                        {loggedUser && (
                           <Button
                           variant="contained"
                           color="primary"
                           onClick={handleNavigateToUpload}
                           startIcon={<AddIcon />}
                           sx={{
                             backgroundColor: '#757575',
                             color: 'white',
                             padding: '8px 16px',
                             '&:hover': {
                               backgroundColor: '#bdbdbd',
                             },
                             minWidth: 'auto',
                           }}
                         >
                            העלאת שיעור חדש
                         </Button>
                        )}
                    </Box>
                    <Grid container spacing={3} justifyContent="space-around">
                        {savedLessonsByPage.length > 0 ? savedLessonsByPage.map((savedLesson, index) => (
                            <LessonGrid
                                key={index}
                                lesson={savedLesson.lesson}
                                setOpen={setOpen}
                                setSelectedLesson={setSelectedLesson}
                                onEditLesson={handleEditLesson}
                                onLessonDelete={handleDeleteLesson}


                            />
                        )) : <Typography>{message}</Typography>}
                    </Grid>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                        <Button
                            disabled={currentPage === 1}
                            onClick={handlePrevPage}
                        >
                            הקודם
                        </Button>
                        <Button
                            disabled={!hasNext}
                            onClick={handleNextPage}
                        >
                            הבא
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
