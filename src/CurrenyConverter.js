import React, { Component } from 'react';
import Chart from 'chart.js';
import { checkStatus, json } from './utils';
import './CurrencyConverter.css';

class CurrencyConverter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 1,
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      convertedAmount: 0,
      currencies: [],
      historicalData: null,
    };

    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.fetchCurrencies();
    this.convertCurrency();
    this.fetchHistoricalData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.amount !== this.state.amount ||
      prevState.fromCurrency !== this.state.fromCurrency ||
      prevState.toCurrency !== this.state.toCurrency
    ) {
      this.convertCurrency();
      this.fetchHistoricalData();
    }
  }

  fetchCurrencies = async () => {
    try {
      const response = await fetch('https://api.frankfurter.app/currencies');
      const data = await response.json();
      this.setState({ currencies: Object.keys(data) });
    } catch (error) {
      console.error('Error fetching currencies:', error);
    }
  };

  convertCurrency = async () => {
    const { amount, fromCurrency, toCurrency } = this.state;
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await response.json();
      this.setState({ convertedAmount: Object.values(data.rates)[0] });
    } catch (error) {
      console.error('Error converting currency:', error);
    }
  };

  fetchHistoricalData = async () => {
    const { fromCurrency, toCurrency } = this.state;
    const today = new Date().toISOString().split('T')[0];
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    const startDate = oneMonthAgo.toISOString().split('T')[0];

    try {
      const response = await fetch(
        `https://api.frankfurter.app/${startDate}..${today}?from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await response.json();
      this.setState({ historicalData: data.rates }, this.renderChart);
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  renderChart = () => {
    const { historicalData, toCurrency } = this.state;

    if (!historicalData) return;

    const labels = Object.keys(historicalData);
    const data = Object.values(historicalData).map((rate) => rate[toCurrency]);

    const chartContext = this.chartRef.current.getContext('2d');

    new Chart(chartContext, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: `Exchange Rate: ${this.state.fromCurrency} to ${this.state.toCurrency}`,
            data,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
      
      },
    });
  };

  handleSwap = () => {
    this.setState(
      (prevState) => ({
        fromCurrency: prevState.toCurrency,
        toCurrency: prevState.fromCurrency,
      }),
      this.fetchHistoricalData // Ensure the chart updates after swapping
    );
  };

  render() {
    const { amount, fromCurrency, toCurrency, convertedAmount, currencies } = this.state;

    return (
      <div className="converter-container">
        <h2 className="converter-title">Currency Converter</h2>

        <div className="converter-input-group">
          <select
            className="converter-select"
            value={fromCurrency}
            onChange={(e) => this.setState({ fromCurrency: e.target.value })}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          <button onClick={this.handleSwap} className="converter-button">
            ⇌
          </button>

          <select
            className="converter-select"
            value={toCurrency}
            onChange={(e) => this.setState({ toCurrency: e.target.value })}
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div className="converter-input-group">
          <input
            type="number"
            value={amount}
            onChange={(e) => this.setState({ amount: e.target.value })}
            className="converter-input"
          />
          <p>Converted Amount: {convertedAmount ? convertedAmount.toFixed(2) : 'Loading...'}</p>
        </div>

        <div className="chart-container">
          <h3 className='converter-subtitle'>Historical Exchange Rates</h3>
          <canvas ref={this.chartRef} />
        </div>
      </div>
    );
  }
}

export default CurrencyConverter;
