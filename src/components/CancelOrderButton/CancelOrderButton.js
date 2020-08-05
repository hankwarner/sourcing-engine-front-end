import React from 'react'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    button: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    }
}));

export default function CancelOrderButton(props) {
    const classes = useStyles();

    return (
        <div classes={classes.button}>
            <Button
                variant="contained"
                color="default"
                onClick={props.handleClose}
            >
                Cancel
            </Button>
        </div>
    )
}
