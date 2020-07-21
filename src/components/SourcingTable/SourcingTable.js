import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SourceCheckbox from '../SourceCheckbox/SourceCheckbox'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  row: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      width: '100%'
  }
});

export default function SourcingTable(props) {
  const classes = useStyles();

  return (
    <div className={classes.column}>
        <h3>Sourcing</h3>
        {props.sources.map(source => (
            <div className={classes.column}>
                <div className={classes.row}>
                    <div className={classes.column}>
                        <span>Source from ID: {source.sourceId}</span>
                        <span>Source From: {source.name}</span>
                    </div>

                    <div>
                        <SourceCheckbox />
                    </div>
                </div>

                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                    {source.items.map((item) => (
                        <TableRow key={item.itemId}>
                        <TableCell component="th" scope="row">
                            NPM: {item.itemId}
                        </TableCell>
                        <TableCell align="right">QTY: {item.qty}</TableCell>
                        <TableCell align="right">Each Price: {item.eachprice}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>

                </TableContainer>

                <hr width="100%"/>
                
            </div>
        ))}
    </div>
  );
}