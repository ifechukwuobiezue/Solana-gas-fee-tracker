// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const EstimatedgasFee = () => {
//   const [responseData, setResponseData] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);

//   const url =
//     "https://api.quicknode.com/functions/rest/v1/functions/1df82c1d-d921-4199-8f20-a48f39f81b4b/call?result_only=true";

//   const apiKey = "QN_d6977a7c713c405d908c68ebe6bb6851"; // Replace with your actual API key

//   const data = {
//     network: "ethereum-mainnet",
//     dataset: "block",
//     blockNumber: 19532341,
//     user_data: {
//       max_fee: 8.5,
//     },
//   };

//   const headers = {
//     accept: "application/json",
//     "Content-Type": "application/json",
//     "x-api-key": apiKey,
//   };

//   useEffect(() => {
//     // Call fetchData every 60 seconds
//     const interval = setInterval(() => {
//       const fetchData = async () => {
//         setIsLoading(true);
//         try {
//           const response = await axios.post(url, data, { headers });
//           setResponseData(response.data);
//           console.log("Quicknode function trigger:", response.data);
//           setError(null); // Clear any previous errors
//         } catch (err) {
//           setError(err.response ? err.response.data : err.message);
//           setResponseData(null); // Clear any previous data
//         } finally {
//           setIsLoading(false);
//         }
//       };

//       fetchData();
//     }, 5000);

//     // Cleanup interval on component unmount
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       {isLoading && <p>Loading...</p>}
//       {error && (
//         <p style={{ color: "red" }}>
//           Error:{" "}
//           {typeof error === "object" ? JSON.stringify(error, null, 2) : error}
//         </p>
//       )}
//       {responseData && <pre>{responseData.user_data}</pre>}
//     </div>
//   );
// };

// export default EstimatedgasFee;

import React, { useEffect, useState } from "react";
import axios from "axios";

const EstimatedgasFee = () => {
  const [responseData, setResponseData] = useState(null);

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
    // Call fetchData every 60 seconds
    const interval = setInterval(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(url, data, { headers });
          setResponseData(response.data);
          console.log("Quicknode function trigger:", response.data);
        } catch {
          setResponseData(null); // Clear data on error
        }
      };

      fetchData();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {responseData ? (
        <pre>{responseData.user_data + " sol"}</pre>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default EstimatedgasFee;
