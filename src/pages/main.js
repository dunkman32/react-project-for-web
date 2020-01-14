import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import ReactLoading from 'react-loading';
import { BrowserView, MobileView, } from 'react-device-detect';
import bgImage from '../static/images/bg-image.png';
import Footer from '../components/footer';
import Header from '../components/header';
import StickyHeadTable from '../components/table';
import { read, update, write } from '../service';
import MobileViewComponent from '../components/mobile-view';
import MySnackbarContentWrapper from '../components/snackbar';
import startTimer from '../utils/counter';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    background: `url(${bgImage})`,
    backgroundRepeat: 'repeat',
    backgroundSize: 'auto',
    width: '100%',
    minHeight: '100vh',
    fontFamily: '\'Lobster\', cursive',
  },
  fixed: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    padding: '15px 0',
    color: '#000'
  },
  nonFixed: {
    padding: '15px 0',
    color: '#000',
    width: '100%',
  },
  icon: {
    color: '#8e24aa',
    margin: '0 2.5px'
  },
  grid: {
    width: '100% !important'
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const Main = props => {
  const [rows, setRows] = useState(null);
  const [shouldUpdate, setUpdate] = useState(false);
  const [start, setStart] = useState(false);
  const [snackbar, setOpen] = React.useState({ open: false, variant: 'success', message: '' });

  const handleClick = (variant, message) => {
    setOpen({ open: true, variant, message });
  };

  const handleClose = () => {
    setOpen({ open: false, variant: 'success', message: '' });
  };

  const Example = ({ type, color, start }) => start &&
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'rgba(37,37,37,0.5)',
      textAlign: 'center',
      zIndex: '9999'
    }}>
      <Grid style={{ marginTop: '25vh' }} container justify="center">
        <Grid item>
          <ReactLoading type={type} color={color} height={300} width={150}/>
        </Grid>
      </Grid>
    </div>;

  useEffect(() => {
    startTimer(3 * 60)
    setStart(true);
    read().then(res => {
      let elements = [];
      if (res.data && res.data.Items) {
        elements = res.data.Items.map(element => createData(element));
      }
      if (elements.length) setRows(elements);
      setStart(false);
    }).catch(() => {
      setStart(false);
      handleClick('error', 'Server error');
    });
  }, [shouldUpdate]);

  const like = product => {
    update(product).then(res => setUpdate(!shouldUpdate)).catch(e => {
      handleClick('error', 'Server error');
    });
  };

  const add = productObject => {
    write(productObject).then(res => {
      setUpdate(!shouldUpdate);
      handleClick('success', 'დაემატა!');
    }).catch(e => {
      handleClick('error', 'ვერ დაემატა!');
    });
  };

  const createData = data => {
    console.log(data);
    const { id, amount, rating, name, actions } = data;
    return { main: { id, name }, info: { amount, rating }, actions };
  };
  const classes = useStyles();

  return (rows && rows.length) && (
    <div className={classes.root}>
      <BrowserView>
        <Grid className={classes.grid} container spacing={3}>
          <Grid className={classes.grid} style={{ minHeight: 75 }} item xs={12}>
            <Header main add={add} handleClick={handleClick}/>
          </Grid>
          <Grid className={classes.grid} item xs={12}>
            <StickyHeadTable rows={rows} like={like} add={add}/>
          </Grid>
          <Grid className={classes.grid} item xs={12}>
            <Footer/>
          </Grid>
        </Grid>

      </BrowserView>
      <MobileView>
        <div style={{ height: 'max-content' }}>
          <Header main notFixed add={add} handleClick={handleClick}/>
        </div>
        <MobileViewComponent rows={rows} like={like} add={add}/>
        <Footer/>
      </MobileView>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }} open={snackbar.open} autoHideDuration={6000} onClose={handleClose}
      >
        <MySnackbarContentWrapper onClose={handleClose} variant={snackbar.variant} message={snackbar.message}/>
      </Snackbar>
      <Example start={start} type={'spinningBubbles'} color={'rgb(142, 36, 170)'}/>
    </div>
  );
};

export default Main;
