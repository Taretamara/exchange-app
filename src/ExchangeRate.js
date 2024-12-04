import React, { useState, useEffect } from 'react';
import { checkStatus, json } from './utils';

const ExchangeRate = () => {
  const [rates, setRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState('USD');

  useEffect(() => {
    fetch(`https://api.frankfurter.app/latest?base=${baseCurrency}`)
      .then(checkStatus)
      .then(json)
      .then((data) => setRates(data.rates))
      .catch((error) => console.error('Error fetching rates:', error));
  }, [baseCurrency]);

  return (
    <div className="rate-table">
      <h2>Exchange Rates</h2>
      <table>
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
