import React, { useEffect, useState } from 'react';
import BigCalendar from "react-big-calendar-like-google";
import moment from "moment";
import "react-big-calendar-like-google/lib/css/react-big-calendar.css";
import { GetEventsChavrutumByUserId, GetEventsChavrutumById } from "../utils/eventsChavrutaUtil";
import { useSelector } from 'react-redux';
import EventChavrutaForm from './EventChavrutaForm';
import AlertMessage from './AlertMessage';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));

const MyCalendar = () => {
  const loggedUser = useSelector(state => state.user.loggedUser);
  const [eventsCalendar, setEventCalendar] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');

  useEffect(() => {
    GetEventsChavrutumByUserId(loggedUser.userId).then(res => {
      console.log('Fetched events:', res); // לוודא שהאירועים נטענים נכון
      setEventCalendar(res.map(x => ({
        ...x,
        end: new Date(x.end),
        start: new Date(x.start)
      })));
    });
  }, [loggedUser.userId]);

  const handleSelectEvent = async (event) => {
    console.log('Selected event:', event);
    try {
      const selectedChavrutaId = event.eventChavrutaId;
      console.log('Fetching event data for ID:', selectedChavrutaId);
      const eventData = await GetEventsChavrutumById(selectedChavrutaId);
      setSelectedEvent({
        eventChavrutaId: eventData.eventChavrutaId,
        subject: eventData.subject,
        startDate: eventData.startDate,
        endDate: eventData.endDate,
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        chavrutaId: eventData.chavrutaId,
        color: eventData.color,
        userDays: eventData.userDays.map(userDay => ({ dayId: userDay.dayId, desc: userDay.day.desc }))
      });

      setDialogOpen(true);
    } catch (error) {
      console.error('Error fetching event details:', error);
      showAlert('אופס, אירעה תקלה בקבלת פרטי האירוע', 'error');
    }
  };
  const showAlert = (message, severity = 'info') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
  };

  const handleCloseForm = () => {
    setDialogOpen(false);
    setSelectedEvent(null);
  };
  const handleFormSubmit = () => {
    GetEventsChavrutumByUserId(loggedUser.userId).then(res => {
      console.log('Updated events:', res);
      setEventCalendar(res.map(x => ({
        ...x,
        end: new Date(x.end),
        start: new Date(x.start)
      })));
    }).catch(error => {
      console.error('Error fetching updated events:', error);
      showAlert('אופס, אירעה תקלה בעדכון רשימת האירועים', 'error');
    });
  };


  return (
    <>
      <BigCalendar
        selectable
        events={eventsCalendar}
        defaultView="month"
        scrollToTime={new Date(1970, 1, 1, 8)}
        defaultDate={new Date()}
        onSelectEvent={handleSelectEvent}
        style={{
          border: '3px solid #a0a0a0',
          borderRadius: '8px', 
          padding: '10px',
          backgroundColor: '#fff'
        }}
      // onSelectSlot={slotInfo => 
      //   alert(
      //     `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
      //     `\nend: ${slotInfo.end.toLocaleString()}` +
      //     `\naction: ${slotInfo.action}`
      //   )
      // }
      />
      {dialogOpen && (
        <EventChavrutaForm
          selectedChavruta={selectedEvent}
          // onSubmit={handleSave}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}
      <AlertMessage
        message={alertMessage}
        severity={alertSeverity}
        onClose={() => setAlertMessage('')}
      />
    </>
  );
};

export default MyCalendar;
