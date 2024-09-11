import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel, FormControlLabel, Checkbox } from "@mui/material";
import { UpdateLesson } from "../utils/lessonUtil";
import { GetAllRabaies } from '../utils/userUtil';
import { GetAllCategory, GetAllType } from '../utils/lookUpUtil';
import { format } from 'date-fns';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const LessonForm = ({ open, onClose, lesson, setAlert, onUpdate  }) => {

  const emptyLesson = {
    description: "",
    userRavId: 0,
    date: format(new Date(), 'yyyy-MM-dd'),
    uploadByUser: false,
    status: false,
    link: "",
    type: 0,
    categoryId: 0,
  };

  const [formData, setFormData] = useState(emptyLesson);
  const [rabbis, setRabbis] = useState([]);
  const [categories, setCategoriesList] = useState([]);
  const [types, setTypesList] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success'); //
  

  useEffect(() => {
    if (lesson) {
      setFormData({
        lessonId:lesson.lessonId,
        description: lesson.description,
        userRavId: lesson.userRavId,
        date: lesson.date,
        uploadByUser: lesson.uploadByUser,
        status: lesson.status,
        link: lesson.link,
        type: lesson.type,
        categoryId: lesson.categoryId,
      });
    }
  }, [lesson]);

  useEffect(() => {
    getAllRabbis();
    getAllCategory();
    getAllTypes();
  }, []);

  useEffect(() => {
    if (alertMessage) {
        const timer = setTimeout(() => {
            setAlertMessage('');
        }, 5000); // ההתראה תיסגר אחרי 5 שניות

        return () => clearTimeout(timer); // ניקוי הטיימר אם הרכיב יוסר
    }
}, [alertMessage]);

  const getAllRabbis = async () => {
    try {
      const rabaiesResponse = await GetAllRabaies();
      setRabbis(rabaiesResponse);
    } catch (error) {
      console.error("Error fetching rabaies:", error);
    }
  };
  const handleClose = () => {
    onClose(false);
  };

  const getAllCategory = async () => {
    try {
      const categoriesRes = await GetAllCategory();
      setCategoriesList(categoriesRes);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const getAllTypes = async () => {
    try {
      const res = await GetAllType();
      setTypesList(res);
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault(); // למנוע את פעולת ברירת המחדל של שליחת הטופס
    try {
        const res = await UpdateLesson(formData.lessonId, formData); // משתמש ב-formData במקום ב-lesson
        if (res) {
          if (onUpdate) onUpdate();
            setAlertMessage('השיעור עודכן בהצלחה!');
            setAlertSeverity('success');
            handleClose()
        }
    } catch (error) {
        setAlertMessage('שגיאה בעדכון השיעור.');
        setAlertSeverity('error');
    }
};

  const isFormValid = () => {
    const { description, userRavId, date, link, type, categoryId } = formData;
    return description && userRavId && date && link && type && categoryId;
  };

  return (
    <div>
      {alertMessage && (
        <Stack sx={{
          width: '50%', top: 70, position: 'fixed', zIndex: 5000, left: '50%',
          transform: 'translateX(-50%)', alignItems: 'center'
        }} spacing={2}>
          <Alert severity={alertSeverity} color="warning">{alertMessage}</Alert>
        </Stack>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>עריכת שיעור</DialogTitle>
        <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label="תיאור"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth variant="outlined" margin="normal" required>
              <InputLabel id="rav-select-label">רב</InputLabel>
              <Select
                labelId="rav-select-label"
                name="userRavId"
                value={formData.userRavId || ''}
                onChange={handleChange}
                label="רב"
              >
                {rabbis.map(rabbi => (
                  <MenuItem key={rabbi.userId} value={rabbi.userId}>
                    {rabbi.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="תאריך"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
            <TextField
              label="קישור"
              name="link"
              value={formData.link}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControl fullWidth variant="outlined" margin="normal" required>
              <InputLabel id="type-select-label">סוג</InputLabel>
              <Select
                labelId="type-select-label"
                name="type"
                value={formData.type || ''}
                onChange={handleChange}
                label="סוג"
              >
                {types.map(type => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" margin="normal" required>
              <InputLabel id="category-select-label">קטגוריה</InputLabel>
              <Select
                labelId="category-select-label"
                name="categoryId"
                value={formData.categoryId || ''}
                onChange={handleChange}
                label="קטגוריה"
              >
                {categories.map(category => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.desc}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  name="status"
                  checked={formData.status}
                  onChange={handleChange}
                />
              }
              label="אושר"
            />
            <FormControlLabel
              control={
                <Checkbox disabled
                  name="uploadByUser"
                  checked={formData.uploadByUser}
                  onChange={handleChange}
                />
              }
              label="הועלה על ידי משתמש"
            />
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                ביטול
              </Button>
              <Button type="submit" color="primary" disabled={!isFormValid()}>
                שמירה
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LessonForm;
