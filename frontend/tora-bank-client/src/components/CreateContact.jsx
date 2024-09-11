import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AddContact } from '../utils/contactUtil';
import AlertMessage from './AlertMessage';

const CreateContact = () => {
    const [contact, setContact] = useState({
        subject: '',
        message: '',
        phone: '',
        email: ''
    });
    const [error, setError] = useState("");
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');

    const showAlert = (message, severity = 'info') => {
        setAlertMessage(message);
        setAlertSeverity(severity);
    };

    const navigate = useNavigate();

    const handleChangeContact = (event) => {
        const { name, value } = event.target;
        setContact({
            ...contact,
            [name]: value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(contact);
        AddContact(contact)
            .then((res) => {
                showAlert("הטופס נשלח בהצלחה", 'success');
                // מעבר לדף הבית
                setTimeout(() => {
                    navigate('/'); // Replace with your actual path
                }, 3000); // Adjust the delay as needed
            })
            .catch((err) => {
                console.error(err);
                setError("Registration failed. Please try again.");
                showAlert("Registration failed. Please try again.", 'error');
            });
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" gutterBottom>
                טופס יצירת קשר
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="נושא"
                        name="subject"
                        value={contact.subject}
                        onChange={handleChangeContact}
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="הודעה"
                        name="message"
                        value={contact.message}
                        onChange={handleChangeContact}
                        multiline
                        rows={4}
                        required
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="טלפון"
                        name="phone"
                        value={contact.phone}
                        type="tel"
                        required
                        onChange={(e) => {
                            const input = e.target.value;
                            const numbers = /^[0-9]+$/;
                            if (input === '' || input.match(numbers)) {
                                handleChangeContact(e);
                            }
                        }}
                        inputProps={{ maxLength: 10 }}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        fullWidth
                        label="דואר אלקטרוני"
                        name="email"
                        value={contact.email}
                        onChange={handleChangeContact}
                        type="email"
                        required
                    />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{ backgroundColor: 'grey', color: 'white', '&:hover': { backgroundColor: 'darkgrey' } }}
                    fullWidth
                >
                    שליחה
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

export default CreateContact;
