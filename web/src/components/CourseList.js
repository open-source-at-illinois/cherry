import * as React from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function createData(title, gpa, rmp, cat) {
    return { 
        title, 
        gpa, 
        rmp, 
        cat,
        details: [
            {
                crn: 123456,
                hours: 3,
                type: 'Lecture',
            },
        ], 
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.title}
          </TableCell>
          <TableCell align="right">{row.gpa}</TableCell>
          <TableCell align="right">{row.rmp}</TableCell>
          <TableCell align="right">{row.cat}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Details
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>CRN</TableCell>
                      <TableCell>Hours</TableCell>
                      <TableCell align="right">Schedule-Type</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.details.map((detailsRow) => (
                      <TableRow key={detailsRow.crn}>
                        <TableCell component="th" scope="row">
                          {detailsRow.crn}
                        </TableCell>
                        <TableCell>{detailsRow.hours}</TableCell>
                        <TableCell align="right">{detailsRow.type}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

Row.propTypes = {
    row: PropTypes.shape({
      gpa: PropTypes.number.isRequired,
      rmp: PropTypes.number.isRequired,
      cat: PropTypes.number.isRequired,
      details: PropTypes.arrayOf(
        PropTypes.shape({
          crn: PropTypes.number.isRequired,
          hours: PropTypes.number.isRequired,
          type: PropTypes.string.isRequired,
        }),
      ).isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  };

const rows = [
    createData('ANTH 279: Economy, Business & Society', 'No data', 3.1, 2),
    createData('REL 286: Introduction to Hinduism', 3.65, 2.8, 2),
    createData('PORT 150: Writing Brazilians into the U.S.', 'No data', 'No ratings', 2),
    createData('ECON 102: Microeconomic Principles', 3.45, 4.5, 1),
    createData('THEA 101: Introduction to Theatre Arts', 3.69, 4.8, 1),
];

export default function CollapsibleTable() {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
                <TableCell/>
                <TableCell>Title</TableCell>
                <TableCell align="right">Average GPA</TableCell>
                <TableCell align="right">Rate My Professor</TableCell>
                <TableCell align="right">Categories Fulfilled</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <Row key={row.title} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
