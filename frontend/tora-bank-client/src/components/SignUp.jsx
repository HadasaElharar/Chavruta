import React, { useEffect, useState } from 'react';
import { Button, TextField, Box, Grid, Paper, Typography, Container, FormControl, InputLabel, MenuItem, Select, Checkbox, FormControlLabel } from '@mui/material';
import { AddUser } from '../utils/userUtil';
import { GetAllCity } from '../utils/lookUpUtil';
import { useNavigate } from 'react-router-dom';
import AlertMessage from './AlertMessage';

const SignUp = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        cityId: -1,
        birthdayYear: "",
        comment: "",
        subject: "",
        chavruta: false,
        levelId: 1
    });

    const [cities, setCities] = useState([]);
    const [error, setError] = useState("");
    const [touched, setTouched] = useState({
        email: false,
        password: false,
        name: false,
        phone: false,
        birthdayYear: false,
        subject: false,
        cityId: false
    });
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');
    const showAlert = (message, severity = 'info') => {
        setAlertMessage(message);
        setAlertSeverity(severity);
    };

    const navigate = useNavigate();

    useEffect(() => {
        GetAllCity().then((res) => {
            setCities(res);
        }).catch((err) => {
            console.log(err);
            console.log("failed to get all cities");
        });
    }, []);

    const handleChangeUser = (e) => {
        let { name, value } = e.target;
        let _user = { ...user };
        if (name === "chavruta") {
            _user[name] = e.target.checked;
            if (!e.target.checked) {
                _user.cityId = -1;
                _user.birthdayYear = "";
                _user.comment = "";
                _user.subject = "";
            }
        } else {
            _user[name] = value;
        }
        setUser(_user);
    };

    const handleBlur = (e) => {
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
        if (e.target.name === "birthdayYear" && e.target.value.length !== 4) {
            setError("Birthday year must be exactly 4 digits.");
        } else {
            setError("");
        }
    };

    const handleClickSignUp = () => {
        if (!user.email || !user.name || !user.phone || !user.password || (user.chavruta && (!user.birthdayYear  || user.cityId === -1))) {
            setError("All required fields must be filled out.");
            return;
        }
        AddUser(user).then((res) => {
            showAlert("נרשמת בהצלחה", 'success');
            setTimeout(() => {
                navigate('/signIn'); // Replace with your actual path
              }, 3000); // Adjust the delay as needed

        }).catch((err) => {
            if (err.response && err.response.data && err.response.data.includes("User with this email already exists")) {
                setError("כתובת המייל מקושרת למשתמש קיים");
                showAlert("כתובת המייל מקושרת למשתמש קיים", 'error');
            } else {
                console.error(err);
                setError("Registration failed. Please try again.");
                showAlert("Registration failed. Please try again.", 'error');
            }
        });
    };

    return (
        <Container component="main" maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography component="h1" variant="h5" align="center">
                    הרשמה
                </Typography>
                <Box component="form" sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="email"
                                type="email"
                                name="email"
                                label="דואר אלקטרוני"
                                variant="outlined"
                                value={user.email}
                                onChange={handleChangeUser}
                                onBlur={handleBlur}
                                error={touched.email && !user.email}
                                helperText={touched.email && !user.email ? "שדה חובה" : ""}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'gold', // צבע המסגרת בעת טעינה
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'gold', // צבע המסגרת במצב hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'gold', // צבע המסגרת במצב focus
                                        },
                                    },
                                    '&.Mui-error .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'red', // צבע המסגרת במצב שגיאה
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="password"
                                type="password"
                                name="password"
                                label="סיסמא"
                                variant="outlined"
                                value={user.password}
                                onChange={handleChangeUser}
                                onBlur={handleBlur}
                                error={touched.password && !user.password}
                                helperText={touched.password && !user.password ? "שדה חובה" : ""}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'gold', // צבע המסגרת בעת טעינה
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'gold', // צבע המסגרת במצב hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'gold', // צבע המסגרת במצב focus
                                        },
                                    },
                                    '&.Mui-error .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'red', // צבע המסגרת במצב שגיאה
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="name"
                                name="name"
                                label="שם מלא"
                                variant="outlined"
                                value={user.name}
                                onChange={handleChangeUser}
                                onBlur={handleBlur}
                                error={touched.name && !user.name}
                                helperText={touched.name && !user.name ? "שדה חובה" : ""}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'gold', // צבע המסגרת בעת טעינה
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'gold', // צבע המסגרת במצב hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'gold', // צבע המסגרת במצב focus
                                        },
                                    },
                                    '&.Mui-error .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'red', // צבע המסגרת במצב שגיאה
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="phone"
                                name="phone"
                                label="טלפון"
                                type="tel"
                                inputMode="numeric"
                                variant="outlined"
                                value={user.phone}
                                onChange={(e) => {
                                    const input = e.target.value;
                                    const numbers = /^[0-9]+$/;
                                    if (input === '' || input.match(numbers)) {
                                        handleChangeUser(e);
                                    }
                                }}
                                inputProps={{ maxLength: 10 }}
                                onBlur={handleBlur}
                                error={touched.phone && !user.phone}
                                helperText={touched.phone && !user.phone ? "שדה חובה" : ""}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'gold', // צבע המסגרת בעת טעינה
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'gold', // צבע המסגרת במצב hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'gold', // צבע המסגרת במצב focus
                                        },
                                    },
                                    '&.Mui-error .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'red', // צבע המסגרת במצב שגיאה
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                required
                                id="birthdayYear"
                                name="birthdayYear"
                                label="שנת לידה"
                                variant="outlined"
                                value={user.birthdayYear}
                                onChange={handleChangeUser}
                                onBlur={handleBlur}
                                inputProps={{ inputMode: 'numeric', maxLength: 4 }}
                                error={touched.birthdayYear && user.birthdayYear.length !== 4}
                                helperText={touched.birthdayYear && user.birthdayYear.length !== 4 ? "שנת לידה חייבת להיות בדיוק 4 ספרות" : ""}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'gold', // צבע המסגרת בעת טעינה
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'gold', // צבע המסגרת במצב hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'gold', // צבע המסגרת במצב focus
                                        },
                                    },
                                    '&.Mui-error .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'red', // צבע המסגרת במצב שגיאה
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="chavruta"
                                        name="chavruta"
                                        checked={user.chavruta}
                                        onChange={handleChangeUser}
                                        color="primary"
                                    />
                                }
                                label="חברותא"
                            />
                        </Grid>
                        {user.chavruta && (
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        
                                        id="subject"
                                        name="subject"
                                        label="נושא לימוד"
                                        variant="outlined"
                                        value={user.subject}
                                        onChange={handleChangeUser}
                                        onBlur={handleBlur}
                                        
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'gold', // צבע המסגרת בעת טעינה
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'gold', // צבע המסגרת במצב hover
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'gold', // צבע המסגרת במצב focus
                                                },
                                            },
                                            '&.Mui-error .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'red', // צבע המסגרת במצב שגיאה
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="comment"
                                        name="comment"
                                        label="הערות"
                                        variant="outlined"
                                        value={user.comment}
                                        onChange={handleChangeUser}
                                        multiline
                                        rows={4}
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                '& fieldset': {
                                                    borderColor: 'gold', // צבע המסגרת בעת טעינה
                                                },
                                                '&:hover fieldset': {
                                                    borderColor: 'gold', // צבע המסגרת במצב hover
                                                },
                                                '&.Mui-focused fieldset': {
                                                    borderColor: 'gold', // צבע המסגרת במצב focus
                                                },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth variant="outlined" required error={user.cityId === -1}>
                                        <InputLabel id="city-label">עיר</InputLabel>
                                        <Select
                                            labelId="city-label"
                                            id="city"
                                            value={user.cityId > 0 ? user.cityId : ''}
                                            name="cityId"
                                            onChange={handleChangeUser}
                                            label="עיר"
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: 'gold', // צבע המסגרת בעת טעינה
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: 'gold', // צבע המסגרת במצב hover
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: 'gold', // צבע המסגרת במצב focus
                                                    },
                                                },
                                            }}
                                            
                                        >
                                            <MenuItem value="" disabled></MenuItem>
                                            {cities.map((city) => (
                                                <MenuItem
                                                    key={city.id}
                                                    value={city.id}
                                                >
                                                    {city.desc}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                        {user.cityId === -1 && <Typography color="error" variant="caption">שדה חובה</Typography>}
                                    </FormControl>
                                </Grid>
                            </>
                        )}
                    </Grid>
                    <Box sx={{ mt: 2 }}>
                        <Typography color="error">{error}</Typography>
                    </Box>
                    <Box sx={{ mt: 2}}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleClickSignUp}
                            disabled={!user.email || !user.name || !user.phone || !user.password || (user.chavruta && (!user.birthdayYear || user.cityId === -1))}
                        >
                            הרשמה
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
    );
};

export default SignUp;
