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
  },
  upperCase : {
    textTransform:'uppercase'
  },
});


export default function SourcingTable(props) {
  const classes = useStyles();

  const checkForComplete = () => {
    if(props.selectedItems.length === props.order.items.length){
      props.setCompleteReady(true)
    } else {
      props.setCompleteReady(false)}
    } 

  const sourcingTableBody = props.order.items.map((item, key) => {
    checkForComplete()
    const localIsChecked = props.selectedItems.includes(item.masterProdId);
	  const onChange = () => {
			if (props.selectedItems.includes(item.masterProdId)) {
				const copiedItems = [...props.selectedItems];
				const index = copiedItems.indexOf(item.masterProdId);
				copiedItems.splice(index, 1);
        props.setSelectedItems(copiedItems);
			} else {
        props.setSelectedItems(props.selectedItems.concat(item.masterProdId));
			}
    };

    return (  
      <TableRow key={key}>
        <TableCell className={classes.tablecell} scope="row">
            Product Id:<strong> {item.masterProdId}</strong><br />
            Description: <strong>{item.description}</strong><br />
            Ship From:  <strong>{item.shipFrom}</strong>
        </TableCell>
        <TableCell className={classes.tablecell} align="left">Qty: <strong>{item.quantity}</strong></TableCell>
        <TableCell className={classes.tablecell} align="left">Sourcing Message:<br /><strong>{item.sourcingMessage}</strong></TableCell>
        <TableCell className={classes.tablecell} align="right"><SourceCheckbox onChange={onChange} checked={localIsChecked} /></TableCell>
      </TableRow>
    )
  })
  
  

  return (
    <div className={classes.column}>
      <h3 className={classes.upperCase}>Items</h3>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableBody>
              {sourcingTableBody}
            </TableBody>
        </Table>
      </TableContainer>                
    </div>
  );
}