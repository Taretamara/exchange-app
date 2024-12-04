import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CurrencyConverter from './CurrenyConverter';
import ExchangeRate from './ExchangeRate';
import Navbar from './Navbar';

const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route path="/converter" component={CurrencyConverter} />
      <Route path="/rates" component={ExchangeRate} />
    </Switch>
  </Router>
);

export default App;
