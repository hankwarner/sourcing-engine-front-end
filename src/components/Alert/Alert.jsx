import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { OrderContext } from '../../context/order.context';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(10),
    },
  },
}));

export const Alert = () => {
  const classes = useStyles();
  const { orderAlertOpen, setOrderAlertOpen } = useContext(OrderContext);

  const handleClose = () => {
    setOrderAlertOpen(false);
  };

  const DemoButton = ({ show }) => {
    const handleClick = () => {
      setOrderAlertOpen(true);
    };
    return show ? (
      <Button variant='outlined' onClick={handleClick}>
        Trigger alert
      </Button>
    ) : (
      <div>{/* empty div so alert positions correctly */}</div>
    );
  };

  return (
    <div className={classes.root}>
      {/* Set show to true to display button to manually trigger alert */}
      <DemoButton show={false} />
      <Snackbar
        open={orderAlertOpen}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MuiAlert
          elevation={6}
          variant='filled'
          onClose={handleClose}
          severity='info'
        >
          Order already claimed. Choose another.
        </MuiAlert>
      </Snackbar>
    </div>
  );
};
