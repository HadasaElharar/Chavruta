import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DeleteChavrutum, GetChavrutumByUserId, GetChavrutumByUserId2, UpdateChavrutum } from "../utils/chavrutaUtil";
import { GetAllEventsChavrutums, GetEventsChavrutumById, GetEventsChavrutumByUserId, UpdateEventsChavrutum, DeleteEventsChavrutum }
    from "../utils/eventsChavrutaUtil";
import { GetUsersByChavruta } from "../utils/userUtil";
import { Grid, Typography, Button, Box, Collapse } from '@mui/material';
import { GetAllCity } from "../utils/lookUpUtil";
import GroupIcon from '@mui/icons-material/Group';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import EventChavrutaForm from './EventChavrutaForm';
import AlertMessage from './AlertMessage';


const MyChavrutaStatus = () => {
    const navigate = useNavigate();
    const loggedUser = useSelector(state => state.user.loggedUser);
    const [chavrutum, setChavrutum] = useState([]);
    const [usersChavruta, setUsersChavruta] = useState([]);
    const [usersChavrutaToApprove, setUsersChavrutaToApprove] = useState([]);
    const [cities, setCities] = useState([]);
    const [expanded, setExpanded] = useState({});
    const [openForm, setOpenForm] = useState(false);
    const [selectedChavruta, setSelectedChavruta] = useState(null);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertSeverity, setAlertSeverity] = useState('info');


    useEffect(() => {
        if (loggedUser) {
            GetChavrutumByUserId(loggedUser?.userId).then(res => {
                setChavrutum(res);
            });
            GetChavrutumByUserId2(loggedUser?.userId).then(res => {
                setUsersChavrutaToApprove(res);
            });
            GetUsersByChavruta(loggedUser.userId).then(data => {
                setUsersChavruta(data);
            });
        }
        GetAllCity().then((res) => {
            setCities(res);
        }).catch((err) => {
            console.log(err);
            console.log("Failed to get all cities");
        });
    }, [loggedUser]);

    const getAge = (year) => {
        let today = new Date();
        return today.getFullYear() - year;
    }
    const showAlert = (message, severity = 'info') => {
        setAlertMessage(message);
        setAlertSeverity(severity);
    };

    const handleUpdateChavruta = async (chavruta) => {
        chavruta.approved = true;
        try {
            const res = await UpdateChavrutum(chavruta.chavrutaId, chavruta);
            if (res) {
                showAlert("החברותא אושרה בהצלחה", 'success');
                let updatedChavrutum = [...chavrutum, chavruta];
                let updatedUsersChavrutaToApprove = usersChavrutaToApprove.filter(u => u.chavrutaId !== chavruta.chavrutaId);
                setChavrutum(updatedChavrutum);
                setUsersChavrutaToApprove(updatedUsersChavrutaToApprove);
            }
        } catch (error) {
            showAlert("אופס ארעה תקלה...", 'error');

        }
    }

    const handleDeclineChavruta = async (chavruta) => {
        try {
            const res = await DeleteChavrutum(chavruta.chavrutaId);
            if (res) {
                showAlert("החברותא בוטלה בהצלחה", 'success');
                let updatedUsersChavrutaToApprove = usersChavrutaToApprove.filter(u => u.chavrutaId !== chavruta.chavrutaId);
                setUsersChavrutaToApprove(updatedUsersChavrutaToApprove);
                const chavRes = await GetChavrutumByUserId(loggedUser?.userId);
                const userRes = await GetUsersByChavruta(loggedUser?.userId);
                const chav2Res = await GetChavrutumByUserId2(loggedUser?.userId);
                setChavrutum(chavRes);
                setUsersChavruta(userRes);
                setUsersChavrutaToApprove(chav2Res);
            }
        } catch (error) {
            showAlert("אופס ארעה תקלה...", 'error');
        }
    }


    const handleScheduleEvent = (chavruta) => {
        const formData = {
            subject: "",
            startDate: "",
            endDate: "",
            startTime: "",
            endTime: "",
            chavrutaId: chavruta.chavrutaId,
            status: true,
            status2: true,
            color: "",
            userDays: []
        };

        setSelectedChavruta(formData);
        setOpenForm(true);
    };


    const handleFormSubmit = (formData, success) => {
        console.log("Form data submitted:", formData);
        if (success) {
            // הצג הודעה על הצלחה
            showAlert("האירוע נשמר בהצלחה", 'success');
        } else {
            // הצג הודעה על כישלון
            showAlert("שגיאה בשמירה", 'error');
        }
        setOpenForm(false);
    };

    const handleCloseForm = () => {
        setOpenForm(false);
    };



    const getCityName = (cityId) => {
        const city = cities.find(c => c.id === cityId);
        return city ? city.desc : "Unknown";
    }

    const navigateToMyChavrutaStatus = () => {
        navigate('/privateArea/myChavrutaStatus/chavruta');
    }

    const handleCardClick = (chavrutaId) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [chavrutaId]: !prevExpanded[chavrutaId],
        }));
    }



    return (
        <div>
            <AlertMessage
                message={alertMessage}
                severity={alertSeverity}
                onClose={() => setAlertMessage('')}
            />
            <Grid container spacing={2} sx={{ padding: '16px' }}>
                <Grid item xs={12}>
                    <Grid container spacing={2} sx={{ justifyContent: 'flex-end', marginBottom: '16px', marginRight: -2 }}>
                        <Button variant="contained" color="primary" onClick={navigateToMyChavrutaStatus} size="large"
                            sx={{ backgroundColor: 'grey', '&:hover': { backgroundColor: 'darkgrey' } }}
                        >
                            לחיפוש חברותא
                        </Button>                </Grid>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ display: 'flex', flexDirection: 'column', padding: '8px' }}>
                    <Typography variant="h5" sx={{ marginBottom: '16px', padding: '4px', backgroundColor: '#f0f0f0', color: '#000', fontWeight: 'bold', borderRadius: '10px', borderBottom: '3px solid #ccc' }}>
                        החברותות שלי
                    </Typography>
                    <Grid container spacing={2}>
                        {chavrutum.slice(0, 8).map((chavruta) => (
                            <Grid item key={chavruta.chavrutaId} xs={12} sm={6}>
                                <Box sx={{ position: 'relative', width: '100%', minHeight: 140, overflow: 'hidden', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: '#ffffff', color: '#000000', padding: '16px', textAlign: 'right', cursor: 'pointer', '&:hover': { transform: 'scale(1.02)' } }} onClick={() => handleCardClick(chavruta.chavrutaId)}>
                                    <GroupIcon sx={{ position: 'absolute', top: 8, left: 8 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {loggedUser?.userId === chavruta.userId1 ? chavruta.userId2Navigation.name : chavruta.userId1Navigation.name}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold' }}>{loggedUser?.userId === chavruta.userId1 ? chavruta.userId2Navigation.subject : chavruta.userId1Navigation.subject}</Typography>
                                    <Collapse in={expanded[chavruta.chavrutaId]}>
                                        <Box mt={2}>
                                            <Typography>{loggedUser?.userId === chavruta.userId1 ? getCityName(chavruta.userId2Navigation?.cityId) : getCityName(chavruta.userId1Navigation?.cityId)}</Typography>
                                            <Typography><PhoneIcon sx={{ fontSize: 'small', verticalAlign: 'middle', marginLeft: '4px' }} />{loggedUser?.userId === chavruta.userId1 ? chavruta.userId2Navigation.phone : chavruta.userId1Navigation.phone}</Typography>
                                            <Typography><MailOutlineIcon sx={{ fontSize: 'small', verticalAlign: 'middle', marginLeft: '4px' }} />{loggedUser?.userId === chavruta.userId1 ? chavruta.userId2Navigation.email : chavruta.userId1Navigation.email}</Typography>
                                            <Typography sx={{ fontWeight: 'bold' }}>הערות: {loggedUser?.userId === chavruta.userId1 ? chavruta.userId2Navigation.comment : chavruta.userId1Navigation.comment}</Typography>
                                            <Box display="flex" alignItems="center" mt={2}>
                                                <Button
                                                    variant="contained"
                                                    color="grey"
                                                    size="small"
                                                    onClick={() => handleScheduleEvent(chavruta)}
                                                    sx={{ marginRight: 0, padding: '6px 8px', backgroundColor: 'grey', '&:hover': { backgroundColor: 'darkgrey' } }}
                                                >
                                                    שיבוץ ביומן
                                                </Button>
                                                <Button
                                                    size="small"
                                                    sx={{
                                                        minWidth: '40px',
                                                        padding: '1px',
                                                        color: '#d32f2f',
                                                        '&:hover': { backgroundColor: '#ffebee' }
                                                    }}
                                                    onClick={() => handleDeclineChavruta(chavruta)}
                                                >
                                                    <DeleteIcon />
                                                </Button>
                                            </Box>
                                        </Box>
                                    </Collapse>
                                    <ExpandMoreIcon
                                        onClick={() => handleCardClick(chavruta.chavrutaId)}
                                        sx={{ position: 'absolute', bottom: 9, left: 7, cursor: 'pointer' }}
                                    />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={6} sx={{ padding: '8px' }}>
                    <Typography variant="h5" sx={{ marginBottom: '16px', padding: '4px', backgroundColor: '#f0f0f0', color: '#000', fontWeight: 'bold', borderRadius: '10px', borderBottom: '3px solid #ccc' }}>
                        חברותות הממתינות לאישורי                </Typography>
                    <Grid container spacing={2}>
                        {usersChavrutaToApprove.slice(0, 8).map((chavruta) => (
                            <Grid item key={chavruta.chavrutaId} xs={12} sm={6}>
                                <Box sx={{ position: 'relative', width: '100%', minHeight: 140, overflow: 'hidden', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', backgroundColor: '#ffffff', color: '#000000', padding: '16px', textAlign: 'right', cursor: 'pointer', '&:hover': { transform: 'scale(1.02)' } }} onClick={() => handleCardClick(chavruta.chavrutaId)}>
                                    <GroupIcon sx={{ position: 'absolute', top: 8, left: 8 }} />
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {loggedUser?.userId === chavruta.userId1 ? chavruta.userId2Navigation.name : chavruta.userId1Navigation.name}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold' }}>{loggedUser?.userId === chavruta.userId1 ? chavruta.userId2Navigation.subject : chavruta.userId1Navigation.subject}</Typography>
                                    <Collapse in={expanded[chavruta.chavrutaId]}>
                                        <Box mt={2}>
                                            <Typography>{loggedUser?.userId === chavruta.userId1 ? getCityName(chavruta.userId2Navigation?.cityId) : getCityName(chavruta.userId1Navigation?.cityId)}</Typography>
                                            <Typography><PhoneIcon sx={{ fontSize: 'small', verticalAlign: 'middle', marginLeft: '4px' }} />{loggedUser?.userId === chavruta.userId1 ? chavruta.userId2Navigation.phone : chavruta.userId1Navigation.phone}</Typography>
                                            <Typography><MailOutlineIcon sx={{ fontSize: 'small', verticalAlign: 'middle', marginLeft: '4px' }} />{loggedUser?.userId === chavruta.userId1 ? chavruta.userId2Navigation.email : chavruta.userId1Navigation.email}</Typography>
                                            <Typography sx={{ fontWeight: 'bold' }}>הערות: {loggedUser?.userId === chavruta.userId1 ? chavruta.userId2Navigation.comment : chavruta.userId1Navigation.comment}</Typography>

                                        </Box>
                                    </Collapse>
                                    <ExpandMoreIcon
                                        onClick={() => handleCardClick(chavruta.chavrutaId)}
                                        sx={{ position: 'absolute', bottom: 7, left: 9, cursor: 'pointer' }}
                                    />
                                    <Box display="flex" alignItems="center" mt={2}>

                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            onClick={() => handleUpdateChavruta(chavruta)}
                                            sx={{ marginRight: 0, padding: '4px 6px' }}
                                        >
                                            אישור
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => handleDeclineChavruta(chavruta)}
                                            sx={{ marginRight: 1, padding: '4px 6px' }}
                                        >
                                            ביטול
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                {openForm && (
                    <EventChavrutaForm
                        selectedChavruta={selectedChavruta}
                        onSubmit={handleFormSubmit}
                        onClose={handleCloseForm}
                    />
                )}

            </Grid>
        </div>
    );
};

export default MyChavrutaStatus;
