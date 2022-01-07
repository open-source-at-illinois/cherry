import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import CherryService from '../services/CherryService';
const columns = [
  { id: 'Subject', label: 'Subject', minWidth: 170 },
  { id: 'Number', label: 'Number', minWidth: 100 },
  { id: 'Course Title', label: 'Course Title', minWidth: 170 },
  { id: 'GPA', label: 'GPA', minWidth: 170 },
];

// const rows = [
//     {
//             "Year": 2018,
//             "Term": "Winter",
//             "YearTerm": "2018-wi",
//             "Subject": "ACE",
//             "Number": 240,
//             "Course Title": "Personal Financial Planning",
//             "Sched Type": "ONL",
//             "A+": 9,
//             "A": 12,
//             "A-": 6,
//             "B+": 6,
//             "B": 6,
//             "B-": 0,
//             "C+": 2,
//             "C": 3,
//             "C-": 1,
//             "D+": 0,
//             "D": 0,
//             "D-": 0,
//             "F": 0,
//             "W": 0,
//             "Primary Instructor": "Stoddard, Paul B"
//         },
//         {
//             "Year": 2018,
//             "Term": "Winter",
//             "YearTerm": "2018-wi",
//             "Subject": "ART",
//             "Number": 100,
//             "Course Title": "Understanding Visual Culture",
//             "Sched Type": "ONL",
//             "A+": 4,
//             "A": 8,
//             "A-": 3,
//             "B+": 5,
//             "B": 4,
//             "B-": 2,
//             "C+": 2,
//             "C": 1,
//             "C-": 0,
//             "D+": 0,
//             "D": 1,
//             "D-": 0,
//             "F": 1,
//             "W": 0,
//             "Primary Instructor": "Burns, Jennifer"
//         },
//         {
//             "Year": 2018,
//             "Term": "Winter",
//             "YearTerm": "2018-wi",
//             "Subject": "ASTR",
//             "Number": 330,
//             "Course Title": "Extraterrestrial Life",
//             "Sched Type": "ONL",
//             "A+": 3,
//             "A": 12,
//             "A-": 1,
//             "B+": 1,
//             "B": 2,
//             "B-": 2,
//             "C+": 0,
//             "C": 0,
//             "C-": 0,
//             "D+": 0,
//             "D": 0,
//             "D-": 0,
//             "F": 0,
//             "W": 0,
//             "Primary Instructor": "Looney, Leslie W"
//         }
//     ]

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    CherryService.getAllCourses({ page: 1 }).then(setRows);
    console.log(rows);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
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
    </Paper>
  );
}
