import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
const label = { inputProps: { 'aria-label': 'Checkbox' } };


const GenEdSelector = ({ geneds = {}, setGenEds, open, setOpen, onClose, value, setValue}) => {
  const genEdIds = {
    AC: "Advanced Composition",
    WCC: "Western/Comparative Culture",
    NWC: "Non-Western Culture",
    USMC: "US Minority Culture",
    HA: "Humanities and the Arts ",
    NST: "Natural Science and Technology",
    QRA: "Quantitative Reasoning I",
    QRB: "Quantitative Reasoning II",
    SBS: "Social and Behavioral Sciences",
  }
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(value);
    }
  }, [value, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  const handleChange = (event) => {
    console.log(event.value);
    setValue(event.target.value);
  };
  const checkBoxUpdate = (genEdId) => {
    return (event) => {
      setGenEds({ ...geneds, [genEdId]: event.target.checked });
    }
  }


  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
    >
      <DialogTitle>Gen Ed Preferences</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          ref={radioGroupRef}
          aria-label="Gen Ed"
          name="gen ed"
          value={value}
          onChange={handleChange}
        >
          {Object.keys(genEdIds).map(genEdId => {
            return (

            <FormControlLabel 
              key={genEdId}
              control={<Checkbox />} 
              label={genEdIds[genEdId]} 
              onChange={checkBoxUpdate(genEdId)} 
              checked={geneds[genEdId]} 
            />
            
            );
          }
          )}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

GenEdSelector.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

export default function GenEdSelectorMobile({ geneds = {}, setGenEds }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('None');
  {console.log(value)}

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="div" role="group">
        <ListItem
          button
          divider
          aria-haspopup="true"
          aria-controls="gened-menu"
          aria-label="gen eds"
          onClick={handleClickListItem}
        >
          <ListItemText primary="Gen Ed Preferences" secondary={value} />
        </ListItem>
        <GenEdSelector
            id="gened-menu"
            keepMounted
            geneds = {geneds}
            setGenEds = {setGenEds}
            open={open}
            setOpen={setOpen}
            onClose={handleClose}
            value={value}
            setValue={setValue}
        />
      </List>
    </Box>
  );
}
