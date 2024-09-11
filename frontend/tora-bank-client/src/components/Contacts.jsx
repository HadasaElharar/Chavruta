import React, { useEffect, useState } from 'react';
import { GetAllContacts } from '../utils/contactUtil';
import { useSelector } from 'react-redux';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import AlertMessage from './AlertMessage';

const tableStyles = {
  container: {
    border: '1px solid gold',
    width: '50%',
    margin: 'auto',
    maxHeight: '340px',
  },
  headCell: {
    textAlign: 'right',
    backgroundColor: '#e0e0e0',
    fontWeight: 'bold',
    color: 'black',
    fontSize: '1.1em',
  },
  cell: {
    textAlign: 'right',
    padding: '8px 16px',
  },
  iconCell: {
    width: '50px',
    padding: '8px 16px',
  },
  collapseCell: {
    paddingBottom: 0,
    paddingTop: 0,
    paddingRight: '16px',
    paddingLeft: '16px',
  },
  contactDetailsContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 0',
    position: 'relative',
    borderTop: '1px solid #e0e0e0',
    paddingRight: '16px',
  },
  contactDetail: {
    flex: 1,
    padding: '0 8px',
  },
  phone: {
    textAlign: 'right',
    paddingRight: '8px',
  },
  email: {
    textAlign: 'left',
    paddingLeft: '8px',
  },
  verticalLine: {
    borderRight: '1px solid gold',
    height: '100%',
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    transform: 'translateX(-50%)',
  },
  emailLink: {
    color: 'blue', // Change to blue for visibility
    textDecoration: 'underline', // Underline to indicate it's a link
  },
};

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [openRow, setOpenRow] = useState(null);
  const loggedUser = useSelector((state) => state.user.loggedUser);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('info');


  const showAlert = (message, severity = 'info') => {
    setAlertMessage(message);
    setAlertSeverity(severity);
  };

  useEffect(() => {
    if (loggedUser?.levelId === 2) {
      GetAllContacts().then((res) => {
        setContacts(res);
      });
    } else {
      showAlert("אינך מנהל", 'error');
    }
  }, [loggedUser]);

  const handleRowClick = (index) => {
    setOpenRow(openRow === index ? null : index);
  };

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>כל הפניות</h1>
      <TableContainer component={Paper} style={tableStyles.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell style={tableStyles.headCell} />
              <TableCell style={tableStyles.headCell}>נושא הפניה</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map((contact, index) => (
              <React.Fragment key={index}>
                <TableRow hover onClick={() => handleRowClick(index)}>
                  <TableCell style={tableStyles.iconCell}>
                    <IconButton>
                      {openRow === index ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                    </IconButton>
                  </TableCell>
                  <TableCell style={tableStyles.cell}>{contact.subject}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={tableStyles.collapseCell} colSpan={2}>
                    <Collapse in={openRow === index} timeout="auto" unmountOnExit>
                      <Box>
                        <Typography variant="h6" style={tableStyles.cell}>
                          מספר פניה: {contact.contactId}
                        </Typography>
                        <Typography variant="body2" style={tableStyles.cell}>
                          פניה: {contact.message}
                        </Typography>
                        <Box style={tableStyles.contactDetailsContainer}>
                          <Typography variant="body2" style={{ ...tableStyles.contactDetail, ...tableStyles.phone }}>
                            טלפון: {contact.phone}
                            
                          </Typography>
                          <div style={tableStyles.verticalLine} />
                          <Typography
                            variant="body2"
                            style={{ ...tableStyles.contactDetail, ...tableStyles.email }}
                          >
                            אימייל:
                            <a
                              href={`mailto:${contact.email}`}
                              style={tableStyles.emailLink} // Apply emailLink styles here
                            >
                              {contact.email}
                            </a>
                          </Typography>
                        </Box>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <AlertMessage
          message={alertMessage}
          severity={alertSeverity}
          onClose={() => setAlertMessage('')}
        />
      </TableContainer>
    </>
  );
};

export default Contacts;
