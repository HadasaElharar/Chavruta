import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Typography, Grid, Container, Drawer, CssBaseline, useTheme, useMediaQuery } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import UnApproveLessonGrid from "./UnApproveLessonGrid";
import { GetLessonsByStatus } from "../utils/lessonUtil";
import { useNavigate } from "react-router-dom";
import LessonForm from "./LessonForm";

export default function UnApproveLessons() {

    const emptyLesson = {
        description: "",
        userRavId: 0,
        date: new Date(0),
        uploadByUser: false,
        status: false,
        link: "",
        type: 0,
        categoryId: 0,
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [message, setMessage] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [unApproveLessons, setUnApproveLessons] = useState([]);
    const loggedUser = useSelector((state) => state.user.loggedUser);
    const navigate = useNavigate();
    const [hasNext, setHasNext] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };
    const drawerWidth = 240;

    useEffect(() => {
        if (!unApproveLessons.length) {
            fetchData(currentPage);
        }
    }, []);

    const fetchData = async (page) => {
        try {
            setMessage("טוען...");
            const res = await GetLessonsByStatus(page);
            console.log("Fetched lessons:", res); // Debugging line
            const lastElementIsNull = res[res.length - 1] === null;
            console.log(lastElementIsNull)
            setHasNext(!lastElementIsNull);
            console.log(setHasNext)

            if (lastElementIsNull) {
                res.pop();
            }
            setUnApproveLessons(res);
            setCurrentPage(page);

            if (res.length === 0) {
                setMessage("לא נמצאו נתונים ...😜");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage("בעיה בטעינת נתונים, אנא נסה שוב מאוחר יותר.");
        }
    };

    const handleNavigateToUpload = () => {
        navigate('/privateArea/uploadLesson');
    };

    const handleNextPage = () => {
        fetchData(currentPage + 1);
    };

    const handlePrevPage = () => {
        fetchData(currentPage - 1);
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
            <CssBaseline />
            <Container maxWidth="xl" sx={{ display: 'flex', height: '100vh', paddingTop: '1px' }}>
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 8 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, position: "sticky", top: 0 }}>
                        {loggedUser && (
                            <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNavigateToUpload}
                            startIcon={<AddIcon />}
                            sx={{
                                backgroundColor: '#757575', // צבע אפור
                                color: 'white',
                                padding: '4px 8px',
                                '&:hover': {
                                    backgroundColor: '#bdbdbd',
                                },
                                minWidth: 'auto',
                                marginBottom: 2
                            }}
                        >
                            העלאת שיעור חדש
                        </Button>
                        )}
                        <Grid container spacing={3} justifyContent="space-around">
                            {unApproveLessons.length > 0 ? unApproveLessons.map((lesson, index) => (
                                <UnApproveLessonGrid
                                    key={index}
                                    lesson={lesson}
                                    onEditLesson={handleEditLesson}
                                    setOpen={setOpen}
                                    setSelectedLesson={setSelectedLesson}
                                    unApproveLessons={unApproveLessons}
                                    setUnApproveLessons={setUnApproveLessons}

                                />
                            )) : <Typography>{message}</Typography>}
                        </Grid>
                        <Box display="flex" justifyContent="space-between" mt={2}>
                            <Button disabled={currentPage === 1} onClick={handlePrevPage}>הקודם</Button>
                            <Button disabled={!hasNext} onClick={handleNextPage}>הבא</Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </>
    );
}
