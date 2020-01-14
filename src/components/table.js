import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { ThumbDown, ThumbUp, OpenInNew } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {Link} from 'react-router-dom';

const columns = [
  { id: 'main', label: 'სახელი', minWidth: 150 },
  {
    id: 'info',
    label: 'ინფორმაცია',
    minWidth: 100,
  },
  {
    id: 'actions',
    label: 'ქმედება',
    minWidth: 50,
  },
];

const useStyles = makeStyles({
  main: {
    flexGrow: 1,
  },
  root: {
    position: 'relative',
    width: '90%',
    margin: 'auto'
  },
  tableWrapper: {
    maxHeight: 'max-content',
    overflow: 'auto',
  }
});

const StickyHeadTable = (props) => {
  const classes = useStyles();
  const { rows, like } = props;
  const [page, setPage] = React.useState(0);

  const likeOrDislike = (data, isLikeAction) => {
    if (isLikeAction) {
      like({ id: data.main.id, rating: 1 });
    } else {
      like({ id: data.main.id, rating: -1 });
    }
  };

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderCells = (id, row, value) => {
    console.log('id = ', id, 'row = ',row,'value = ', value);
    if (id === 'actions')
      return <TableCell key={id}>
        <Paper style={{ maxWidth: 'max-content', padding: '20px 15px' }}>
          <Tooltip title="კაია"  placement={'top'}>
            <IconButton aria-label="filter list" onClick={likeOrDislike.bind(this, row, true)}>
              <ThumbUp style={{ cursor: 'pointer', color: 'green' }}/>
            </IconButton>
          </Tooltip>
          {/*<Tooltip title="გადასვლა" placement={'top'}>*/}
          {/*  <Link to={`/single/${row.main.id}`}>*/}
          {/*    <IconButton aria-label="filter list">*/}
          {/*      <OpenInNew style={{ cursor: 'pointer', color: '#d4af37' }}/>*/}
          {/*    </IconButton>*/}
          {/*  </Link>*/}
          {/*</Tooltip>*/}
          <Tooltip title="ცუდია" placement={'top'}>
            <IconButton aria-label="filter list" onClick={likeOrDislike.bind(this, row, false)}>
              <ThumbDown style={{ cursor: 'pointer', color: 'red' }}/>
            </IconButton>
          </Tooltip>
        </Paper>
      </TableCell>;
    if (id === 'main') {
      return <TableCell key={value.id}>
        <Paper style={{ maxWidth: 'max-content', padding: '20px 15px' }}>
          <>
            <p style={{ display: 'inline-block', margin: '0' }}>{'სახელი - '}</p>{' '}
            <p style={{
              fontWeight: 'bold',
              color: 'rgb(142, 36, 170)',
              display: 'inline-block',
              margin: '0'
            }}>{row.main.name}</p>
          </>
          <hr/>
          <>
            <p style={{ display: 'inline-block', margin: '0' }}>{'კოდი - '}</p>{' '}
            <p style={{
              fontWeight: 'bold',
              color: 'rgb(142, 36, 170)',
              display: 'inline-block',
              margin: '0'
            }}>{row.main.id}</p>
          </>
        </Paper>
      </TableCell>;
    }
    if (id === 'info') {
      return <TableCell key={id}>
        <Paper style={{ maxWidth: 'max-content', padding: '10px 15px' }}>
          <div>
            <p style={{ display: 'inline-block', margin: '0' }}>{'ფასი: '}</p>{' '}
            <p style={{
              fontWeight: 'bold',
              color: 'rgb(142, 36, 170)',
              display: 'inline-block',
              margin: '0'
            }}>{row.info.amount}</p>
          </div>
          <hr/>
          <div>
            <p style={{ display: 'inline-block', margin: '0' }}>{'პროდუქტის რეიტინგი: '}</p>{' '}
            <p style={{
              fontWeight: 'bold',
              color: 'rgb(142, 36, 170)',
              display: 'inline-block',
              margin: '0'
            }}>{row.info.rating}</p>
          </div>
        </Paper>
      </TableCell>;
    }
    return <TableCell key={value.id}>
      {value.id}
    </TableCell>;

  };

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.main.id}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return renderCells(column.id, row, value);
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[1, 10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default StickyHeadTable;
