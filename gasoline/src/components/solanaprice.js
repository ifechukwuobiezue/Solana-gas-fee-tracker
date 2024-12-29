import React, { useState, useEffect } from "react";
import axios from "axios";

const SolanaPrice = () => {
  const [price, setPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(0);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        console.log("Fetching Solana price..."); // Debug log for fetch intervals
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd&include_24hr_change=true"
        );
        const solanaData = response.data.solana;

        console.log("Fetched data:", solanaData); // Debug log for fetched data
        setPrice(solanaData.usd);
        setPriceChange(solanaData.usd_24h_change);
      } catch (error) {
        console.error("Error fetching Solana price:", error);
      }
    };

    const interval = setInterval(fetchPrice, 60000); // Fetch every 60 seconds
    fetchPrice(); // Initial fetch

    return () => clearInterval(interval);
  }, []);

  const priceColor = priceChange > 0 ? "green" : "red";

  return (
    <div className="solana">
      <span
        className="solana-price"
        style={{
          fontWeight: "bolder",
        }}
      >
        ${price ? price.toFixed(2) : ""}
      </span>
      <span
        className="solana-change"
        style={{
          color: priceColor,
          fontSize: "0.85rem",
          marginLeft: "8px",
          fontWeight: "bolder",
        }}
      >
        {priceChange > 0 ? "+" : ""}
        {priceChange ? priceChange.toFixed(2) : ""}%
      </span>
    </div>
  );
};

export default SolanaPrice;
