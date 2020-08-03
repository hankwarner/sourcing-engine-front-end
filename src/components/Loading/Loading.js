import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import sourcingAppLoader from '../../svg/sourcingAppLoader.svg'

const useStyles = makeStyles(() => ({
    loading: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '150px'
    }
  }));

export default function Loading() {
    const classes = useStyles();

    return (
        <div className={classes.loading}>
            <img src={sourcingAppLoader} alt="loading" />
        </div>
    )
}
