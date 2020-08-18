import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import axios from 'axios'

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

  const handleComplete = () => {
    const headers = {
      'Content-Type': 'charset=utf-8',
      'code': 'qxWYWsbaMWVFhCaGDUTlaH0Hjwg2fRKkDwTTySVg1SVfjSjbw07gQQ=='
    }
    async function completeOrder() {
      await axios({
        params: {
          code: 'qxWYWsbaMWVFhCaGDUTlaH0Hjwg2fRKkDwTTySVg1SVfjSjbw07gQQ=='
        },
        method:'post',
        url: `https://sourcingenginedashboard.azurewebsites.net/api/order/complete/${props.id}`,
        headers: headers
      }).then(() => props.handleClose());
    }
    completeOrder();    
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