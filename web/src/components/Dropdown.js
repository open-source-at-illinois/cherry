import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import { Card, CardContent, Modal } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useState } from 'react';

const Drop = () => {
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
                    <Typography sx={{ fontSize: 18, textAlign: 'center' }} color="text.primary" gutterBottom>
                    Gen Eds
                    </Typography>
                </CardContent>
                </Card>
            </Modal>
        </div>
    )
}

export default Drop