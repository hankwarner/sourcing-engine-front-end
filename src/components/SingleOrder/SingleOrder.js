import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/client';
import { OrderContext } from '../../context/order.context';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Container from '@material-ui/core/Container';

import SourcingTable from '../SourcingTable/SourcingTable';
import OrderDetails from '../OrderDetails/OrderDetails';
import CompleteOrderButton from '../CompleteOrderButton/CompleteOrderButton';
import OrderAddresses from '../OrderAddresses/OrderAddresses';
import SingleOrderTrigger from '../SingleOrderTrigger/SingleOrderTrigger';
import CancelOrderButton from '../CancelOrderButton/CancelOrderButton';

import CssBaseline from '@material-ui/core/CssBaseline';

import {
  CHECK_CLAIM,
  CLAIM_ORDER,
  RELEASE_ORDER,
  GET_ORDERS,
} from '../../queries/queries';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'fixed',
  },
  box: {
    width: 225,
    maxWidth: 225,
    overflow: 'hidden',
    height: 170,
    color: '#00446b',
    borderRight: '1px solid #00446b',
    marginRight: 20,
    paddingRight: 20,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    position: 'relative',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  marginForDetailBody: {
    marginTop: '84px',
  },
  textField: {
    padding: 0,
    border: 0,
    color: '#fff',
    fontSize: '40px',
    fontWeight: 700,
    background: 'transparent',
    marginTop: 16,
  },
  orderDialog: {
    marginBottom: 40,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '800px',
    marginBottom: '40px',
  },
  errorMessage: {
    display: 'flex',
    justifyContent: 'flex-end',
    color: '#FF0000',
    fontSize: '14px',
    marginBottom: '5px',
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='down' ref={ref} {...props} />;
});

export default function SingleOrder(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [completeReady, setCompleteReady] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState([]);
  const { setCurrentClaimedOrder } = useContext(OrderContext);
  const order = props.order;
  const orderNumber = order.atgOrderId;

  const client = useApolloClient();
  const queryVariable = { variables: { id: orderNumber } };
  const refetchQueries = [{ query: GET_ORDERS }];

  const [claimOrder] = useMutation(CLAIM_ORDER);
  const [releaseOrder] = useMutation(RELEASE_ORDER, {
    refetchQueries,
    awaitRefetchQueries: true,
  });

  const handleClickOpen = () => {
    claimOrder(queryVariable);
    setOpen(true);
    setCurrentClaimedOrder(orderNumber);
    // Pushing to history makes it so the back button won't take them out of the app
    const title = 'Order # ' + orderNumber;
    window.history.pushState('', title, '/');
  };

  const checkForClaim = () => {
    client
      .query({ query: CHECK_CLAIM, variables: queryVariable.variables })
      .then((data) => {
        if (!data.data.checkClaim.claimed) {
          handleClickOpen();
        } else {
          window.location.reload();
        }
      });
  };

  window.addEventListener('popstate', function (e) {
    e.preventDefault();
    handleClose();
  });

  const handleClose = () => {
    releaseOrder(queryVariable);
    setOpen(false);
    window.history.pushState('', 'List', '/');
  };

  return (
    <div>
      <SingleOrderTrigger order={props.order} handleClickOpen={checkForClaim} />
      <Dialog
        className={classes.orderDialog}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} position='fixed'>
          <Toolbar>
            <CssBaseline />
            <Container maxwidth='lg'>
              <Typography className={classes.title}>
                <input
                  type='text'
                  className={classes.textField}
                  value={order.atgOrderId}
                  readOnly={true}
                />
                <IconButton
                  edge='start'
                  color='inherit'
                  onClick={handleClose}
                  aria-label='close'
                >
                  x cancel
                </IconButton>
              </Typography>
            </Container>
          </Toolbar>
        </AppBar>
        <Container fixed className={classes.marginForDetailBody}>
          <div className={classes.column}>
            <OrderDetails order={props.order} />
            <OrderAddresses
              shipTo={props.order.shipping.shipTo}
              payment={props.order.paymentOnAccount.payment}
            />
            <SourcingTable
              order={props.order}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              setCompleteReady={setCompleteReady}
              setShowError={setShowError}
            />
            {showError ? (
              <span className={classes.errorMessage}>
                You must complete each source before completing
              </span>
            ) : null}
            <div className={classes.buttonContainer}>
              <div>
                <CancelOrderButton handleClose={handleClose} />
              </div>
              <div>
                <CompleteOrderButton
                  handleClose={handleClose}
                  completeReady={completeReady}
                  showError={showError}
                  setShowError={setShowError}
                  id={props.order.atgOrderId}
                />
              </div>
            </div>
          </div>
        </Container>
      </Dialog>
    </div>
  );
}
