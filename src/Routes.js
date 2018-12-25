import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/' exact component={HomePage} />
      <Route path='/account' component={AccountPage} />
    </Switch>
  </BrowserRouter>
);

export default Routes;