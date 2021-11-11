import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Card, CardContent } from '@mui/material';
import { Typography } from '@mui/material';

const label = { inputProps: { 'aria-label': 'Checkbox' } };

const GenEdSelector = () => {
  return (
    <Card sx={{margin:2}}>
      <CardContent>
      <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>
        Gen Eds
      </Typography>
      <FormGroup>
      <FormControlLabel control={<Checkbox />} label="Advanced Composition" />
      <FormControlLabel control={<Checkbox />} label="Western/Comparative Culture" />
      <FormControlLabel control={<Checkbox />} label="Non-Western Culture" />
      <FormControlLabel control={<Checkbox />} label="US Minority Culture" />
      <FormControlLabel control={<Checkbox />} label="Humanities and the Arts " />
      <FormControlLabel control={<Checkbox />} label="Natural Science and Technology" />
      <FormControlLabel control={<Checkbox />} label="Quantitative Reasoning" />
      <FormControlLabel control={<Checkbox />} label="Social and Behavioral Sciences" />
    </FormGroup>
    </CardContent>
    </Card>
    
  );
}

export default GenEdSelector