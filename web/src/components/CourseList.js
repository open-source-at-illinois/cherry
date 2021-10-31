import * as React from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#0E0063",
        color: "#ffffff",
        fontSize: "1.1rem",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const columns = [
    { id: '', label: '', minWidth: 170 },
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'gpa', label: 'Average GPA', minWidth: 100 },
    {
        id: 'rmp',
        label: 'Rate My Professor',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'cat',
        label: 'Categories Fulfilled',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
];

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
            <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <StyledTableCell component="th" scope="row">
                    {row.title}
                </StyledTableCell>
                <StyledTableCell align="right">{row.gpa}</StyledTableCell>
                <StyledTableCell align="right">{row.rmp}</StyledTableCell>
                <StyledTableCell align="right">{row.cat}</StyledTableCell>
            </StyledTableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <StyledTableRow>
                                        <StyledTableCell>CRN</StyledTableCell>
                                        <StyledTableCell>Hours</StyledTableCell>
                                        <StyledTableCell align="right">Schedule-Type</StyledTableCell>
                                    </StyledTableRow>
                                </TableHead>
                                <TableBody>
                                    {row.details.map((detailsRow) => (
                                        <StyledTableRow key={detailsRow.crn}>
                                            <StyledTableCell component="th" scope="row">
                                                {detailsRow.crn}
                                            </StyledTableCell>
                                            <StyledTableCell>{detailsRow.hours}</StyledTableCell>
                                            <StyledTableCell align="right">{detailsRow.type}</StyledTableCell>
                                        </StyledTableRow>
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
    createData('ANTH 279: Economy, Business & Society', 'No data', 3.1, 2),
    createData('REL 286: Introduction to Hinduism', 3.65, 2.8, 2),
    createData('PORT 150: Writing Brazilians into the U.S.', 'No data', 'No ratings', 2),
    createData('ECON 102: Microeconomic Principles', 3.45, 4.5, 1),
    createData('THEA 101: Introduction to Theatre Arts', 3.69, 4.8, 1),
    createData('ANTH 279: Economy, Business & Society', 'No data', 3.1, 2),
    createData('REL 286: Introduction to Hinduism', 3.65, 2.8, 2),
    createData('PORT 150: Writing Brazilians into the U.S.', 'No data', 'No ratings', 2),
    createData('ECON 102: Microeconomic Principles', 3.45, 4.5, 1),
    createData('THEA 101: Introduction to Theatre Arts', 3.69, 4.8, 1),
    createData('ANTH 279: Economy, Business & Society', 'No data', 3.1, 2),
    createData('REL 286: Introduction to Hinduism', 3.65, 2.8, 2),
    createData('PORT 150: Writing Brazilians into the U.S.', 'No data', 'No ratings', 2),
    createData('ECON 102: Microeconomic Principles', 3.45, 4.5, 1),
    createData('THEA 101: Introduction to Theatre Arts', 3.69, 4.8, 1),
    createData('ANTH 279: Economy, Business & Society', 'No data', 3.1, 2),
    createData('REL 286: Introduction to Hinduism', 3.65, 2.8, 2),
    createData('PORT 150: Writing Brazilians into the U.S.', 'No data', 'No ratings', 2),
    createData('ECON 102: Microeconomic Principles', 3.45, 4.5, 1),
    createData('THEA 101: Introduction to Theatre Arts', 3.69, 4.8, 1),
];

export default function CollapsibleTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column) => (
                                <StyledTableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <Row key={row.title} row={row} />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
