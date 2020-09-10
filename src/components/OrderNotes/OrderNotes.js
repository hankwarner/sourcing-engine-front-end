import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CachedIcon from '@material-ui/icons/Cached';
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
    const noteData = props.rderNotes === null ? '' : props.orderNotes;

    const classes = useStyles();
    const [note, setNote] = React.useState(noteData);
    const [savedNote, setSavedNote] = React.useState(noteData)
    const [saveNote, { loading }] = useMutation(SAVE_NOTE)

    const queryVariable = { variables: { id: props.id, note: note }};

    const handleChange = (event) => {
        setNote(event.target.value);
    };

    const handleClick = () => {
        saveNote(queryVariable);
        setSavedNote(note)
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
                inputProps={{maxLength: 1000}}
            />
            <Button 
                className={classes.button}
                variant="outlined"
                size="small"
                color={savedNote === note ? "default" : "primary"}
                onClick={savedNote === note ? null : handleClick}
                startIcon={loading ? <CachedIcon /> : <SaveIcon />}
                >
                {loading ? "Saving Note" : (savedNote === note ? 'Note Saved' : 'Save Notes')}
            </Button>
        </form>
    );
}