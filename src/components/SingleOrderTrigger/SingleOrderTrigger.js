import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

    return (
        <Button variant="outlined" color="primary" onClick={props.handleClickOpen}>
            Open Order
        </Button>
    )
}
