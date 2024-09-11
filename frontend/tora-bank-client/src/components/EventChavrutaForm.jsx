import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Group } from '@mui/icons-material';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, FormControlLabel, Checkbox, Box, Grid, Typography, Icon } from '@mui/material';
import { AddEventsChavrutum, UpdateEventsChavrutum, DeleteEventsChavrutum } from '../utils/eventsChavrutaUtil';
import { GetAllDay } from '../utils/lookUpUtil';
import { GetChavrutumById } from '../utils/chavrutaUtil';
import ColorPicker from './ColorPicker'; // נניח ששמרת את הרכיב הזה בקובץ ColorPicker.js
import AlertMessage from './AlertMessage';



const EventChavrutaForm = ({ selectedChavruta, onSubmit, onClose }) => {
    const [formData, setFormData] = useState({
        eventChavrutaId: '',
        subject: '',
        startDate: '',
        endDate: '',
        startTime: '',
        endTime: '',
        userDays: [],
        color: ''
    });
    const [days, setDays] = useState([]);
    const [participants, setParticipants] = useState('');
    const [errors, setErrors] = useState({});
    const loggedUser = useSelector(state => state.user.loggedUser);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');
    const showAlert = (message, severity = 'info') => {
        setAlertMessage(message);
        setAlertSeverity(severity);
    };
    useEffect(() => {
        const fetchDays = async () => {
            try {
                const dayRes = await GetAllDay();
                setDays(dayRes);
            } catch (error) {
                console.error("Error fetching days:", error);
            }
        };

        fetchDays();
    }, []);

    useEffect(() => {
        if (selectedChavruta) {
            setFormData({
                eventChavrutaId: selectedChavruta.eventChavrutaId || 0,
                subject: selectedChavruta.subject || '',
                startDate: selectedChavruta.startDate || '',
                endDate: selectedChavruta.endDate || '',
                startTime: selectedChavruta.startTime || '',
                endTime: selectedChavruta.endTime || '',
                chavrutaId: selectedChavruta.chavrutaId || '',
                color: selectedChavruta.color || 'pink',
                userDays: selectedChavruta.userDays || []
            });

            const fetchParticipants = async () => {
                try {
                    const chavrutum = await GetChavrutumById(selectedChavruta.chavrutaId);
                    console.log(chavrutum)
                    const participantsText =
                        chavrutum.userId1Navigation.userId === loggedUser.userId
                            ? `אתה, ${chavrutum.userId2Navigation.name}`
                            : `${chavrutum.userId1Navigation.name}, אתה`;
                    setParticipants(participantsText);
                }
                catch (error) {
                    console.error("Error fetching participants:", error);
                }
            };

            fetchParticipants();
        }
    }, [selectedChavruta]);



    const handleColorChange = (color) => {
        setFormData(prevState => ({
            ...prevState,
            color: color
        }));
    };
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };


    const handleDayChange = (dayId) => {
        setFormData(prevFormData => {
            const currentDays = prevFormData.userDays || [];
            console.log(currentDays)
            const dayExists = currentDays.some(day => day.dayId === dayId);

            const updatedDays = dayExists
                ? currentDays.filter(day => day.dayId !== dayId)
                : [
                    ...currentDays,
                    {
                        userDaysId: 0, // או ערך מתאים אם יש צורך
                        dayId: dayId,
                        eventChavrutaId: prevFormData.eventChavrutaId || 0 // או ערך מתאים אם יש צורך
                    }
                ];

            console.log('Updated formData:', {
                ...prevFormData,
                userDays: updatedDays
            });

            return {
                ...prevFormData,
                userDays: updatedDays
            };
        });
    };


    const validateForm = () => {
        const newErrors = {};
        if (!formData.subject) newErrors.subject = "נושא הוא שדה חובה";
        if (!formData.startDate) newErrors.startDate = "תאריך התחלה הוא שדה חובה";
        if (!formData.endDate) newErrors.endDate = "תאריך סיום הוא שדה חובה";
        if (!formData.startTime) newErrors.startTime = "שעת התחלה היא שדה חובה";
        if (!formData.endTime) newErrors.endTime = "שעת סיום היא שדה חובה";
        if (!(formData.userDays && formData.userDays.length > 0)) newErrors.userDays = "יש לסמן לפחות יום אחד בשבוע";
        if (new Date(formData.startDate) > new Date(formData.endDate)) newErrors.date = "תאריך התחלה חייב להיות קטן מתאריך סיום";
        if (formData.startTime >= formData.endTime) newErrors.time = "שעת התחלה חייבת להיות קטנה משעת סיום";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;
        const confirmed = window.confirm('האם אתה בטוח שאתה רוצה לשמור את האירוע?');
        if (!confirmed) return;

        const cleanedFormData = {
            ...formData,
            color: formData.color.trim()
        };

        try {
            let response;
            if (formData.eventChavrutaId) {
                // עריכה
                response = await UpdateEventsChavrutum(formData.eventChavrutaId, cleanedFormData);
            }
            else {
                // הוספה
                response = await AddEventsChavrutum(cleanedFormData);
            }
            console.log('Response:', response);

            if (response) {
                onSubmit(cleanedFormData, true);
                showAlert('האירוע נשמר בהצלחה', 'success');
            } else {
                showAlert('אופס, משהו השתבש', 'error');
                onSubmit(cleanedFormData, false);
            }
        } catch (error) {
            console.error('Error saving event:', error);
            onSubmit(cleanedFormData, false);
            showAlert('אופס, אירעה תקלה קטנה', 'error');
        }
    }

    const handleDelete = async () => {
        const confirmed = window.confirm('האם אתה בטוח שאתה רוצה למחוק את האירוע?');
        if (!confirmed) return;
        try {
            if (formData.eventChavrutaId) {
                await DeleteEventsChavrutum(formData.eventChavrutaId);
                showAlert('האירוע נמחק בהצלחה', 'success');
                onSubmit(); // עדכן את התצוגה
                onClose(); // סגור את הטופס
            } else {
                showAlert('לא ניתן למחוק אירוע שאינו קיים', 'error');
            }
        } catch (error) {
            console.error('Error deleting event:', error);
            showAlert('אופס, אירעה תקלה קטנה', 'error');
        }
    };


    return (
        <div><AlertMessage
        message={alertMessage}
        severity={alertSeverity}
        onClose={() => setAlertMessage('')}
    />
        <Dialog open onClose={onClose}>
            <DialogTitle>{formData.eventChavrutaId ? "ערוך אירוע" : "שיבוץ ביומן"}</DialogTitle>
            <DialogContent>
                <Box display="flex" alignItems="center" mb={2}>
                    <Group style={{ color: 'black', marginRight: '8px', marginLeft: '8px' }} />
                    <Typography variant="body1" fontWeight="bold">
                        משתתפים : {participants || ''}
                    </Typography>
                </Box>
                <TextField
                    label="נושא"
                    name="subject"
                    value={formData.subject || ''}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    error={!!errors.subject}
                    helperText={errors.subject}
                    size="small"
                />
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="תאריך התחלה"
                            type="date"
                            name="startDate"
                            value={formData.startDate || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.startDate}
                            helperText={errors.startDate}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="תאריך סיום"
                            type="date"
                            name="endDate"
                            value={formData.endDate || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.endDate}
                            helperText={errors.endDate}
                            size="small"
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            label="שעת התחלה"
                            type="time"
                            name="startTime"
                            value={formData.startTime || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.startTime}
                            helperText={errors.startTime}
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            label="שעת סיום"
                            type="time"
                            name="endTime"
                            value={formData.endTime || ''}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            error={!!errors.endTime}
                            helperText={errors.endTime}
                            size="small"
                        />
                    </Grid>
                </Grid>
                <Box sx={{ marginTop: 2, marginRight: -12 }}>
                    <Grid container spacing={2}>
                        {/* שורה עבור שמות הימים */}
                        <Grid item xs={12}>
                            <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: 1 }}>
                                {days.map(day => (
                                    <Grid item xs={1} key={`label-${day.id}`} sx={{ textAlign: 'center' }}>
                                        <Typography variant="body1" fontWeight="bold">{day.desc}</Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        {/* שורה עבור תיבות הסימון */}
                        <Grid item xs={12}>
                            <Grid container spacing={2} justifyContent="center" sx={{ marginTop: -6 }}>
                                {days.map(day => (
                                    <Grid item xs={1} key={`checkbox-${day.id}`}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={formData.userDays && formData.userDays.some(d => d.dayId === day.id)}
                                                    onChange={() => handleDayChange(day.id)}
                                                    name="userDays"
                                                />
                                            }
                                            sx={{ marginRight: -1 }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                {errors.userDays && <Box color="error.main" sx={{ marginTop: 1 }}>{errors.userDays}</Box>}
                {errors.date && <Box color="error.main" sx={{ marginTop: 1 }}>{errors.date}</Box>}
                {errors.time && <Box color="error.main" sx={{ marginTop: 1 }}>{errors.time}</Box>}

                <Box sx={{ display: 'flex', alignItems: 'center', marginY: 2, marginTop: 3 }}>
                    {/* <Typography variant="body2" color="textSecondary" sx={{ marginRight: 2 }}>
                        לחץ לבחירת צבע:
                    </Typography> */}
                    <ColorPicker  sx={{ marginRight: 0 }} color ={formData.color} onChange={handleColorChange} />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color="error"
                    sx={{ color: 'white', backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
                >
                    ביטול
                </Button>
                <Button
                    onClick={(e) => handleSubmit(e, true)}
                    color="success"
                    sx={{ color: 'white', backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' }, marginRight: 1 }}
                >
                    אישור
                </Button>
                {formData.eventChavrutaId !== 0  && (
                    <Button
                        onClick={handleDelete}
                        color="success"
                        sx={{ color: 'white', backgroundColor: 'grey', '&:hover': { backgroundColor: 'black' } }}
                    >
                        מחיקה
                    </Button>
                )}
            </DialogActions>
        </Dialog>
        </div>
    );
};

export default EventChavrutaForm;
