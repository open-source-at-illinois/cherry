import * as React from 'react';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import CherryService from '../services/CherryService';
import * as Constants from '../constants';

const columns = [
  { id: 'Course Number', label: 'Course Number' },
  { id: 'Course Name', label: 'Course Title'},
  { id: 'GPA', label: 'GPA'},
];

const CourseTable = ({preferences}) => {
  // TODO: Update this via API Call
  const [rowsCount, setRowsCount] = React.useState(2000);
  const [page, setPage] = React.useState(0);

  // page number => array courses of that page
  const [rows, setRows] = React.useState({ 1: [] });

  useEffect(() => {
    CherryService.getAllCourses({ page: 0, options: preferences }).then(response => {
      setRows({ 1: response.courses });
      setPage(0);
      // console.log(response.courses);
      setRowsCount(response.total ? response.total : 0);
    });
  }, [preferences]);

  const handleChangePage = async (event, newPage) => {
    newPage = newPage + 1;
    if (!rows[newPage]) {
      setRows({ ...rows, [newPage]: [] })
      await CherryService.getAllCourses({ page: newPage, options: preferences })
        .then(response => setRows({ ...rows, [newPage]: response.courses }));
    }
    setPage(newPage - 1);
  };

  const courseExplorerURL = (row) => {
    const value = row['Course Name'];
    const subject = row['Course Number'].substr(0, row['Course Number'].indexOf(" "));
    const number = row['Course Number'].substr(row['Course Number'].indexOf(" ") + 1);
    return (
      <a href={`${Constants.COURSEEXPLORERURL}${subject}/${number}`} target="_blank" rel="noreferrer noopener">{value}</a>
    )
  }

  return (
    <Grid sx={{ width: '1.0', overflow: 'hidden'}}>
      <TableContainer sx={{ maxHeight: '90%' }}>
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
            {rows[page + 1] ?
              rows[page + 1]
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : column.id === 'Course Name' ? courseExplorerURL(row) : value}
                          </TableCell>
                        );
                      })
                      }
                    </TableRow>
                  );
                }) : <TableRow></TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={rowsCount}
        rowsPerPage={100}
        page={page}
        onPageChange={handleChangePage}
      />
    </Grid>
  );
}

export default CourseTable;