import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(title, gpa, rmp, cat) {
    return { title, gpa, rmp, cat };
}

const rows = [
    createData('ANTH 279 Economy, Business & Society', 'No data', 3.1, 2),
    createData('REL 286 Introduction to Hinduism', 3.65, 2.8, 2),
    createData('PORT 150 Writing Brazilians into the U.S.', 'No data', 'No ratings', 2),
    createData('ECON 102 Microeconomic Principles', 3.45, 4.5, 1),
    createData('THEA 101 Introduction to Theatre Arts', 3.69, 4.8, 1),
];

const CourseList = (props) => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="right">Average GPA</TableCell>
                            <TableCell align="right">Rate My Professor</TableCell>
                            <TableCell align="right">Categories Fulfilled</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="right">{row.gpa}</TableCell>
                            <TableCell align="right">{row.rmp}</TableCell>
                            <TableCell align="right">{row.cat}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default CourseList;
