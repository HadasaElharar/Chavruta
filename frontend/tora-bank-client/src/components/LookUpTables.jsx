import React, { useEffect, useState } from 'react';
import { 
    GetAllCategory, GetAllCity, GetAllType, 
    AddCity, UpdateCity, 
    AddCategory, UpdateCategory, 
    AddType, UpdateType 
} from '../utils/lookUpUtil';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Paper, Typography, IconButton, Box, TextField, Button, 
    Dialog, DialogActions, DialogContent, DialogTitle 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const LookUpTables = () => {
    const [categories, setCategories] = useState([]);
    const [cities, setCities] = useState([]);
    const [types, setTypes] = useState([]);
    const [expandedTable, setExpandedTable] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMode, setDialogMode] = useState('add'); // 'add' or 'edit'
    const [currentCity, setCurrentCity] = useState({ id: '', desc: '' });
    const [newCityDesc, setNewCityDesc] = useState('');
    const [currentCategory, setCurrentCategory] = useState({ id: '', desc: '' });
    const [newCategoryDesc, setNewCategoryDesc] = useState('');
    const [currentType, setCurrentType] = useState({ id: '', desc: '' });
    const [newTypeDesc, setNewTypeDesc] = useState('');
    const [currentTable, setCurrentTable] = useState('');

    useEffect(() => {
        GetAllCity().then((res) => setCities(res)).catch((err) => {
            console.log(err);
            console.log("failed to get all cities");
        });

        GetAllCategory().then((res) => setCategories(res)).catch((err) => {
            console.log(err);
            console.log("failed to get all categories");
        });

        GetAllType().then((res) => setTypes(res)).catch((err) => {
            console.log(err);
            console.log("failed to get all types");
        });
    }, []);

    const handleTableToggle = (tableName) => {
        setExpandedTable(expandedTable === tableName ? null : tableName);
    };

    const openAddDialog = (tableName) => {
        setDialogMode('add');
        setDialogOpen(true);
        setCurrentTable(tableName);
        if (tableName === 'ערים') {
            setNewCityDesc('');
        } else if (tableName === 'קטגוריות') {
            setNewCategoryDesc('');
        } else if (tableName === 'סוגים') {
            setNewTypeDesc('');
        }
    };

    const openEditDialog = (tableName, item) => {
        setDialogMode('edit');
        setCurrentTable(tableName);
        setDialogOpen(true);
        if (tableName === 'ערים') {
            setCurrentCity(item);
            setNewCityDesc(item.desc);
        } else if (tableName === 'קטגוריות') {
            setCurrentCategory(item);
            setNewCategoryDesc(item.desc);
        } else if (tableName === 'סוגים') {
            setCurrentType(item);
            setNewTypeDesc(item.desc);
        }
    };

    const handleAddCity = async () => {
        try {
            await AddCity({ desc: newCityDesc });
            setDialogOpen(false);
            GetAllCity().then((res) => setCities(res));
        } catch (err) {
            console.log(err);
            console.log("failed to add city");
        }
    };

    const handleUpdateCity = async () => {
        try {
            if (!currentCity.id) {
                throw new Error('currentCity ID is undefined');
            }
            await UpdateCity(currentCity.id, { ...currentCity, desc: newCityDesc });
            setDialogOpen(false);
            GetAllCity().then((res) => setCities(res));
        } catch (err) {
            console.log(err);
            console.log("failed to update city");
        }
    };

    const handleAddCategory = async () => {
        try {
            await AddCategory({ desc: newCategoryDesc });
            setDialogOpen(false);
            GetAllCategory().then((res) => setCategories(res));
        } catch (err) {
            console.log(err);
            console.log("failed to add category");
        }
    };

    const handleUpdateCategory = async () => {
        try {
            if (!currentCategory.id) {
                throw new Error('currentCategory ID is undefined');
            }
            await UpdateCategory(currentCategory.id, { ...currentCategory, desc: newCategoryDesc });
            setDialogOpen(false);
            GetAllCategory().then((res) => setCategories(res));
        } catch (err) {
            console.log(err);
            console.log("failed to update category");
        }
    };

    const handleAddType = async () => {
        try {
            await AddType({ desc: newTypeDesc });
            setDialogOpen(false);
            GetAllType().then((res) => setTypes(res));
        } catch (err) {
            console.log(err);
            console.log("failed to add type");
        }
    };

    const handleUpdateType = async () => {
        try {
            if (!currentType.id) {
                throw new Error('currentType ID is undefined');
            }
            await UpdateType(currentType.id, { ...currentType, desc: newTypeDesc });
            setDialogOpen(false);
            GetAllType().then((res) => setTypes(res));
        } catch (err) {
            console.log(err);
            console.log("failed to update type");
        }
    };

    const getDialogTitle = () => {
        if (currentTable === 'ערים') {
            return dialogMode === 'add' ? 'הוסף עיר' : 'ערוך עיר';
        } else if (currentTable === 'קטגוריות') {
            return dialogMode === 'add' ? 'הוסף קטגוריה' : 'ערוך קטגוריה';
        } else if (currentTable === 'סוגים') {
            return dialogMode === 'add' ? 'הוסף סוג' : 'ערוך סוג';
        }
    };

    const handleDialogSubmit = () => {
        if (currentTable === 'ערים') {
            if (dialogMode === 'add') {
                handleAddCity();
            } else {
                handleUpdateCity();
            }
        } else if (currentTable === 'קטגוריות') {
            if (dialogMode === 'add') {
                handleAddCategory();
            } else {
                handleUpdateCategory();
            }
        } else if (currentTable === 'סוגים') {
            if (dialogMode === 'add') {
                handleAddType();
            } else {
                handleUpdateType();
            }
        }
    };

    return (
        <>
            <Typography variant="h4" align="center" gutterBottom>
                טבלאות כלליות
            </Typography>
            {[
                { name: 'ערים', data: cities },
                { name: 'קטגוריות', data: categories },
                { name: 'סוגים', data: types },
            ].map((table, index) => (
                <Box key={index} style={{ width: '70%', margin: 'auto', marginBottom: '20px' }}>
                    <Table>
                        <TableHead style={{ backgroundColor: '#b0b0b0' }}>
                            <TableRow onClick={() => handleTableToggle(table.name)}>
                                <TableCell style={{ textAlign: 'right', width: '90%' }}>{table.name}</TableCell>
                                <TableCell style={{ textAlign: 'left', width: '10%' }}>
                                    {table.name === 'ערים' && (
                                        <IconButton onClick={() => openAddDialog('ערים')}>
                                            <AddIcon />
                                        </IconButton>
                                    )}
                                    {table.name === 'קטגוריות' && (
                                        <IconButton onClick={() => openAddDialog('קטגוריות')}>
                                            <AddIcon />
                                        </IconButton>
                                    )}
                                    {table.name === 'סוגים' && (
                                        <IconButton onClick={() => openAddDialog('סוגים')}>
                                            <AddIcon />
                                        </IconButton>
                                    )}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                    </Table>
                    {expandedTable === table.name && (
                        <TableContainer component={Paper} style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            <Table>
                                <TableBody>
                                    {table.data.map((item, itemIndex) => (
                                        <TableRow key={itemIndex}>
                                            <TableCell style={{ textAlign: 'right' }}>{item.desc}</TableCell>
                                            <TableCell style={{ textAlign: 'left' }}>
                                                {table.name === 'ערים' && (
                                                    <IconButton onClick={() => openEditDialog('ערים', item)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                )}
                                                {table.name === 'קטגוריות' && (
                                                    <IconButton onClick={() => openEditDialog('קטגוריות', item)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                )}
                                                {table.name === 'סוגים' && (
                                                    <IconButton onClick={() => openEditDialog('סוגים', item)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            ))}

            {/* Dialog for Adding and Editing */}
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>{getDialogTitle()}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="desc"
                        label="תיאור"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={
                            currentTable === 'ערים' ? newCityDesc :
                            currentTable === 'קטגוריות' ? newCategoryDesc :
                            currentTable === 'סוגים' ? newTypeDesc :
                            ''
                        }
                        onChange={(e) => {
                            if (currentTable === 'ערים') {
                                setNewCityDesc(e.target.value);
                            } else if (currentTable === 'קטגוריות') {
                                setNewCategoryDesc(e.target.value);
                            } else if (currentTable === 'סוגים') {
                                setNewTypeDesc(e.target.value);
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
                        ביטול
                    </Button>
                    <Button onClick={handleDialogSubmit} color="primary">
                        {dialogMode === 'add' ? 'הוסף' : 'עדכן'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default LookUpTables;
