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
    { id: '_id', align: 'center', label: '', minWidth: 20 },
    { id: 'course_id', align: 'center', label: 'Course ID', minWidth: 100 },
    { id: 'name', align: 'center', label: 'Name', minWidth: 170 },
    { id: 'credits', align: 'center', label: 'Credits', minWidth: 70 },
    { id: 'geneds', align: 'center', label: 'Geneds', minWidth: 240 },
];

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
                    {row.course_id}
                </StyledTableCell>
                <StyledTableCell>{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.credits}</StyledTableCell>
                <StyledTableCell>{row.geneds}</StyledTableCell>
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
                                {/* <TableBody>
                                    {row.details.map((detailsRow) => (
                                        <StyledTableRow key={detailsRow.crn}>
                                            <StyledTableCell component="th" scope="row">
                                                {detailsRow.crn}
                                            </StyledTableCell>
                                            <StyledTableCell>{detailsRow.hours}</StyledTableCell>
                                            <StyledTableCell align="right">{detailsRow.type}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody> */}
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

export default function CollapsibleTable({courses}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    console.log(courses);
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
                        {courses
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <Row key={row._id} row={row} />
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={courses.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
}
