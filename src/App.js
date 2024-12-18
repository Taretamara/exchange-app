import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CurrencyConverter from './CurrenyConverter';
import ExchangeRate from './ExchangeRate';
import Navbar from './Navbar';
import Footer from './Footer';


const App = () => (
  <Router>
    <Navbar />
    <Switch>
      <Route path="/" exact component={CurrencyConverter} />
      <Route path="/rates" component={ExchangeRate} />
    </Switch>
    <Footer />
  </Router>
);

export default App;
