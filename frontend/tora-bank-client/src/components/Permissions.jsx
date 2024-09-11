import React, { useEffect, useState } from 'react';
import { GetAllUsers, UpdateUser } from '../utils/userUtil';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Select, MenuItem, TextField, Checkbox } from '@mui/material';
import { GetAllCity, GetAllLevel } from "../utils/lookUpUtil";
import AlertMessage from './AlertMessage';

const Permissions = () => {
    const [users, setUsers] = useState([]);
    const [cities, setCities] = useState([]);
    const [levels, setLevels] = useState([]);
    const [alert, setAlert] = useState("");
    const [filter, setFilter] = useState({ id: '', name: '', email: '', phone: '', subject: '', city: '', level: '', chavruta: '', status: '' });

    const getCityName = (cityId) => {
        const city = cities.find(c => c.id === cityId);
        return city ? city.desc : "Unknown";
    };

    const getLevelName = (levelId) => {
        const level = levels.find(l => l.id === levelId);
        return level ? level.desc : "Unknown";
    };
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
        });

        GetAllLevel().then((res) => {
            setLevels(res);
        }).catch((err) => {
            console.log(err);
            console.log("failed to get all levels");
        });

        fetchUsers();  // Fetch users on component mount
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await GetAllUsers();
            setUsers(res);
        } catch (err) {
            console.log(err);
            console.log("failed to get all users");
        }
    };

    const handleFilterChange = (event, column) => {
        setFilter({
            ...filter,
            [column]: event.target.value
        });
    };

    const handleLevelChange = async (user, newLevelId) => {
        // הצגת הודעת אישור למשתמש לפני ביצוע השינוי
        const confirmChange = window.confirm("האם אתה בטוח שברצונך לשנות את ההרשאה?");

        if (confirmChange) {
            const updatedUser = { ...user, levelId: newLevelId };
            try {
                if (!user.userId) {
                    throw new Error('User ID is undefined');
                }

                if (user.levelId === 3) {
                    showAlert("לא ניתן לשנות הרשאה לרב", 'error');
                    return;
                }

                const res = await UpdateUser(updatedUser.userId, updatedUser);
                if (res) {
                    showAlert("ההרשאה שונתה בהצלחה", 'success');
                    fetchUsers();  // Fetch updated users list after successful update
                }
            } catch (error) {
                console.log(error);
                showAlert("אופס ארעה תקלה...", 'error');
            }
        } else {
            showAlert("שינוי ההרשאה בוטל", 'error');
        }
    };





    const handleStatusChange = async (user, newStatus) => {
        // הצגת הודעת אישור למשתמש לפני ביצוע השינוי
        const confirmChange = window.confirm("האם אתה בטוח שברצונך לשנות את הסטטוס?");

        if (confirmChange) {
            const updateStatusdUser = { ...user, status: newStatus };
            try {
                if (!user.userId) {
                    throw new Error('User ID is undefined');
                }
                console.log(updateStatusdUser);

                const res = await UpdateUser(updateStatusdUser.userId, updateStatusdUser);

                if (res) {
                    console.log(res);
                    showAlert("סטטוס שונה בהצלחה", 'success');
                    fetchUsers();  // Fetch updated users list after successful update
                }
            } catch (error) {
                console.log(error);
                showAlert("אופס ארעה תקלה...", 'error');
            }
        } else {
            showAlert("שינוי הסטטוס בוטל", 'error');
        }
    };


    const filteredUsers = users.filter(user => {
        return (
            (user.userId || '').toString().includes((filter.id || '').toLowerCase()) &&
            (user.name || '').toLowerCase().includes((filter.name || '').toLowerCase()) &&
            (user.email || '').toLowerCase().includes((filter.email || '').toLowerCase()) &&
            (user.phone || '').toLowerCase().includes((filter.phone || '').toLowerCase()) &&
            (user.subject || '').toLowerCase().includes((filter.subject || '').toLowerCase()) &&
            (getCityName(user.cityId) || '').toLowerCase().includes((filter.city || '').toLowerCase()) &&
            (getLevelName(user.levelId) || '').toLowerCase().includes((filter.level || '').toLowerCase()) &&
            (user.chavruta ? 'כן' : 'לא').toLowerCase().includes((filter.chavruta || '').toLowerCase()) &&
            (user.status ? 'כן' : 'לא').toLowerCase().includes((filter.status || '').toLowerCase())
        );
    });

    return (
        <>
            <Typography variant="h4" align="center" gutterBottom>
                משתמשי האתר
            </Typography>
            <TableContainer component={Paper} style={{ width: '80%', margin: 'auto', border: '1px solid #e0e0e0', maxHeight: '60vh', overflowY: 'auto' }}>
                <Table stickyHeader>
                    <TableHead style={{ backgroundColor: '#f0f0f0' }}>
                        <TableRow>
                            {['ID', 'שם', 'מייל', 'טלפון', 'נושא', 'עיר', 'הרשאה', 'חברותא', 'פעיל'].map((header, index) => (
                                <TableCell key={index} style={{ textAlign: 'right', border: '1px solid #e0e0e0', width: '11%' }}>
                                    <Typography variant="body1" sx={{ textAlign: 'right', flexGrow: 1, color: 'black' }}>
                                        {header}
                                    </Typography>
                                    {header === 'ID' ? (
                                        <TextField
                                            size="small"
                                            value={filter.id || ''}
                                            onChange={(event) => handleFilterChange(event, 'id')}
                                            variant="outlined"
                                            placeholder="חפש..."
                                            style={{ marginTop: 8, width: '100%' }}
                                        />
                                    ) : header === 'הרשאה' ? (
                                        <Select
                                            value={filter.level}
                                            onChange={(e) => handleFilterChange(e, 'level')}
                                            displayEmpty
                                            size="small"
                                            style={{ marginTop: 8, width: '100%' }}
                                        >
                                            <MenuItem value="">הצג הכל</MenuItem>
                                            {levels.map(level => (
                                                <MenuItem key={level.id} value={level.desc}>
                                                    {level.desc}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    ) : header === 'חברותא' ? (
                                        <Select
                                            value={filter.chavruta}
                                            onChange={(e) => handleFilterChange(e, 'chavruta')}
                                            displayEmpty
                                            size="small"
                                            style={{ marginTop: 8, width: '100%' }}
                                        >
                                            <MenuItem value="">הצג הכל</MenuItem>
                                            <MenuItem value="כן">כן</MenuItem>
                                            <MenuItem value="לא">לא</MenuItem>
                                        </Select>
                                    ) : header === 'פעיל' ? (
                                        <Select
                                            value={filter.status}
                                            onChange={(e) => handleFilterChange(e, 'status')}
                                            displayEmpty
                                            size="small"
                                            style={{ marginTop: 8, width: '100%' }}
                                        >
                                            <MenuItem value="">הצג הכל</MenuItem>
                                            <MenuItem value="כן">כן</MenuItem>
                                            <MenuItem value="לא">לא</MenuItem>
                                        </Select>
                                    ) : (
                                        <TextField
                                            size="small"
                                            value={filter[header === 'שם' ? 'name' : header === 'מייל' ? 'email' : header === 'טלפון' ? 'phone' : header === 'נושא' ? 'subject' : header === 'עיר' ? 'city' : '']}
                                            onChange={(event) => handleFilterChange(event, header === 'שם' ? 'name' : header === 'מייל' ? 'email' : header === 'טלפון' ? 'phone' : header === 'נושא' ? 'subject' : header === 'עיר' ? 'city' : '')}
                                            variant="outlined"
                                            placeholder={"חפש..."}
                                            style={{ marginTop: 8, width: '100%' }}
                                        />
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredUsers.map((user) => (
                            <TableRow key={user.userId}>
                                <TableCell style={{ textAlign: 'right', border: '1px solid #e0e0e0' }}>{user.userId}</TableCell>
                                <TableCell style={{ textAlign: 'right', border: '1px solid #e0e0e0' }}>{user.name}</TableCell>
                                <TableCell style={{ textAlign: 'right', border: '1px solid #e0e0e0' }}>{user.email}</TableCell>
                                <TableCell style={{ textAlign: 'right', border: '1px solid #e0e0e0' }}>{user.phone}</TableCell>
                                <TableCell style={{ textAlign: 'right', border: '1px solid #e0e0e0' }}>{user.subject}</TableCell>
                                <TableCell style={{ textAlign: 'right', border: '1px solid #e0e0e0' }}>{getCityName(user.cityId)}</TableCell>
                                <TableCell style={{ textAlign: 'right', border: '1px solid #e0e0e0' }}>
                                    <Select
                                        value={getLevelName(user.levelId)}
                                        onChange={(e) => handleLevelChange(user, levels.find(level => level.desc === e.target.value)?.id || '')}
                                        displayEmpty
                                        size="small"
                                    >
                                        {levels.map(level => (
                                            <MenuItem key={level.id} value={level.desc}>
                                                {level.desc}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                                <TableCell style={{ textAlign: 'right', border: '1px solid #e0e0e0' }}>
                                    <Checkbox
                                        checked={user.chavruta}
                                        disabled
                                    />
                                </TableCell>
                                <TableCell style={{ textAlign: 'right', border: '1px solid #e0e0e0' }}>
                                    <Checkbox
                                        checked={user.status}
                                        onChange={() => handleStatusChange(user, !user.status)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {alert && <Typography variant="body2" color="error" align="center">{alert}</Typography>}
            <AlertMessage
                message={alertMessage}
                severity={alertSeverity}
                onClose={() => setAlertMessage('')}
            />
        </>
    );
};

export default Permissions;
