import React, { useEffect, useState } from "react";
import axios from "axios";

const OptimalTradingPeriod = () => {
  const [isOptimal, setIsOptimal] = useState(null);

  const url =
    "https://api.quicknode.com/functions/rest/v1/functions/1df82c1d-d921-4199-8f20-a48f39f81b4b/call?result_only=true";

  const apiKey = "QN_d6977a7c713c405d908c68ebe6bb6851"; // Replace with your actual API key

  const data = {
    network: "ethereum-mainnet",
    dataset: "block",
    blockNumber: 19532341,
    user_data: {
      max_fee: 8.5,
    },
  };

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
    "x-api-key": apiKey,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(url, data, { headers });
          const userFee = response.data?.user_data;

          // Check the value of userFee and set isOptimal accordingly
          if (userFee === 0.000005) {
            setIsOptimal("Yes");
          } else if (userFee > 0.000005) {
            setIsOptimal("No");
          } else {
            setIsOptimal(null); // Handle cases where the data isn't valid
          }
        } catch {
          setIsOptimal(null); // Reset if there's an error
        }
      };

      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {isOptimal !== null ? <p>{isOptimal}</p> : <p>No data available</p>}
    </div>
  );
};

export default OptimalTradingPeriod;
