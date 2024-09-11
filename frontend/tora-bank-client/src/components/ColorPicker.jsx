import { Box, Typography } from '@mui/material';

const ColorPicker = ({ color, onChange }) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', marginY: 2, marginTop: -1 }}>
            <Typography variant="body2" color="textSecondary" sx={{ marginRight: 0 }}>
                לחץ לבחירת צבע : 
            </Typography>
            <Box
                component="div"
                sx={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    padding: 0,
                    border: '2px solid #000',
                    cursor: 'pointer',
                    backgroundColor: color || '#ffffff',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onClick={() => document.getElementById('colorInput').click()}
            >
                <input
                    id="colorInput"
                    type="color"
                    value={color || '#ffffff'}
                    onChange={(e) => onChange(e.target.value)}
                    style={{
                        position: 'absolute',
                        opacity: 0,
                        cursor: 'pointer',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        zIndex: -1 // להעיף את השדה מאחורי האלמנטים האחרים
                    }}
                />
            </Box>
        </Box>
    );
};

export default ColorPicker;
