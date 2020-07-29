import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  button: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      width: "800px",
      marginTop: "10px",
  },
  errorMessage: {
    color: '#FF0000',
    fontSize: '14px',
    marginBottom: '5px'
  }
}));


export default function CompleteOrderButton(props) {
  const classes = useStyles();
  
  const handleClick = () => props.completeReady ? props.handleClose() : props.setShowError(true)

  return (
    <div className={classes.button}>
      {props.showError ? <span className={classes.errorMessage}>You must complete each source before completing</span> : null}
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