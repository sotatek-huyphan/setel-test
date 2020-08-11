import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';


const api = axios.create({
  baseURL: process.env.REACT_APP_API
})

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function OrderDetail(props) {
  const id = props.location.state.id;
  const classes = useStyles();
  let [state, setState] = useState({
    id: '',
    product: '',
    amount: '',
    user: '',
    state: ''
  });
  let [redirect, setRedirect] = useState({
    redirectToList: false,
  });

  useEffect(() => {

    api.get(`/order/${id}`)
      .then(res => {
        const data = res.data;
        setState({
          id: data._id,
          product: data.product,
          amount: data.amount,
          user: data.user,
          state: data.state
        })
      })
      .catch(error => {
        console.log("Error")
      })
  }, [])

  async function submit(e) {
    e.preventDefault();
    api.patch(`/order/${id}`, {})
      .then(res => {
        alert('Work submitted');
        redirectToList();
      })
      .catch(error => {
        const errorResponse = error.response;
        if (errorResponse.status == 422) {
          alert('Invalid state transition');
        } else {
          alert('Internal error');
        }
      })
  }

  const redirectToList = () => {
    setRedirect({ redirectToList: true });
  }

  const renderRedirect = () => {
    if (redirect.redirectToList) {
      return <Redirect to={{
        pathname: '',
      }} />
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {renderRedirect()}
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                disabled
                name="product"
                value={state.product}
                required
                fullWidth
                id="product"
                label="Product"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                name="amount"
                value={state.amount}
                required
                type="number"
                fullWidth
                id="amount"
                label="Amount"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                name="user"
                value={state.user}
                required
                fullWidth
                id="user"
                label="User"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled
                name="status"
                value={state.state}
                required
                fullWidth
                id="status"
                label="Status"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async (e) => await submit(e)}
          >
            Cancel order
          </Button>

          <Button
            fullWidth
            onClick={async (e) => await redirectToList(e)}
          >
            Go back
          </Button>
        </form>
      </div>
    </Container>
  );
}
