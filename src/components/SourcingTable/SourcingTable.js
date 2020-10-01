import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SourceCheckbox from '../SourceCheckbox/SourceCheckbox';

const useStyles = makeStyles({
  table: {
    minWidth: 800,
    verticalAlign: 'top',
  },
  tablecell: {
    verticalAlign: 'top',
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
    width: '100%',
    fontSize: '1.5em',
  },
  upperCase: {
    textTransform: 'uppercase',
  },
  sourceContainer: {
    marginBottom: '15px',
    paddingBottom: '15px',
  },
  noWrap: {
    display: 'flex',
    flexWrap: 'noWrap'
  },
  description: {
    width: '55%'
  }
});

export default function SourcingTable(props) {
  const classes = useStyles();

  useEffect(() => {
    checkForComplete()
  })

  const checkForComplete = () => {
    if (props.selectedItems.length === props.order.sourcing.length) {
      props.setCompleteReady(true);
      props.setShowError(false);
    } else {
      props.setCompleteReady(false);
    }
  };

  const sourcingTableBody = props.order.sourcing.map((source, key) => {
    const localIsChecked = props.selectedItems.includes(key);

    const onChange = () => {
      if (props.selectedItems.includes(key)) {
        const copiedItems = [...props.selectedItems];
        const index = copiedItems.indexOf(key);
        copiedItems.splice(index, 1);
        props.setSelectedItems(copiedItems);
      } else {
        props.setSelectedItems(props.selectedItems.concat(key));
      }
    };

    const vendorMessage = (item) => {
      if (item.sourcingGuide === 'Vendor Direct') {
        return (
          <div>
            <strong>Vendor:</strong> {item.vendor}
          </div>
        );
      }
    };

    return (
      <div className={classes.sourceContainer} key={key}>
        <div className={classes.row}>
          <span className={classes.upperCase}>
            <strong>Source From ID:</strong>&nbsp;{source.shipFrom}
            <br />
            <strong>Ship From Logon:</strong>&nbsp;{source.shipFromLogon}
          </span>
          <SourceCheckbox onChange={onChange} checked={localIsChecked} />
        </div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='simple table'>
            <TableBody>
              {source.items.map((item, key) => {   
                const unitPrice = parseFloat(item.unitPrice).toFixed(2)
                const extendedPrice = parseFloat(item.extendedPrice).toFixed(2)
                const unitPriceCode = item.unitPriceCode

                return (
                  <TableRow key={key}>
                    <TableCell className={`${classes.tablecell} ${classes.description}`} scope='row'>
                      <div>
                        <strong>MPID:</strong> {item.masterProdId}
                      </div>
                      <div>
                        <strong>Description:</strong> {item.description}
                      </div>
                      {vendorMessage(item)}
                    </TableCell>
                    <TableCell className={classes.tablecell} align='left'>
                      <div className={classes.column}>
                        <span className={classes.noWrap}><strong>Unit Price: </strong> ${unitPrice} ({unitPriceCode.toUpperCase()})</span>
                        <span className={classes.noWrap}><strong>Qty: </strong> {item.quantity}</span>
                        <span className={classes.noWrap}><strong>Total: </strong> ${extendedPrice}</span>
                      </div>
                    </TableCell>
                    <TableCell className={classes.tablecell} align='left'>
                      <strong>Sourcing Message:</strong>
                      <br />
                      {item.sourcingMessage}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  });

  return (
    <>
      <div className={classes.column}>
        <h3 className={classes.upperCase}>Sourcing</h3>
        {sourcingTableBody}
      </div>
    </>
  );
}
