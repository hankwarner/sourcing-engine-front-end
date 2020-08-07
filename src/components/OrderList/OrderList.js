import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import SingleOrder from '../SingleOrder/SingleOrder'
import MaterialTable from 'material-table'

import { forwardRef } from 'react';


import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Save from '@material-ui/icons/Save';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),    
    Save: forwardRef((props, ref) => <Save {...props} ref={ref} />)
  };


const useStyles = makeStyles(() => ({
    orderList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30,
        marginBottom:40
    },
    tableHeaderCell:{
      borderBottom:'2px solid #000',
      paddingTop:10
    }
}));




export default function OrderList(props) {

    const classes = useStyles();

    const openOrders = props.orderData.filter(order => order.claimed === false && order.orderComplete === false)

    return (
        <>
          <div style={{ maxWidth: '100%', padding:10 }}>
            <MaterialTable
              openOrders={openOrders}
              icons={tableIcons}

              columns={[
                { title: 'Web Order #', field: 'atgOrderId', filtering: false,
                  cellStyle: {
                    color: '#1c88c7',
                    fontWeight:'700'
                  } 
                },
                { title: 'Customer Name', field: 'customerName', filtering: false, search: false },
                { title: 'Cust Acct ID', field: 'custAccountId', filtering: false, search: false },
                { title: 'Cust ID', field: 'customerId', filtering: false, search: false },
                { title: 'Date', field: 'orderSubmitDate', filtering: false, search: false },
                { title: 'Req Del Date', field: 'orderRequiredDate', filtering: false },
                { title: 'Sell Warehouse', field: 'sellWhse', filtering: false, search: false }
              ]}
              localization={{            
                header: {
                    actions: ''
                },
                pagination: {

                }
              }}
              style={{ padding:10 }}
              options={{
                sorting: false,
                headerStyle: {
                  borderBottom: '1px solid black',
                  fontWeight:'700'
                },
                pageSize:6,
                pageSizeOptions:[6,12,24],
                showTitle:false,
                cellStyle: {
                  textAlign:'center'
                },
                showDetail: false
              }}
              actions={[
                {
                }
              ]}
              data={openOrders}
              title="Sourcing Data"
              components={{ 
                Action: thisData => (
                  <SingleOrder order={thisData.data} fetchOrders={props.fetchOrders} />
                ),    
                Header: () => (
                      <thead>
                          <th className={classes.tableHeaderCell} tabIndex='-1'>&nbsp;</th>
                          <th className={classes.tableHeaderCell} tabIndex='-1'>Web Order #</th>
                          <th className={classes.tableHeaderCell} tabIndex='-1'>Customer<br />Name</th>
                          <th className={classes.tableHeaderCell} tabIndex='-1'>Customer<br />Account</th>
                          <th className={classes.tableHeaderCell} tabIndex='-1'>Customer ID</th>
                          <th className={classes.tableHeaderCell} tabIndex='-1'>Date<br />Submitted</th>
                          <th className={classes.tableHeaderCell} tabIndex='-1'>Requested<br />Delivery</th>
                          <th className={classes.tableHeaderCell} tabIndex='-1'>Sell<br />Warehouse ID</th>
                      </thead>
                )
              }
            }
          />
        </div>
      </>
    )
}
