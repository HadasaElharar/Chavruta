// FilterChips.js
import React from 'react';
import { Chip, Box } from '@mui/material';
import { useSelector } from 'react-redux';

const FilterChips = ({ filterParams, handleRemoveFilter }) => {
  const dateFilter = useSelector((state) => state.lesson.dataFilter);

  const getChipLabel = (key, value) => {
    switch (key) {
      case 'categoryID':
        const category = dateFilter.categories.find(cat => cat.id === value);
        return category ? `קטגוריה: ${category.desc}` : 'קטגוריה לא מוגדרת';
      case 'type':
        const type = dateFilter.types.find(t => t.id === value);
        return type ? `סוג: ${type.desc}` : 'סוג לא מוגדר';
      case 'ravId':
        const rabbi = dateFilter.rabbaies.find(r => r.userId === value);
        return rabbi ? `שם רב: ${rabbi.name}` : 'רב לא מוגדר';
      case 'startDate':
        return `תאריך התחלה: ${new Date(value).toLocaleDateString()}`;
      case 'endDate':
        return `תאריך סיום: ${new Date(value).toLocaleDateString()}`;
      default:
        return `${key}: ${value}`;
    }
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={1}>
      {Object.entries(filterParams).map(([key, value]) =>
        value && (
          <Chip
            key={key}
            label={getChipLabel(key, value)}
            onDelete={() => handleRemoveFilter(key)}
            sx={{ margin: 1 }}
          />
        )
      )}
    </Box>
  );
};

export default FilterChips;
