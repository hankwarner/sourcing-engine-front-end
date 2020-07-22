import React from 'react'
//import MockOrders from '../../MockOrders'
import MockOrders2 from '../../MockOrders_2'
import { makeStyles } from '@material-ui/core/styles';
import SingleOrder from '../SingleOrder/SingleOrder'

const useStyles = makeStyles(() => ({
    orderList: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 30
    }
  }));


export default function OrderList() {
    const classes = useStyles();

    return (
        <div className={classes.orderList}>
            {MockOrders2.map(order => (
                <div>
                    <SingleOrder order={order} />
                </div>
            ))}            
        </div>
    )
}
