import { useState } from "react";
const Header = ({ text }) => {
  return <h1>{text}</h1>;
};
const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatristicLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all || 0;
  const positive = (good / all) * 100 || 0;

  if (all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatristicLine text="good" value={good} />
          <StatristicLine text="neutral" value={neutral} />
          <StatristicLine text="bad" value={bad} />
          <StatristicLine text="all" value={all} />
          <StatristicLine text="average" value={average} />
          <StatristicLine text="positive" value={`${positive}%`} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header text="give feedback" />
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <Button onClick={() => setGood(good + 1)} text="good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => setBad(bad + 1)} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
