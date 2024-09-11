import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { TextField, Typography, Container, Paper, Box } from '@mui/material';
import { Login } from '../utils/userUtil';
import { useDispatch } from 'react-redux';
import { setLoggedUser } from '../redux/userSlice';
import AlertMessage from './AlertMessage';

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPasword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const showAlert = (message, severity = 'info') => {
        setAlertMessage(message);
        setAlertSeverity(severity);
    };

    useEffect(() => {
        console.log("sign In");
    },[]);

    const handleClickLogin = () => {
        console.log(email);
        let user = {
            email,
            password
        };
    
        Login(user).then(res => {
            if (res) {
                showAlert('התחברת בהצלחה', 'success');
                setIsLoggedIn(true);
                dispatch(setLoggedUser(res));
                setTimeout(() => {
                    navigate('/privateArea'); // Replace with your actual path
                  }, 3000); // Adjust the delay as needed
            
            } else {
                setError("המייל או הסיסמה שגויים");
            }
        }).catch(error => {
            // כאן אנו מטפלים בשגיאות שמתקבלות מהשרת
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("אירעה שגיאה לא צפויה");
                showAlert("אירעה שגיאה לא צפויה", 'error');
            }
        });
    
        
    }

    

    return (
        <div>
          {isLoggedIn ? (
            <AlertMessage
                message={alertMessage}
                severity={alertSeverity}
                onClose={() => setAlertMessage('')}
            />
        ) : ( 
     <Container component="main" maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography component="h1" variant="h5" align="center">
                    כאן התחברות
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <TextField
                        fullWidth
                        id="email"
                        type="email"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        id="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPasword(e.target.value)}
                    />
                    {error && <Typography color="error">{error}</Typography>}
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleClickLogin}
                    >
                        התחברות
                    </Button>
                    <Typography align="center" sx={{ mt: 2 }}>
                        אין לך חשבון? <Link to="/signUp">להירשם כאן</Link>
                    </Typography>
                </Box>
            </Paper>
            
        </Container>
        )}

        </div>
    );
}

export default SignIn;
