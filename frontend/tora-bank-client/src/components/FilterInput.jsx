import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextField, Select, MenuItem, FormControl, InputLabel, Box, Button } from "@mui/material";

const FilterInput = ({ handleChange, filterParams, setFilterParams, setIsFilter }) => {

  const dispatch = useDispatch();

  const dateFilter = useSelector((state) => state.lesson.dataFilter);

  const [touched, setTouched] = useState({
    startDate: false,
    endDate: false
  });

  const validateDates = (startDate, endDate) => {
    if (!startDate || !endDate) {
      return true; // לא צריך לבדוק אם אחד מהתאריכים חסר
    }
    return new Date(startDate) <= new Date(endDate);
  };

  const handleBlur = (field) => {
    setTouched((prevTouched) => ({
      ...prevTouched,
      [field]: true
    }));
  };


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    const newValue = value === "" ? null : value; // Treat empty string as null

    // Update the Redux state
    setFilterParams({ [name]: newValue });

    // Set filtering active
    setIsFilter(true);
    console.log(`Dispatching new filter params: ${name} set to ${newValue}`);

    // Call handleChange if provided
    if (handleChange) {
      handleChange(1, { ...filterParams, [name]: newValue });
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} >
      <FormControl fullWidth variant="outlined">
        <InputLabel id="category-select-label">קטגוריה</InputLabel>
        <Select
          labelId="category-select-label"
          name="categoryID"
          value={filterParams.categoryID || ""}
          onChange={handleInputChange}
          label="קטגוריה"
        >
          <MenuItem value=""><em>הצג הכל</em></MenuItem>
          {dateFilter.categories.map(category => (
            <MenuItem key={category.id} value={category.id}>
              {category.desc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="type-select-label">וידאו/שמע</InputLabel>
        <Select
          labelId="type-select-label"
          name="type"
          value={filterParams.type || ""}
          onChange={handleInputChange}
          label="וידאו/שמע"

        >
          <MenuItem value=""><em>הצג הכל</em></MenuItem>
          {dateFilter.types.map(type => (
            <MenuItem key={type.id} value={type.id}>
              {type.desc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="rav-select-label">רב</InputLabel>
        <Select
          labelId="rav-select-label"
          name="ravId"
          value={filterParams.ravId || ""}
          onChange={handleInputChange}
          label="רב"
        >
          <MenuItem value=""><em>הצג הכל</em></MenuItem>
          {dateFilter.rabbaies.map(rav => (
            <MenuItem key={rav.userId} value={rav.userId}>
              {rav.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="תאריך התחלה"
        type="date"
        name="startDate"
        InputLabelProps={{ shrink: true }}
        onBlur={() => setTouched(prevTouched => ({ ...prevTouched, startDate: true }))}
        value={filterParams.startDate || ""}
        onChange={handleInputChange}
        inputProps={{
          max: filterParams.endDate || undefined // Set min date based on startDate
        }}
        helperText={touched.startDate && !validateDates(filterParams.startDate, filterParams.endDate) ? "תאריך התחלה חייב להיות לפני תאריך סיום." : ""}
      />
      <TextField
        fullWidth
        label="תאריך סיום"
        type="date"
        name="endDate"
        InputLabelProps={{ shrink: true }}
        value={filterParams.endDate || ""}
        onBlur={() => setTouched(prevTouched => ({ ...prevTouched, endDate: true }))}
        onChange={handleInputChange}
        inputProps={{
          min: filterParams.startDate || undefined // Set min date based on startDate
        }}
        helperText={touched.startDate && !validateDates(filterParams.startDate, filterParams.endDate) ? "תאריך התחלה חייב להיות לפני תאריך סיום." : ""}
      />
    </Box>
  );
};

export default FilterInput;
