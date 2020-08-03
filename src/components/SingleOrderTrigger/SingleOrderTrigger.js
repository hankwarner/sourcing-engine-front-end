import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(() => ({
    triggerStyle: {
        width: 800,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: 10,
        textTransform:"none"
    },
    box:{
        width: 225,
        maxWidth:225,
        overflow:'hidden',
        height: 200,
        color:"#00446b",
        borderRight:"1px solid #00446b",
        marginRight:20,
        paddingRight:20
    },
    table: {
        borderBottom:0
    },
    tableDataCont: {
        marginBottom:10
    },
    tableLabel: {
        textTransform:'uppercase',
        fontWeight:700
    }
}));


export default function SingleOrderTrigger(props) {
    const classes = useStyles();
    const order = props.order

    return (
        <Button className={classes.triggerStyle} variant="outlined" color="primary" onClick={props.handleClickOpen}>
            
            <Box className={classes.box}>
                <h2>Web Order #<br /> {order.atgOrderId}</h2>
            </Box>
            <TableContainer >
                <Table  aria-label="simple table">
                    <TableBody >
                        <TableRow >
                        <TableCell className={classes.table}>
                            <div className={classes.tableDataCont}>
                            <span className={classes.tableLabel}>Customer Name:</span><br />{order.customerName}<br />
                            </div>
                            <div className={classes.tableDataCont}>
                            <span className={classes.tableLabel}>Customer Account ID:</span><br />{order.custAccountId}
                            </div>
                            <div className={classes.tableDataCont}>
                            <span className={classes.tableLabel}>Customer ID:</span><br />{order.customerId}
                            </div>
                        </TableCell>
                        <TableCell className={classes.table} align="right">
                            <div className={classes.tableDataCont}>
                            <span className={classes.tableLabel}>Submitted:</span><br />{order.orderSubmitDate}
                            </div>
                            <div className={classes.tableDataCont}>
                            <span className={classes.tableLabel}>Req Delivery:</span><br />{order.orderRequiredDate}
                            </div>
                            <div className={classes.tableDataCont}>
                            <span className={classes.tableLabel}>Ship From:</span><br />{order.shipFrom}
                            </div>                     
                        </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer> 
        </Button>
    )
}
