import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // צבע ראשי
    },
    secondary: {
      main: '#ffeb3b', // צבע משני
    },
    background: {
      default: '#f0f0f0', // צבע רקע כללי
    },
  },
  typography: {
    fontFamily: ' "Segoe UI", sans-serif',
    h4: {
      fontSize: '2rem',
      fontWeight: 'bold',
    },
    body1: {
      fontSize: '1rem',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          padding: '16px',
          marginBottom: '16px',
        },
      },
     
    },
    MuiBox: {
      styleOverrides: {
        root: {
          backgroundImage: 'url(/public/pictures/book-library-with-open-textbook.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100%',
          color: 'white',
          p: 4,
          overflowY: 'auto',
        },
      },
    },
    
   
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: '#1976d2',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          color: '#fff',
          fontWeight: 'bold',
        },
      },
    },
  },
  // ציינו את התמונה כרקע בכל הקומפוננטות כאן
  // יש לשים לב לנתיב המדויק של התמונה בפרוייקט
  // וגם לגודל ולמיקום שלה ברקע
  components: {
    MuiBox: {
      styleOverrides: {
        root: {
          backgroundImage: 'url(/public/pictures/book-library-with-open-textbook.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh',
          width: '100%',
          color: 'white',
          p: 4,
          overflowY: 'auto',
        },
      },
    },
    
  },
});

export default theme;
