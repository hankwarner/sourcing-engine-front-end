import React from 'react'
import MockOrders from '../../MockOrders'
import { makeStyles } from '@material-ui/core/styles';
import SingleOrder from '../SingleOrder/SingleOrder'

import Axios from 'axios'

const useStyles = makeStyles(() => ({
    orderList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        marginBottom:40
    }
}));

Axios.get('https://fergusonsourcingengine.azurewebsites.net/api/manual-orders', {
    params: {
      code: 'mnYhnVWLaPFZk4WsoC1tCHqANea0XlCdisYa5roo0FZaC/jX6E72Cw=='
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });


export default function OrderList() {


    const classes = useStyles();

    const openOrders = MockOrders.filter(order => order.claimed === false)

    return (
        <div className={classes.orderList}>
            {openOrders.map(order => (
                <div>
                    <SingleOrder order={order} />
                </div>
            ))}            
        </div>
    )
}
