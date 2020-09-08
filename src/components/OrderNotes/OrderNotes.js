import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { SAVE_NOTE } from '../../queries/queries';
import { useMutation } from '@apollo/client';

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
    const noteData = props.OrderNotes === null ? '' : props.orderNotes;
    const [note, setNote] = React.useState(noteData);
    const queryVariable = { variables: { id: props.id, note: note }};
    const [saveNote] = useMutation(SAVE_NOTE)



    const handleChange = (event) => {
        setNote(event.target.value);
    };

    const handleClick = () => {
        saveNote(queryVariable);
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