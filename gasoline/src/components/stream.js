import React, { useEffect, useState } from "react";
import axios from "axios";

const TransactionTable = () => {
  const [allTransactions, setAllTransactions] = useState([]); // All transactions for pagination
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [transactionsPerPage] = useState(20); // Transactions per page
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("https://solana-gas-fee-tracker.onrender.com/transactions");
        console.log("Full API Response:", response.data);

        // Flatten the nested arrays to get all transactions
        const nestedData = response.data?.data || [];
        const flattenedTransactions = nestedData.flat();
        console.log("Flattened Transactions:", flattenedTransactions);

        // Update the allTransactions state
        setAllTransactions(flattenedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        setAllTransactions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();

    // Polling every 5 seconds
    const intervalId = setInterval(fetchTransactions, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Calculate displayed transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = allTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  // Handle page navigation
  const totalPages = Math.ceil(allTransactions.length / transactionsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCopy = (txnHash) => {
    navigator.clipboard
      .writeText(txnHash)
      .then(() => {
        alert("Transaction Hash Copied!");
      })
      .catch((err) => {
        alert("Failed to copy the hash: " + err);
      });
  };

  return (
    <div>
      {loading ? (
        <p>Loading transactions...</p>
      ) : currentTransactions.length === 0 ? (
        <p>No transactions available</p>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Transaction Signature</th>
                <th>Timestamp</th>
                <th>Gas Fee(Sol)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction, index) => (
                <tr key={transaction.txnHash || index}>
                  <td
                    onClick={() => handleCopy(transaction.txnHash)} // Copy txnHash on click
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      textDecoration: "underline",
                    }}
                    title="Click to copy txnHash"
                  >
                    {transaction.txnHash}
                  </td>
                  <td>{transaction.transactionTime || "N/A"}</td>
                  <td>{transaction.txnFee || "N/A"}</td>
                  <td>{transaction.txnStatus || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              style={{ marginRight: "10px" }}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              style={{ marginLeft: "10px" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
