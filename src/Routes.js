import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';
import ProductDetails from './pages/ProductDetails';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/account' component={AccountPage} />
      <Route path='/product/:id' component={ProductDetails} />
    </Switch>
  </BrowserRouter>
);

export default Routes;