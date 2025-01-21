# Blockchain Todo List App

Hello and welcome to the **Blockchain Todo List App**!

This application is a simple yet powerful **to-do list** that leverages blockchain technology. It consists of:

- **Backend**: Implemented using NestJS.
- **Frontend**: Built with Vite.

---

## Getting Started

### 1. Clone the Repository
Start by cloning the project from GitHub.

Navigate to the project directory:

```bash
cd <project-folder>
```
### 2. Set Up Environment Variables
The application requires environment variables for both the backend and frontend. Make sure to create `.env` files for each:

#### Backend Environment Variables
Create a `.env` file inside the `backend` folder and include the following:
```env
SMART_CONTRACT_ADDRESS=<your-smart-contract-address>
RPC_URL=<your-blockchain-rpc-url>
WALLET_PRIVATE_KEY=<your-wallet-private-key>
ALLOWED_ORIGIN=<frontend-url>
ABI_PATH=<path-to-your-abi-file>
```

#### Frontend Environment Variables
Create a `.env` file inside the `frontend` folder and include:
```env
VITE_API_BASE_URL=http://localhost:3000
```

### 3. Install Dependencies
Navigate to both the `frontend` and `backend` directories and install dependencies:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 4. Run the Application
From the root directory, open two terminal windows:

#### Terminal 1: Start the Backend
```bash
npm run start:backend
```

#### Terminal 2: Start the Frontend
```bash
npm run start:frontend
```

## Features
- Add, complete, and view tasks.
- Interacts with a blockchain smart contract for storing tasks.
- User-friendly frontend with real-time feedback.

---

## Things I Would’ve Liked to Do with More Time
- **Improve frontend error messages**: Display clearer, user-friendly error messages for better UX.
- **Disable the checkbox for completed tasks**: Prevent interaction with tasks that are already completed.
- **Add unit testing for the backend**: Ensure code reliability and maintainability with thorough testing.

