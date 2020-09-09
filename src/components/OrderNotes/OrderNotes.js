import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { SAVE_NOTE } from '../../queries/queries';
import { useMutation } from '@apollo/client';
import Loading from '../Loading/Loading';
import sourcingAppLoader from '../../svg/sourcingAppLoader.svg'


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
    const noteData = props.rderNotes === null ? '' : props.orderNotes;
    const [note, setNote] = React.useState(noteData);
    const [savedNote, setSavedNote] = React.useState(noteData)
    const queryVariable = { variables: { id: props.id, note: note }};
    const [saveNote, { loading }] = useMutation(SAVE_NOTE)

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
                startIcon={loading ? null : <SaveIcon />}
                >
                {loading ? "Saving Note" : (savedNote === note ? 'Note Saved' : 'Save Notes')}
            </Button>
        </form>
    );
}