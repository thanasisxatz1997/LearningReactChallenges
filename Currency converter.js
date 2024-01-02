//https://codesandbox.io/p/sandbox/currency-converter-challenge-6j9gjp?file=%2Fsrc%2FApp.js%3A1%2C1-62%2C1

import { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchResults() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        setResult(data?.rates[to]);
        setIsLoading(false);
      }
      if (from !== to) {
        fetchResults();
      } else {
        setResult(amount);
      }
      return function () {
        controller.abort();
      };
    },
    [amount, from, to]
  );

  return (
    <div>
      <input
        disabled={isLoading}
        type="text"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{isLoading ? "Loading..." : result}</p>
    </div>
  );
}
