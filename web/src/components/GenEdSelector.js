import * as React from 'react';
import useWindowDimensions from "../useWindowDimensions";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Card, CardContent, Modal } from '@mui/material';
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useState } from 'react';

const CheckBoxForm = ({ geneds = {}, setGenEds }) => {
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

  const checkBoxUpdate = (genEdId) => {
    return (event) => {
      setGenEds({ ...geneds, [genEdId]: event.target.checked });
    }
  }

  return (
    <FormGroup>
      {Object.keys(genEdIds).map(genEdId => {
        return (<FormControlLabel control={<Checkbox />} label={genEdIds[genEdId]} onChange={checkBoxUpdate(genEdId)} checked={geneds[genEdId]} />);
      }
      )}
    </FormGroup>
  )
}

const GenEdSelector = ({ geneds = {}, setGenEds }) => {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { width } = useWindowDimensions();

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
    <>
      {
        (width > 900) ?
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 18, textAlign: 'center' }} color="text.primary" gutterBottom>
                Gen Eds
              </Typography>
              <CheckBoxForm setGenEds={setGenEds} geneds={geneds} />
            </CardContent>
          </Card>
          :
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
                  <CheckBoxForm setGenEds={setGenEds} geneds={geneds} />
                </CardContent>
              </Card>
            </Modal>
          </div>
      }
    </>

  );
}

export default GenEdSelector