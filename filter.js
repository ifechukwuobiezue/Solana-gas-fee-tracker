function main(stream) {
  // Extract data, accounting for possible nesting
  const data = stream.data ? stream.data : stream;

  // Ensure the data is an array of block objects
  if (Array.isArray(data)) {
    const allTransactions = data.flatMap(block => {
      if (!block || !block.transactions) {
        // Skip if block or transactions are missing
        return [];
      }

      const blockHeight = block.blockHeight;
      const blockTime = block.blockTime; // Timestamp in seconds
      const blockhash = block.blockhash;

      if (Array.isArray(block.transactions)) {
        return block.transactions.map(tx => {
          if (!tx) {
            // Skip null or undefined transactions
            return null;
          }

          // Calculate relative time
          const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
          const timeDifference = blockTime ? currentTime - blockTime : null; // Difference in seconds
          const transactionTime = timeDifference !== null ? formatTimeDifference(timeDifference) : null;

          // Create a transaction object only with available data
          const txnDetails = {
            txnHash: tx.transaction?.signatures ? tx.transaction.signatures[0] : undefined,
            blockHeight: blockHeight,
            blockTime: blockTime,
            transactionTime: transactionTime,
            blockhash: blockhash,
            txnStatus: tx.meta?.err ? "Failed" : "Success",
            txnFee: tx.meta?.fee ? tx.meta.fee / 1_000_000_000 : undefined, // Convert to SOL
          };

          // Only add `fromAddress` and `toAddress` if available
          if (tx.meta?.preTokenBalances?.[0]?.owner) {
            txnDetails.fromAddress = tx.meta.preTokenBalances[0].owner;
          }
          if (tx.meta?.postTokenBalances?.[0]?.owner) {
            txnDetails.toAddress = tx.meta.postTokenBalances[0].owner;
          }

          // Only add `amountTransacted` if available
          if (tx.meta?.postTokenBalances?.[0]?.uiTokenAmount?.uiAmount !== undefined) {
            txnDetails.amountTransacted = tx.meta.postTokenBalances[0].uiTokenAmount.uiAmount;
          }

          return txnDetails;
        }).filter(txn => txn !== null); // Remove null entries from the map
      }

      // If no transactions exist, return an empty array for this block
      return [];
    });

    // Return only the last 100 transactions
    return allTransactions.slice(-100);
  } else {
    console.warn("Stream data is not an array of blocks.");
    return [];
  }
}

// Helper function to format time differences
function formatTimeDifference(seconds) {
  if (seconds < 60) return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}
