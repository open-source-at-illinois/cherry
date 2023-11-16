import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import { Card, CardContent, Modal, Button, Box } from '@mui/material';
import { Typography } from '@mui/material'; // remove unused imports
import { useState } from 'react';
import GenEdSelector from "./GenEdSelector";

const Drop = ({prefs, setPrefs}) => {
    const [open, setOpen] = useState(false);

    const modalStyle ={
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
    const updateGenEds = (geneds) => {
        setPrefs({...prefs, geneds: geneds});
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={() => setOpen(true)}>Filter by Gen Eds</Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Card sx={modalStyle}>
                <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <GenEdSelector geneds={prefs.geneds} setGenEds={updateGenEds} />
                        <Button onClick={() => setOpen(false)}>Close</Button>
                    </Box>
                </CardContent>
                </Card>
            </Modal>
        </div>
    )
}

export default Drop