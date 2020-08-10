import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import React from 'react';


const api = axios.create({
  baseURL: `http://localhost:9869/`
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
  const classes = useStyles();

  async function submit(e) {
    e.preventDefault();
    const product = document.getElementById('product').value;
    const amount = document.getElementById('amount').value;
    const user = document.getElementById('user').value;

    if (!product || !amount || !user || !product.trim() || !user.trim() || amount <= 0) {
      alert('Property is not valid!');
      return;
    }

    api.post("/order", { product: product, amount: amount, user: user })
    .then(res => {
      alert('Work submitted');
    })
    .catch(error => {
      console.log("Error");
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="product"
                // variant="outlined"
                required
                fullWidth
                id="product"
                label="Product"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="amount"
                // variant="outlined"
                required
                type="number"
                fullWidth
                id="amount"
                label="Amount"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="user"
                // variant="outlined"
                required
                fullWidth
                id="user"
                label="User"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async (e) =>  await submit(e)}
          >
            Submit
          </Button>
        </form>
      </div>
    </Container>
  );
}
