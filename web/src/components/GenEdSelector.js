import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Card, CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { useState } from 'react'
const label = { inputProps: { 'aria-label': 'Checkbox' } };

const GenEdSelector = ({ geneds = {}, setGenEds }) => {

  const genEdIds = {
    AC: "Advanced Composition",
    WCC: "Western/Comparative Culture",
    NWC: "Non-Western Culture",
    USM: "US Minority Culture",
    HA: "Humanities and the Arts ",
    NST: "Natural Science and Technology",
    QRA: "Quantitative Reasoning II",
    QRB: "Quantitative Reasoning I",
    SBS: "Social and Behavioral Sciences",
  }

  const checkBoxUpdate = (genEdId) => {
    return (event) => {
      setGenEds({ ...geneds, [genEdId]: event.target.checked });
    }
  }

  return (
    <Card sx={{ margin: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
          Gen Eds
        </Typography>
        <FormGroup>
          {Object.keys(genEdIds).map(genEdId => {
            return (<FormControlLabel control={<Checkbox />} label={genEdIds[genEdId]} onChange={checkBoxUpdate(genEdId)} checked={geneds[genEdId]} />);
          }
          )}
        </FormGroup>
      </CardContent>
    </Card>

  );
}

export default GenEdSelector