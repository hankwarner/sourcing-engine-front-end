import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles(() => ({
    addressContainer : {
        marginBottom:20
    },
    upperCase : {
        textTransform:'uppercase'
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    row: {
        display: 'flex'
    },
}));

export default function OrderAddresses(props) {
    const classes = useStyles();
    const shipTo = props.shipTo

    return (
        <div className={classes.addressContainer}>
            <div className={classes.row}>
                <Grid container spacing={8}>              
                <Grid item>
                <h4 className={classes.upperCase}>Shipping Address Information</h4>
                <div className={classes.column}>
                    <span> {shipTo.name}</span>
                    <span>{shipTo.address1}</span>
                    <span>{shipTo.address2}</span>
                    <span>{shipTo.city}, {shipTo.state} {shipTo.zip}</span>
                    <span>({shipTo.shipInstructionsPhoneNumberAreaDialing}) {shipTo.shipInstructionsPhoneNumberDialNumber}</span>
                </div>
                </Grid>
                </Grid>
            </div>
        </div>
    )
}
