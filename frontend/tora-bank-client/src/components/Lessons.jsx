import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Toolbar, AppBar, IconButton, Grid, Typography, Chip, Container, Drawer, CssBaseline, useTheme, useMediaQuery } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import FilterInput from "./FilterInput";
import SearchInput from "./SearchInput";
import LessonGrid from "./LessonGrid";
import { setDataFilter, setLesson, clearFilterParams } from "../redux/lessonSlice";
import {
    GetLessonsByPage,
    GetFilterLessonByPage,
    GetSearchLessonByPage,
} from "../utils/lessonUtil";
import { useNavigate } from "react-router-dom";
// import { fetchCategories, fetchTypes ,fetchRabbaies} from '../redux/lessonThunk';
import { GetAllCategory, GetAllType } from "../utils/lookUpUtil";
import { GetAllRabaies } from "../utils/userUtil";
import FilterChips from "./FilterChips";
import LessonForm from "./LessonForm";

export default function Lessons() {
    const dispatch = useDispatch();
    const [filterParams, setFilterParams] = useState({

        categoryID: null,
        startDate: null,
        endDate: null,
        ravId: null,
        // typeID: null,
        type: null,
        // title: null,
        // ravTopic: null,
        // uploadDate: null
    });
    const emptyLesson = {
        Description: "",
        UserRavId: 0,
        Date: new Date(0),
        UploadByUser: false,
        Status: false,
        Link: "",
        typeID: 0,
        CategoryId: 0,
    };
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredLessons, setFilteredLessons] = useState([]);
    const [message, setMessage] = useState("");
    const [isFilter, setIsFilter] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedLesson, setSelectedLesson] = useState({
        description: null,
        userRavId: null,
        date: null,
        uploadByUser: null,
        status: null,
        link: null,
        type: null,
        categoryId: null,
    });
    const categories = useSelector((state) => state.lesson.dataFilter.categories || []);
    const types = useSelector((state) => state.lesson.dataFilter.types || []);
    const rabbaies = useSelector((state) => state.lesson.dataFilter.rabbaies || []);
    const lessons = useSelector((state) => state.lesson.lessons || []);
    const loggedUser = useSelector((state) => state.user.loggedUser);
    const [searchedLessons, setSearchedLessons] = useState([]);
    const [hasNext, setHasNext] = useState(true);
    const [prevStr, setPrevStr] = useState("");

    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const res = await GetAllCategory();
            dispatch(setDataFilter({ categories: res }));
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            dispatch(setDataFilter({ categories: [] }));
        }
    };

    const fetchTypes = async () => {
        try {
            const res = await GetAllType();
            dispatch(setDataFilter({ types: res }));
        } catch (error) {
            console.error('Failed to fetch types:', error);
            dispatch(setDataFilter({ types: [] }));
        }
    };
    const fetchRabbaies = async () => {
        try {
            const res = await GetAllRabaies();
            dispatch(setDataFilter({ rabbaies: res }));
        } catch (error) {
            console.error('Failed to fetch rabbaies:', error);
            dispatch(setDataFilter({ rabbaies: [] }));
        }
    };

    useEffect(() => {
        if (!lessons.length) {
            fetchData(currentPage);
        }

        if (!categories.length) {
            fetchCategories();
        }
        if (!types.length) {
            fetchTypes();
        }
        if (!rabbaies.length) {
            fetchRabbaies();
        }
    }, []);

    useEffect(() => {
        handleFilterCategory(currentPage, filterParams);
    }, [filterParams]);

    useEffect(() => {
        resetChips();
    }, [SearchInput]);

    const handleFilterCategory = async (page, _filterParams) => {
        try {
            setIsFilter(true);
            const res = await GetFilterLessonByPage(page, _filterParams);
            const lastElementIsNull = res[res.length - 1] === null;
            setHasNext(!lastElementIsNull);
            if (lastElementIsNull) {
                res.pop();
            }
            setFilteredLessons(res);
            setSearchedLessons(res);
            setCurrentPage(page);
            if (res.length === 0) {
                setMessage("לא נמצאו נתונים ...😜");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage("בעיה בטעינת נתוני סינון, אנא נסה שוב מאוחר יותר.");
        }
    };

    const fetchData = async (page) => {
        try {
            setMessage("טוען...");
            const res = await GetLessonsByPage(page);
            console.log("Fetched lessons:", res); // Debugging line
            const lastElementIsNull = res[res.length - 1] === null;
            console.log(lastElementIsNull)

            setHasNext(!lastElementIsNull);
            console.log(setHasNext)

            if (lastElementIsNull) {
                res.pop();
            }
            dispatch(setLesson(res));
            setFilteredLessons(res);
            setSearchedLessons(res);
            setCurrentPage(page);
            if (res.length === 0) {
                setMessage("לא נמצאו נתונים ...😜");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage("בעיה בטעינת נתונים, אנא נסה שוב מאוחר יותר.");
        }
    };

    const handleDeleteLesson = async () => {
        await fetchData(currentPage); // קורא ל-fetchData כדי לעדכן את הרשימה
    };
    const handleLessonUpdate = async () => {
        await fetchData(currentPage);
    };


    const handleSearchLessons = async (s, page = 1) => {
        try {
            setIsFilter(false);
            setFilterParams((prev) => {
                const newFilterParams = { ...prev };
                Object.keys(newFilterParams).forEach((key) => {
                    newFilterParams[key] = ''; // ביטול כל הסינונים
                });
                return newFilterParams;
            });

            if (s !== "") {
                const res = await GetSearchLessonByPage(s, page);
                const lastElementIsNull = res[res.length - 1] === null;
                setHasNext(!lastElementIsNull);
                if (lastElementIsNull) {
                    res.pop();
                }

                setSearchedLessons(res);
                setFilteredLessons(res);
                setCurrentPage(page);
                setPrevStr(s);
                if (res.length === 0) {
                    setMessage("לא נמצאו נתונים ...😜");
                }
            } else {
                setPrevStr("");
                setCurrentPage(1);
                fetchData(1);
                setFilteredLessons([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setMessage("בעיה בטעינת נתוני חיפוש, אנא נסה שוב מאוחר יותר.");
        }
    };
    const handleNavigateToUpload = () => {
        navigate('/privateArea/uploadLesson');
    };

    const handleNextPage = () => {
        isFilter
            ? handleFilterCategory(currentPage + 1, filterParams)
            : handleSearchLessons(prevStr, currentPage + 1);
    };

    const handlePrevPage = () => {
        isFilter
            ? handleFilterCategory(currentPage - 1, filterParams)
            : handleSearchLessons(prevStr, currentPage - 1);
    };



    const handleRemoveFilter = (key) => {
        const newParams = { ...filterParams, [key]: null };
        setFilterParams(newParams);
        handleFilterCategory(currentPage, newParams);
        dispatch(clearFilterParams());
    };


    const handleFilterParamsChange = (newParams) => {
        setFilterParams(prevParams => {
            const updatedParams = { ...prevParams, ...newParams };
            console.log('Updated Filter Params:', updatedParams);
            return updatedParams;
        });
        setIsFilter(true);
    };
    const renderChips = () => {
        return Object.entries(filterParams).map(([key, value]) => {
            if (value) {
                const label = `${key.split('ID').join('')}: ${value}`;
                return <Chip key={key} label={label} onDelete={() => handleRemoveFilter(key)} />;
            }
            return null;
        });
    };
    const resetChips = () => {
        const resetParams = {
            categoryID: null,
            startDate: null,
            endDate: null,
            ravId: null,
            type: null,
        };
        setIsFilter(false);
        setFilterParams(resetParams); // Update local state to trigger re-render
        Object.keys(resetParams).forEach(key => {
            if (resetParams[key] === null) {
                handleRemoveFilter(key); // נקרא לפונקציה כדי להסיר את המסננים מה-UI או ה-state
            }
        });// Fetch data without filters
    };
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };
    const handleEditLesson = (lesson) => {
        setSelectedLesson(lesson);
        setOpen(true);
    };
    const drawerWidth = 240;


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
                <Drawer
                    variant={isSmallScreen ? 'temporary' : 'permanent'}
                    open={isSmallScreen ? drawerOpen : true}
                    onClose={toggleDrawer}
                    anchor="right"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        maxWidth: { xs: '100%', md: '400px' },
                        [`& .MuiDrawer-paper`]: { width: 230, boxSizing: 'border-box' },
                        paddingTop: '32px'
                    }}
                >
                    <Box sx={{ overflow: 'auto', position: 'fixed', height: '100%', width: 220, paddingTop: 11 }}>
                        <Typography variant="h6" sx={{ paddingLeft: 2, textAlign: 'right', marginBottom: 2 }}>
                            שיעורי תורה
                        </Typography>
                        <FilterInput
                            handleChange={handleFilterCategory}
                            filterParams={filterParams}
                            setFilterParams={handleFilterParamsChange}
                            setIsFilter={setIsFilter}
                        />
                        <FilterChips
                            filterParams={filterParams}
                            handleRemoveFilter={handleRemoveFilter}
                        />
                    </Box>
                </Drawer>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, mt: 1 }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, position: "sticky", top: 0 }}>
                        <SearchInput
                            handleChange={handleSearchLessons}
                        />

                        {loggedUser && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleNavigateToUpload}
                                startIcon={<AddIcon />}
                                sx={{
                                    backgroundColor: '#757575',
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
                            {filteredLessons.length > 0 ? filteredLessons.map((lesson, index) => (
                                <LessonGrid
                                    key={index}
                                    lesson={lesson}
                                    setOpen={setOpen}
                                    setSelectedLesson={setSelectedLesson}
                                    onEditLesson={handleEditLesson}
                                    onLessonDelete={handleDeleteLesson}
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