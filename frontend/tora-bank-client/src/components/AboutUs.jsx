import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

const AboutUs = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, alignItems: 'center', position: 'relative'  }}>
     
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={5}>
          <Box sx={{
            bgcolor: 'rgba(33, 33, 33, 0.9)',
            color: 'white',
            p: { xs: 1, md: 3 },
            borderRadius: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            boxShadow: 3,
            maxWidth: { xs: '100%', md: '565px' },
            mx: 'auto', // מרכז אוטומטית
          }}>
            <Typography variant="h1" gutterBottom component="div">
              אודותינו
            </Typography>
            <Typography variant="body1" paragraph>
              ברוכים הבאים ל"בנק התורה", המקום בו כל אחד יכול להתחבר ללימוד תורה בכל זמן ומקום. מטרתנו היא להפיץ את אור התורה ברחבי העולם, לספק גישה לשיעורי תורה מקוונים ולקבוע חברותאות עם שותפים ברחבי הגלובוס.
            </Typography>
            <Typography variant="body1" paragraph>
              תוכנית "חברותא" מאפשרת מציאת שותפים ללימוד תורה בהתאמה אישית, מעמיקה את הידע היהודי ומעודדת לימוד משותף באמצעות פלטפורמה מתקדמת המציעה מגוון כלים לניהול ותכנון הלימוד.
              "חברותא" פותח במטרה לאפשר לכל אחד למצוא את השותף האידיאלי ללימוד תורה, לתאם זמנים ולחקור נושאים תורניים באופן משותף. הפלטפורמה מספקת גישה למאגר רחב של חומרי לימוד דיגיטליים ומאפשרת ניהול אישי של תוכניות הלימוד. זהו מקום שבו לומדי תורה יכולים להרחיב את ידיעותיהם, להתחבר עם לומדים אחרים ולקדם את ההבנה המשותפת באווירה תומכת ומזמינה.
            </Typography>
            <Typography variant="body1" paragraph>
            כחלק ממגוון שירותיו של "בנק התורה", אנו מציעים שירות ייחודי שמאפשר לכל אדם לשאול שאלות בתחום ההלכה, המוסר והידע היהודי באופן אנונימי ואישי. מענה לשאלות ניתן על ידי רבנים מוסמכים שלנו, המחויבים לתת מענה מדויק, ענייני ומהיר. שירות זה נועד לאפשר לכל אחד לקבל תשובות רלוונטיות לשאלותיו תוך שמירה על פרטיותו ואנונימיותו, מה שמבטיח חוויה נעימה ובטוחה לכל המשתמשים
            </Typography>
            <Typography variant="body1" paragraph>
              הצטרפו אלינו למסע של לימוד והעשרה רוחנית, בו תגלו קהילה תומכת, תכנים איכותיים וחוויה לימודית מרתקת שמחכה רק לכם.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="/pictures/stacked-books-laptop-with-blank-white-screen-wooden-surface.jpg"
            alt="Books and Laptop"
            sx={{
              width: '100%',
              height: { xs: 200, sm: 300, md: 'auto' }, // תיקון גובה תמונה לרספונסיביות
              boxShadow: 3,
              position: 'relative',
              "&::after": {
                content: '""',
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: { xs: '5px', md: '10px' }, // רוחב הפס מותאם לגודל מסך
                bgcolor: 'gold',
              }
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AboutUs;
