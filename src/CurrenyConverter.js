import React, { useState, useEffect } from 'react';
import { checkStatus, json } from './utils';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetchCurrencies();
    convertCurrency();
  }, [amount, fromCurrency, toCurrency]);

  const fetchCurrencies = async () => {
    fetch('https://api.frankfurter.app/currencies')
      .then(checkStatus)
      .then(json)
      .then((data) => {
        setCurrencies(Object.keys(data)); // Get currency codes
      })
      .catch((error) => console.error('Error fetching currencies:', error));
  };

  const convertCurrency = async () => {
    fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
      .then(checkStatus)
      .then(json)
      .then((data) => {
        setConvertedAmount(Object.values(data.rates)[0]);
      })
      .catch((error) => console.error('Error converting currency:', error));
  };

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };
  return (
    <div id="converter">
      <h2>Currency Converter</h2>
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <button onClick={handleSwap}>⇌</button>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>{currency}</option>
        ))}
      </select>
      <p><input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      Converted Amount: {convertedAmount.toFixed(2)}</p>
    </div>
  );
};

export default CurrencyConverter;
