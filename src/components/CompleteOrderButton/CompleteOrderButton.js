import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  button: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: "800px",
      marginTop: "10px",
  },
}));


export default function CompleteOrderButton(props) {
  const classes = useStyles();
  
  const handleClick = () => props.completeReady ? props.handleClose() : undefined

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