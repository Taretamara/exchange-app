import React, { useState, useEffect } from 'react';
import { checkStatus, json } from './utils';
import './CurrencyConverter.css';

const ExchangeRate = () => {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState([]);


  useEffect(() => {
    fetch('https://api.frankfurter.app/currencies')
      .then(checkStatus)
      .then(json)
      .then((data) => setCurrencies(Object.keys(data)))
      .catch((error) => console.error('Error fetching currencies:', error));
  }, []);


  useEffect(() => {
    fetch(`https://api.frankfurter.app/latest?base=${baseCurrency}`)
      .then(checkStatus)
      .then(json)
      .then((data) => setRates(data.rates))
      .catch((error) => console.error('Error fetching exchange rates:', error));
  }, [baseCurrency]);

  return (
    <div id="rates" className="exchange-rates-container">
      <h2 className="converter-subtitle">Exchange Rates</h2>

      <div className="currency-selector">
        <label htmlFor="base-currency"> </label>
        <select
          id="base-currency"
          className="converter-select"
          value={baseCurrency}
          onChange={(e) => setBaseCurrency(e.target.value)}
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>

      {/* Exchange rates table */}
      <table className="converter-table">
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(rates).map(([currency, rate]) => (
            <tr key={currency}>
              <td>{currency}</td>
              <td>{rate.toFixed(4)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeRate;
