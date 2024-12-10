import React, { useState, useEffect } from 'react';
import { checkStatus, json } from './utils';
import './CurrencyConverter.css';


const ExchangeRate = () => {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetchCurrencies();
    fetchRates();
  }, [baseCurrency]);

  const fetchCurrencies = async () => {
    fetch('https://api.frankfurter.app/currencies')
      .then(checkStatus)
      .then(json)
      .then((data) => {
        setCurrencies(Object.keys(data)); // Get currency codes (e.g., ['USD', 'EUR'])
      })
      .catch((error) => console.error('Error fetching currencies:', error));
  };

  const fetchRates = async () => {
    fetch(`https://api.frankfurter.app/latest?base=${baseCurrency}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        setRates(data.rates);
      })
      .catch((error) => console.error('Error fetching exchange rates:', error));
  };

  const handleBaseChange = (e) => {
    setBaseCurrency(e.target.value);
  };

  return (
    <div id="rates">
      <h2 className="converter-subtitle">Exchange Rates</h2>
      <select className="converter-select" value={baseCurrency} onChange={handleBaseChange}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
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
              <td>{rate.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeRate;
