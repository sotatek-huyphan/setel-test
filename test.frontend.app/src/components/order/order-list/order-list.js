import Grid from '@material-ui/core/Grid';
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
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import MaterialTable from "material-table";
import React, { forwardRef, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),

  // Add: props => (<AddBox {...props} />),
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
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const api = axios.create({
  baseURL: `http://localhost:9869/`
})

const OrderList = () => {

  var columns = [
    { title: "_id", field: "_id", hidden: true },
    { title: "product", field: "product" },
    { title: "amount", field: "amount" },
    { title: "state", field: "state" },
    { title: "user", field: "user" }
  ]
  const [data, setData] = useState([]);
  let [redirect, setRedirect] = useState({
    redirectToDetail: false,
    redirectToCreate: false,
  });
  const [currentItem, setCurrentItem] = useState('');

  useEffect(() => {
    api.get("/orders")
      .then(res => {
        setData(res.data)
      })
      .catch(error => {
        console.log("Error")
      })
  }, [])

  const renderRedirect = () => {
    if (redirect.redirectToDetail) {
      return <Redirect to={{
        pathname: '/detail',
        state: { id: currentItem }
      }} />
    }
    if (redirect.redirectToCreate) {
      return <Redirect to={{
        pathname: '/create'
      }} />
    }
  }

  const createItem = () => {
    setRedirect({
      redirectToDetail: false,
      redirectToCreate: true
    });
  }

  const editItem = (id) => {
    setCurrentItem(id);
    setRedirect({
      redirectToDetail: true,
      redirectToCreate: false
    });
  }

  return (
    <div className="App">
      {renderRedirect()}
      <Grid container spacing={1}>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>

          <MaterialTable
            title="Order list"
            columns={columns}
            data={data}
            icons={tableIcons}
            actions={[
              {
                icon: tableIcons.Add,
                tooltip: 'Create order',
                isFreeAction: true,
                onClick: (event) => createItem()
              },
              {
                icon: tableIcons.DetailPanel,
                tooltip: 'Edit order',
                onClick: (event, rowData) => editItem(rowData._id)
              },
              // {
              //   icon: tableIcons.Delete,
              //   tooltip: 'Cancel order',
              //   onClick: (event, rowData) => alert('You want to delete ' + rowData._id)
              // }
            ]}
          />
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </div>
  );
}


export default OrderList;
