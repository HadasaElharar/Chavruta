import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField, Typography, Container, FormControl, InputLabel, Select, MenuItem, Checkbox, Box } from '@mui/material';
import { UpdateUser } from '../utils/userUtil';
import { GetAllCity } from '../utils/lookUpUtil';
import { setLoggedUser } from '../redux/userSlice';
import AlertMessage from './AlertMessage';

const Setting = () => {
    const loggedUser = useSelector(state => state.user.loggedUser);
    const [editUser, setEditUser] = useState(null);
    const [cities, setCities] = useState([]);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');
    const showAlert = (message, severity = 'info') => {
        setAlertMessage(message);
        setAlertSeverity(severity);
    };

    useEffect(() => {
        GetAllCity().then((res) => {
            setCities(res);
        }).catch((err) => {
            console.log(err);
            console.log("failed to get all cities");
        })
    }, []);

    useEffect(() => {
        setEditUser(loggedUser);
    }, [loggedUser]);

    const handleChangeUser = (e) => {
        const { name, value, type, checked } = e.target;
        setEditUser(prevUser => ({
            ...prevUser,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    const handleClickSave = async (e) => {
        e.preventDefault(); // למנוע טעויות הרצת טפסים
        try {
            const res = await UpdateUser(editUser.userId, editUser);
            console.log(UpdateUser)
            if (res.status === 200) {
                dispatch(setLoggedUser(res.data));
                showAlert("הפרטים עודכנו", 'success');
                setTimeout(() => {
                    navigate('/'); // Replace with your actual path
                  }, 3000); // Adjust the delay as needed
            
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.includes("User with this email already exists")) {
                setError("כתובת המייל מקושרת למשתמש קיים");
                showAlert("כתובת המייל מקושרת למשתמש קיים", 'error');
            } else {
                setError("שמירת השינויים נכשלה. נסה שוב.");
                showAlert("שמירת השינויים נכשלה. נסה שוב.", 'error');
            }
        }
    }


    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                הגדרות
            </Typography>
            <form onSubmit={handleClickSave}>
                <TextField
                    fullWidth
                    label="דואר אלקטרוני"
                    name="email"
                    value={editUser?.email || ''}
                    onChange={handleChangeUser}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="סיסמה"
                    name="password"
                    value={editUser?.password || ''}
                    onChange={handleChangeUser}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="שם"
                    name="name"
                    value={editUser?.name || ''}
                    onChange={handleChangeUser}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="טלפון"
                    name="phone"
                    value={editUser?.phone || ''}
                    onChange={handleChangeUser}
                    type="tel"
                    inputProps={{ maxLength: 10 }}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="שנת לידה"
                    name="birthdayYear"
                    value={editUser?.birthdayYear || ''}
                    onChange={handleChangeUser}
                    type="number"
                    inputProps={{ maxLength: 4 }}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="הערה"
                    name="comment"
                    value={editUser?.comment || ''}
                    onChange={handleChangeUser}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="נושא"
                    name="subject"
                    value={editUser?.subject || ''}
                    onChange={handleChangeUser}
                    sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body1">חברותא:</Typography>
                    <Checkbox
                        name="chavruta"
                        checked={editUser?.chavruta || false}
                        onChange={handleChangeUser}
                    />
                </Box>
                <FormControl fullWidth sx={{ mb: 2 }} variant="outlined">
                    <InputLabel id="city-label">עיר</InputLabel>
                    <Select
                        labelId="city-label"
                        value={editUser?.cityId || ''}
                        name="cityId"
                        onChange={handleChangeUser}
                        label="עיר"
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            <>בחר עיר</>
                        </MenuItem>
                        {cities.map((city) => (
                            <MenuItem key={city.id} value={city.id}>
                                {city.desc}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Typography variant="body1" color="error">
                    {error}
                </Typography>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    שמירה
                </Button>
            </form>
            <AlertMessage
                message={alertMessage}
                severity={alertSeverity}
                onClose={() => setAlertMessage('')}
            />
        </Container>
    );
};

export default Setting;
