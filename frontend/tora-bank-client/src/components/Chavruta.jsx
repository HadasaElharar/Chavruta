import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddChavrutum, GetChavrutumByUserId, GetChavrutumByUserId2 } from "../utils/chavrutaUtil";
import { GetUsersByChavruta } from "../utils/userUtil";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box, TextField, Select, MenuItem } from '@mui/material';
import { GetAllCity } from "../utils/lookUpUtil";
import { useNavigate } from "react-router-dom";
import AlertMessage from './AlertMessage';


const styles = {
    primaryButton: {
        width: '100%',
        backgroundColor: 'gold', // Set the color to gold
        '&:hover': {
            backgroundColor: '#ffd700', // Slightly darker gold on hover
        },
    },
};



const Chavruta = () => {

    const loggedUser = useSelector(state => state.user.loggedUser);
    const [usersChavruta, setUsersChavruta] = useState([]);
    const [usersChavrutaToApprove, setUsersChavrutaToApprove] = useState([]);
    const [cities, setCities] = useState([]);
    const [filter, setFilter] = useState({ name: '', age: '', subject: '', comment: '', city: '', status: '' });
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');

    const showAlert = (message, severity = 'info') => {
        setAlertMessage(message);
        setAlertSeverity(severity);
    };

    useEffect(() => {
        if (loggedUser) {
            GetChavrutumByUserId(loggedUser?.userId).then(res => {
                console.log(res);
            });
            GetChavrutumByUserId2(loggedUser?.userId).then(res => {
                setUsersChavrutaToApprove(res);
                console.log(res);
            });
            if (loggedUser) {
                GetUsersByChavruta(loggedUser.userId).then(data => {
                    setUsersChavruta(data);
                });
            }
        }
        console.log("sign up");
        GetAllCity().then((res) => {
            setCities(res);
        }).catch((err) => {
            console.log(err);
            console.log("faild get all cities");
        });
    }, [loggedUser]);

    const getAge = (year) => {
        let today = new Date();
        return today.getFullYear() - year;
    }

    const handleAddChvruta = async (userId) => {
        let chavruta = {
            userId1: loggedUser?.userId,
            userId2: userId,
            approved: false
        }
        await AddChavrutum(chavruta).then((res) => {
            if (res) {
                showAlert("הבקשה נשלחה לחברותא ממתין לאישור החברותא", 'success');
                setUsersChavruta(prevState =>
                    prevState.map(user =>
                        user.userId === userId ? { ...user, hasUnapprovedChavrutum: true } : user
                    )
                );
            }
        }).catch(() =>showAlert("אופס ארעה תקלה...", 'error'));
    }

    const getCityName = (cityId) => {
        const city = cities.find(c => c.id === cityId);
        return city ? city.desc : "Unknown";
    }

    const handleFilterChange = (event, column) => {
        setFilter({
            ...filter,
            [column]: event.target.value
        });
    }

    const filteredUsers = usersChavruta.filter(user => {
        const statusFilter = filter.status === '' ||
            (filter.status === 'pending' && user.hasUnapprovedChavrutum) ||
            (filter.status === 'approved' && !user.hasUnapprovedChavrutum);

        return (
            user.name.toLowerCase().includes(filter.name.toLowerCase()) &&
            getAge(user.birthdayYear).toString().includes(filter.age) &&
            user.subject.toLowerCase().includes(filter.subject.toLowerCase()) &&
            user.comment.toLowerCase().includes(filter.comment.toLowerCase()) &&
            getCityName(user.cityId).toLowerCase().includes(filter.city.toLowerCase()) &&
            statusFilter
        );
    });

    return (
        <>
            <Box display="flex" justifyContent="center" mt={4}>
                <Typography variant="h4" gutterBottom>אופציות לחברותא</Typography>
            </Box>
            <Box display="flex" justifyContent="center" mt={4}>
                <Box width="80%">
                    <TableContainer component={Paper} sx={{ maxHeight: '370px', overflowY: 'auto' }}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {['name', 'age', 'subject', 'comment', 'city'].map((column) => (
                                        <TableCell
                                            key={column}
                                            sx={{
                                                border: '1px solid #ddd',
                                                textAlign: 'right',
                                                backgroundColor: '#f0f0f0',
                                                width: '16%' // רוחב אחיד לכל העמודות
                                            }}
                                        >
                                            <Typography variant="body3" sx={{ textAlign: 'right', flexGrow: 1, color: 'black' }}>
                                                {column === 'name' ? 'שם' :
                                                    column === 'age' ? 'גיל' :
                                                        column === 'subject' ? 'נושא' :
                                                            column === 'comment' ? 'הערות' :
                                                                column === 'city' ? 'עיר' : ''}
                                            </Typography>
                                            <TextField
                                                size="small"
                                                value={filter[column]}
                                                onChange={(event) => handleFilterChange(event, column)}
                                                variant="outlined"
                                                placeholder={`חפש לפי ${column === 'name' ? 'שם' :
                                                    column === 'age' ? 'גיל' :
                                                        column === 'subject' ? 'נושא' :
                                                            column === 'comment' ? 'הערות' :
                                                                column === 'city' ? 'עיר' : ''}`}
                                                sx={{ mt: 1, width: '100%' }}
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell
                                        sx={{
                                            border: '1px solid #ddd',
                                            textAlign: 'right',
                                            backgroundColor: '#f0f0f0',
                                            width: '16%' // רוחב אחיד לכל העמודות
                                        }}
                                    >
                                        <Typography variant="body3" sx={{ textAlign: 'right', flexGrow: 1, color: 'black' }}>
                                            סטטוס
                                        </Typography>
                                        <Select
                                            value={filter.status}
                                            onChange={(event) => handleFilterChange(event, 'status')}
                                            displayEmpty
                                            size="small"
                                            sx={{ mt: 1, width: '100%' }}
                                        >
                                            <MenuItem value="">הצג הכל</MenuItem>
                                            <MenuItem value="pending">ממתין לאישור</MenuItem>
                                            <MenuItem value="approved">הזמנה לחברותא</MenuItem>
                                        </Select>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    user.userId !== loggedUser?.userId && (
                                        <TableRow key={user.userId}>
                                            <TableCell sx={{ border: '1px solid #ddd', textAlign: 'right', width: '16%' }} title={user.name}>{user.name}</TableCell>
                                            <TableCell sx={{ border: '1px solid #ddd', textAlign: 'right', width: '16%' }} title={getAge(user.birthdayYear)}>{getAge(user.birthdayYear)}</TableCell>
                                            <TableCell sx={{ border: '1px solid #ddd', textAlign: 'right', width: '16%' }} title={user.subject}>{user.subject}</TableCell>
                                            <TableCell sx={{ border: '1px solid #ddd', textAlign: 'right', width: '16%' }} title={user.comment}>{user.comment}</TableCell>
                                            <TableCell sx={{ border: '1px solid #ddd', textAlign: 'right', width: '16%' }} title={getCityName(user.cityId)}>{getCityName(user.cityId)}</TableCell>
                                            <TableCell sx={{ border: '1px solid #ddd', textAlign: 'right', width: '16%' }}>
                                                <Button
                                                    variant="contained"
                                                    disabled={user.hasUnapprovedChavrutum}
                                                    onClick={() => handleAddChvruta(user.userId)}
                                                    sx={styles.primaryButton}
                                                >
                                                    {user.hasUnapprovedChavrutum ? "ממתין לאישור" : "הזמנה לחברותא"}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <AlertMessage
                    message={alertMessage}
                    severity={alertSeverity}
                    onClose={() => setAlertMessage('')}
                />
            </Box>
        </>
    );
}

export default Chavruta;
