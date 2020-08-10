import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import OrderList from '../components/order/order-list';
import OrderDetail from '../components/order/order-detail';
import OrderCreate from '../components/order/order-create';

const HomeRouter = (props) => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={OrderList} />
      <Route exact path='/create' component={OrderCreate} />
      <Route exact path='/detail' component={OrderDetail} />
    </Switch>
  </BrowserRouter>
)

export default HomeRouter;
