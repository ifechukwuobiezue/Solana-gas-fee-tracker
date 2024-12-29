# Solana Gas Tracker

This project tracks Solana gas prices and uses a webhook implemented in **Express.js** to recieve transaction data received from the QuickNode stream. The backend is exposed through **ngrok**, and the frontend is built with **React**.

QuickNode Streams provides real-time, low-latency blockchain data access via WebSockets, allowing developers to subscribe to specific events and receive updates without repetitive polling.

QuickNode Functions offer serverless, on-demand code execution for tasks like smart contract interactions and custom business logic, streamlining development and reducing resource usage.

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (and npm) - [Download Node.js](https://nodejs.org/)
- **ngrok** - [ngrok account](https://ngrok.com/) (for exposing the local backend to the internet)
- **QuickNode** - [ngrok account](https://www.quicknode.com/) (for accessing the Solana transaction stream and creating an API key)

## Installation

Follow the steps below to get the project up and running.

### 1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/solana-gas-tracker.git
cd solana-gas-tracker
```


### 2. Install Backend Dependencies

Navigate to the backend directory:

```bash
cd backend
```

Install the required dependencies:

```bash
npm install
```

### 3. Set Up the Backend
The backend is powered by Express.js and receives webhooks from webhook. 
So go to your quicknode dashbaord and create stream, the stream destination will be your express webhook route.

Start the Express server:

```bash
npm start
```

In another terminal, start ngrok to expose the backend server:

```bash
ngrok http 3000
```
Assumpion your backend is running on port 3000.
This will generate a public URL (e.g., http://xyz.ngrok.io). Use this URL to expose your webhook to external services.

#### 4. Install Frontend Dependencies
Navigate to the frontend directory:

```bash
cd ../gasoline
```

Install the React app dependencies:

```bash
npm install
```

### 5. Run the Frontend

Start the React development server:

```bash
npm start
```
This will open the React app in your browser (usually at http://localhost:3000).

### 6. Access the App
Frontend: Open your browser and navigate to http://localhost:3000 to view the React app.
Backend: Your backend should be running locally on http://localhost:3000 and will be exposed via ngrok for webhook testing.

### 7. Test Webhook Integration
Ensure that the webhook functionality is working by sending data from external services to the ngrok URL you generated earlier (e.g., http://xyz.ngrok.io). Your backend will receive and process the data, and the frontend will update accordingly.

![Screenshot 2024-12-29 204906](https://github.com/user-attachments/assets/b3158a9d-0229-410c-bf25-cd89760f6dcd)


