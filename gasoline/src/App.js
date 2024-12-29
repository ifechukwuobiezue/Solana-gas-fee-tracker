import React from "react";
import "./App.css";
import SolanaPrice from "./components/solanaprice";
import EstimatedgasFee from "./components/gasfee";
import TransactionTable from "./components/stream";
import OptimalTradingPeriod from "./components/optimal";

function App() {
  return (
    <div>
      <header className="header">
        <img src="/solana-nobg.png" alt="Solana Logo" className="header-logo" />
        <span className="header-title">
          Ga<b style={{ fontWeight: "1000" }}>SOL</b>ine
        </span>
      </header>

      <div className="container">
        <div className="intro">
          <img src="/solana.png" width="50" height="50" alt="Solana Icon" />
          <h2>Solana Gas Fee Tracker</h2>
          <p>
            Real-time Solana transaction metrics and insights to optimize your
            trades.
          </p>
        </div>

        <div className="grid">
          <div className="card">
            <h3>Solana Price</h3>
            <p>
              <span id="solprice">
                <SolanaPrice />
              </span>
            </p>
          </div>
          <div className="card">
            <h3>Estimated Gas Fee ⛽</h3>
            <div id="averageGasFee">
              <p>
                <EstimatedgasFee />
              </p>
            </div>
          </div>
          <div className="card">
            <h3>Optimal Trading Period</h3>
            <p>
              <span id="optimalPeriod">
                <OptimalTradingPeriod />
              </span>
            </p>
          </div>
        </div>
        <br />
        <br />
        <footer>
          <p>Chart📊 of gas fee over time. Coming soon🏷️</p>
        </footer>

        <h2>🔌 Transactions</h2>
        <TransactionTable />
      </div>

      <footer>
        <p>&copy; 2024 GaSOLine🔥</p>
      </footer>
    </div>
  );
}

export default App;
