import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '350px',
        },
    },
    button: {
        width: '150px',
        margin: theme.spacing(1),
    }
}));

export default function OrderNotes(props) {
    const classes = useStyles();
    const [note, setNote] = React.useState('');

    const handleChange = (event) => {
        setNote(event.target.value);
    };

    const handleClick = () => {
        // console.log({props.orderNotes})
    }



    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                label="Order Notes"
                fullWidth
                multiline
                rows={15}
                onChange={handleChange}
                placeholder="Type Notes Here"
                value={note}
                variant="outlined"
                maxLength={1000}
            />
            <Button 
                className={classes.button}
                variant="outlined"
                size="small"
                color={"primary"}
                onClick={handleClick}
                startIcon={<SaveIcon />}
                >
                Save Notes
            </Button>
        </form>
    );
}