import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const TermsOfService = () => {
    return (
        <Container component="main" maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
                <Typography component="h1" variant="h4" align="center" gutterBottom>
                    תקנון האתר
                </Typography>
                <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        1. הקדמה
                    </Typography>
                    <Typography paragraph>
                        ברוכים הבאים לאתר שלנו. השימוש באתר מותנה בקבלת התקנון המפורט להלן. המשך השימוש באתר מהווה הסכמה מלאה לתנאי התקנון.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        2. שימוש באתר
                    </Typography>
                    <Typography paragraph>
                        השימוש באתר מותר למטרות חוקיות בלבד ועל המשתמש להימנע מכל פעולה העלולה לגרום נזק לאתר, למפעיליו או לכל צד שלישי.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        3. קניין רוחני
                    </Typography>
                    <Typography paragraph>
                        כל התכנים המופיעים באתר, לרבות טקסטים, גרפיקה, תמונות וסרטונים, מוגנים בזכויות יוצרים ואין להעתיק, להפיץ או לפרסם אותם ללא אישור בכתב מהמפעילים.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        4. פרטיות
                    </Typography>
                    <Typography paragraph>
                        הפרטיות שלכם חשובה לנו. כל המידע האישי הנמסר באתר נשמר בסודיות ולא יימסר לצדדים שלישיים ללא הסכמת המשתמש, למעט אם נדרש לעשות זאת על פי חוק.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        5. שינויים בתקנון
                    </Typography>
                    <Typography paragraph>
                        המפעילים שומרים לעצמם את הזכות לשנות את התקנון בכל עת. שינויים אלו יחולו מרגע פרסומם באתר.
                    </Typography>

                    <Typography variant="h6" gutterBottom>
                        6. יצירת קשר
                    </Typography>
                    <Typography paragraph>
                        לכל שאלה או בירור נוסף ניתן ליצור עמנו קשר דרך טופס יצירת הקשר באתר או בכתובת הדוא"ל המצוינת בדף יצירת הקשר.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default TermsOfService;
