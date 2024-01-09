import "./styles.css";
import { useReducer } from "react";

const initialState = { balance: 0, loan: 0, status: "closed" };

function reducer(state, action) {
  if (!state.status === "closed" && action.type !== "open") return;
  switch (action.type) {
    case "openAccount":
      return { ...state, balance: 400, status: "open" };
    case "deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "withdraw":
      return state.balance >= action.payload
        ? { ...state, balance: state.balance - action.payload }
        : { ...state };
    case "closeAccount":
      return state.status === "open" && state.balance === 0 && state.loan === 0
        ? initialState
        : { ...state };
    case "requestLoan":
      return state.loan === 0
        ? {
            ...state,
            loan: action.payload,
            balance: state.balance + action.payload,
          }
        : { ...state };
    case "payLoan":
      return state.balance >= state.loan
        ? { ...state, balance: state.balance - state.loan, loan: 0 }
        : { ...state };
    default:
      throw new Error("err");
  }
}

export default function BankAcountChallenge() {
  const [{ balance, loan, status }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const isOpen = status === "open";

  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount" })}
          disabled={isOpen}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "deposit", payload: 150 })}
          disabled={!isOpen}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "withdraw", payload: 50 })}
          disabled={!isOpen}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
          disabled={!isOpen}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "payLoan" })}
          disabled={!isOpen}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!isOpen}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
