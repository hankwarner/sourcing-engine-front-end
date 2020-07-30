import React, { useEffect } from 'react'
import MockOrders from '../../MockOrders'
import { makeStyles } from '@material-ui/core/styles';
import SingleOrder from '../SingleOrder/SingleOrder'
// import getOrders from '../../server/endpoints'

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



export default function OrderList() {

    // useEffect(async () => {
    //     await fetch('https://fergusonsourcingengine.azurewebsites.net/api/manual-orders?code=mnYhnVWLaPFZk4WsoC1tCHqANea0XlCdisYa5roo0FZaC/jX6E72Cw==')
    //     .then(response => response.json())
    //     .then(json => console.log(json))
     
    //     // setData(result.data);
    //   });

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
