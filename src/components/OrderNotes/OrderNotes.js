import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '350px'
        },
    }
}));

export default function OrderNotes() {
    const classes = useStyles();
    const [note, setNote] = React.useState('Controlled');

    const handleChange = (event) => {
        setNote(event.target.value);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">
                <TextField
                    label="Order Notes"
                    fullWidth
                    multiline
                    rows={15}
                    onChange={handleChange}
                    value={note}
                    variant="outlined"
                />
        </form>
    );
}