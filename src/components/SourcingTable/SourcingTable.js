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
    minWidth: 800,
    verticalAlign:'top'
  },
  tablecell: {
    verticalAlign:'top'
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
  const order = props.order
  return (
    <div className={classes.column}>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableBody>
                    {order.items.map((item) => (
                        <TableRow key={item.masterProdId}>
                        <TableCell className={classes.tablecell} scope="row">
                        <strong>MPID:</strong>{item.masterProdId}<br />
                        <strong>Description:</strong>{item.description}<br />
                        <strong>Ship From:</strong> {item.shipFrom}
                        </TableCell>
                        <TableCell className={classes.tablecell} align="left"><strong>Qty:</strong> {item.quantity}</TableCell>
                        <TableCell className={classes.tablecell} align="left"><strong>Sourcing Message:</strong><br />{item.sourcingMessage}</TableCell>
                        <TableCell className={classes.tablecell} align="right"><SourceCheckbox /></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>

                </TableContainer>                
    </div>
  );
}