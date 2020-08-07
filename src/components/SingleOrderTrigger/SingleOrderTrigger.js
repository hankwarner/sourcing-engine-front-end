import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
    triggerStyle: {
        backgroundColor:"#00446b",
        color:'#fff',
        textTransform:'uppercase',
        fontWeight:700,
        lineHeight:1.2
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
        <Button className={classes.triggerStyle} variant="outlined" color="primary" onClick={props.handleClickOpen}>
            Open Order
        </Button>
    )
}
