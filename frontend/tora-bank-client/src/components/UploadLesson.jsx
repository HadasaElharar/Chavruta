import React, { useEffect, useState } from 'react';
import { TextField, Button, Typography, Container, MenuItem, Select, InputLabel, FormControl, Grid, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AddLesson } from '../utils/lessonUtil';
import { GetAllRabaies } from '../utils/userUtil';
import { GetAllCategory, GetAllType } from '../utils/lookUpUtil';
import { format } from 'date-fns';
import AlertMessage from './AlertMessage';


const UploadLesson = () => {
    const loggedUser = useSelector(state => state.user.loggedUser);
    const navigate = useNavigate();
    const [lesson, setLesson] = useState({
        description: '',
        userRavId: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        uploadByUser: false,
        status: false,
        link: '',
        type: '',
        categoryId: ''
    });
    const [error, setError] = useState("");
    const [formErrors, setFormErrors] = useState({});
    const [rabbis, setRabbis] = useState([]);
    const [categories, setCategoriesList] = useState([]);
    const [types, setTypesList] = useState([]);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');
    const showAlert = (message, severity = 'info') => {
        setAlertMessage(message);
        setAlertSeverity(severity);
    };

    useEffect(() => {
        getAllRabbis();
        getAllCategory();
        getAllTypes();
    }, []);


    const getAllRabbis = async () => {
        try {
            const rabaiesResponse = await GetAllRabaies();
            setRabbis(rabaiesResponse);
        } catch (error) {
            console.error("Error fetching rabaies:", error);
        }
    };


    const getAllCategory = async () => {
        try {
            const categoriesRes = await GetAllCategory();
            setCategoriesList(categoriesRes);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const getAllTypes = async () => {
        try {
            const res = await GetAllType();
            setTypesList(res);
        } catch (error) {
            console.error("Error fetching types:", error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLesson({
            ...lesson,
            [name]: value
        });
    };

    const handleDateChange = (event) => {
        setLesson({
            ...lesson,
            date: event.target.value
        });
    };

    useEffect(() => {
        if (loggedUser) {
            if (loggedUser.levelId === 1) {
                setLesson(prev => ({
                    ...prev,
                    uploadByUser: true,
                    status: false
                }));
            } else {
                setLesson(prev => ({
                    ...prev,
                    uploadByUser: false,
                    status: true
                }));
            }
        }
    }, [loggedUser]);

    const validateForm = () => {
        let errors = {};
        if (!lesson.description.trim()) errors.description = 'שדה חובה';
        if (!lesson.userRavId) errors.userRavId = 'שדה חובה';
        if (!lesson.date) errors.date = 'שדה חובה';
        if (!lesson.link.trim()) errors.link = 'שדה חובה';
        if (!lesson.type) errors.type = 'שדה חובה';
        if (!lesson.categoryId) errors.categoryId = 'שדה חובה';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        try {
            await AddLesson(lesson);
            if (loggedUser.levelId === 1) {
                showAlert("השיעור נוסף בהצלחה, לאחר אישור מנהל הוא יופיע ברשימת שיעורים", 'success');
            } else {
                showAlert("השיעור נוסף בהצלחה, וניתן לראותו ברשימת השיעורים", 'success');
            }
            setTimeout(() => {
                navigate('/privateArea'); // Replace with your actual path
            }, 3000); // Adjust the delay as needed

        } catch (err) {
            console.error(err);
            showAlert("העלאה נכשלה. בבקשה נסה שוב.", 'error');
        }
    };

    const isFormValid = Object.keys(formErrors).length === 0;

    return (
        <div>
            <AlertMessage
                message={alertMessage}
                severity={alertSeverity}
                onClose={() => setAlertMessage('')}
            />
            <Container component="main" maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                    <Typography component="h1" variant="h5" align="center">
                        העלאת שיעור חדש
                    </Typography>
                    <Box component="form" sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    required
                                    label="תיאור"
                                    name="description"
                                    value={lesson.description}
                                    onChange={handleChange}
                                    multiline
                                    rows={4}
                                    error={!!formErrors.description}
                                    helperText={formErrors.description}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth variant="outlined" required error={!!formErrors.userRavId}>
                                    <InputLabel id="rav-select-label">רב</InputLabel>
                                    <Select
                                        labelId="rav-select-label"
                                        name="userRavId"
                                        value={lesson.userRavId || ''}
                                        onChange={handleChange}
                                        label="רב"

                                    >
                                        {rabbis.map(rabbi => (
                                            <MenuItem key={rabbi.userId} value={rabbi.userId}>
                                                {rabbi.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formErrors.userRavId && <Typography color="error">{formErrors.userRavId}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="תאריך"
                                    type="date"
                                    name="date"
                                    value={lesson.date}
                                    onChange={handleDateChange}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    error={!!formErrors.date}
                                    helperText={formErrors.date}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="קישור"
                                    name="link"
                                    value={lesson.link}
                                    onChange={handleChange}
                                    error={!!formErrors.link}
                                    helperText={formErrors.link}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth variant="outlined" required error={!!formErrors.type}>
                                    <InputLabel id="type-select-label">סוג קובץ</InputLabel>
                                    <Select
                                        labelId="type-select-label"
                                        name="type"
                                        value={lesson.type || ''}
                                        onChange={handleChange}
                                        label="סוג קובץ"
                                    >
                                        {types.map(type => (
                                            <MenuItem key={type.id} value={type.id}>
                                                {type.desc}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formErrors.type && <Typography color="error">{formErrors.type}</Typography>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <FormControl fullWidth variant="outlined" required error={!!formErrors.categoryId}>
                                    <InputLabel id="category-select-label">קטגוריה</InputLabel>
                                    <Select
                                        labelId="category-select-label"
                                        name="categoryId"
                                        value={lesson.categoryId || ''}
                                        onChange={handleChange}
                                        label="קטגוריה"
                                    >
                                        {categories.map(category => (
                                            <MenuItem key={category.id} value={category.id}>
                                                {category.desc}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {formErrors.categoryId && <Typography color="error">{formErrors.categoryId}</Typography>}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                            <Typography color="error">{error}</Typography>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                disabled={!lesson.categoryId || !lesson.date || !lesson.description || !lesson.type || !lesson.userRavId}
                            >
                                אישור
                            </Button>
                        </Box>
                    </Box>
                </Paper>
                <AlertMessage
                    message={alertMessage}
                    severity={alertSeverity}
                    onClose={() => setAlertMessage('')}
                />
            </Container>

        </div>
    );
};

export default UploadLesson;



