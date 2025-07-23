import React, { useState } from 'react';

const compound = (principal, rate, years, withdrawStart) => {
  let data = [];
  let totalWithdrawn = 0;
  let value = principal;

  for (let year = 1; year <= years; year++) {
    let profit = value * rate;
    let withdraw = year >= withdrawStart ? profit : 0;
    totalWithdrawn += withdraw;
    value = value + profit - withdraw;
    data.push({ year, value: Math.round(value), withdrawn: Math.round(totalWithdrawn) });
  }

  return data;
};

export default function App() {
  const [investment, setInvestment] = useState(50000);
  const [rate, setRate] = useState(0.12);
  const [years, setYears] = useState(10);
  const [withdrawStart, setWithdrawStart] = useState(6);
  const [forecast, setForecast] = useState([]);

  const runForecast = () => {
    const result = compound(investment, rate, years, withdrawStart);
    setForecast(result);
  };

  return (
    <div>
      <h1>DIY Forecaster App</h1>
      <div>
        <label>Investment Amount ($): </label>
        <input type='number' value={investment} onChange={(e) => setInvestment(Number(e.target.value))} />
      </div>
      <div>
        <label>Annual Return Rate (%): </label>
        <input type='number' value={rate * 100} onChange={(e) => setRate(Number(e.target.value) / 100)} />
      </div>
      <div>
        <label>Years to Forecast: </label>
        <input type='number' value={years} onChange={(e) => setYears(Number(e.target.value))} />
      </div>
      <div>
        <label>Start Withdrawals After Year: </label>
        <input type='number' value={withdrawStart} onChange={(e) => setWithdrawStart(Number(e.target.value))} />
      </div>
      <button onClick={runForecast}>Run Forecast</button>

      {forecast.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Projected Value ($)</th>
              <th>Total Withdrawn ($)</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((row) => (
              <tr key={row.year}>
                <td>{row.year}</td>
                <td>{row.value.toLocaleString()}</td>
                <td>{row.withdrawn.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
