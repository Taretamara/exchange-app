// src/components/CurrencyList.js
import React, { useState, useEffect } from 'react';
import { checkStatus, json } from './utils';

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
      <h2>Exchange Rates</h2>
      <select value={baseCurrency} onChange={handleBaseChange}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <ul>
        {Object.entries(rates).map(([currency, rate]) => (
          <li key={currency}>{currency}: {rate.toFixed(2)}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExchangeRate;
