import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { useMutation } from '@apollo/react-hooks';
import { COMPLETE_ORDER, GET_ORDERS } from '../../queries/queries';


const useStyles = makeStyles(() => ({
  button: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginLeft: '15px'
  }
}));

export default function CompleteOrderButton(props) {
  const classes = useStyles();
  const refetchQueries = [{ query: GET_ORDERS }];
  const queryVariable = { variables: { id: props.id }};
  const [completeOrder] = useMutation(COMPLETE_ORDER, {
      refetchQueries,
      awaitRefetchQueries: true
    }
  )

  const handleComplete = () => {
    completeOrder(queryVariable)
    .then(() => props.handleClose());
  }
  
  const handleClick = () => props.completeReady ? handleComplete() : props.setShowError(true)

  return (
    <div className={classes.button}>
      <Button 
        variant="contained"
        color={props.completeReady ? "primary" : "secondary"}
        onClick={handleClick}
        >
        Complete Order
      </Button>
    </div>
  );
}