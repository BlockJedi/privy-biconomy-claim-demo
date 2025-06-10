
# Gasless Token Claim DApp

🚀 A simple Next.js + Tailwind CSS decentralized app that lets users claim tokens **without paying gas fees**.  
Powered by a smart contract with off-chain signed messages verified on-chain.

---

## Features

- User authentication with Privy (emailless login)
- Off-chain signature generation on backend for gasless claims
- Frontend built with Next.js and Tailwind CSS
- Solidity smart contract verifying signed claims
- Easy to customize claim amount and token contract address

---

## Tech Stack

- **Frontend:** Next.js (TypeScript), Tailwind CSS  
- **Backend:** Next.js API routes for signature generation  
- **Blockchain:** Solidity smart contract (Ethereum-compatible)  
- **Wallet:** Ethers.js and Privy React SDK  

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- An Ethereum wallet private key for signing claims (do **not** use your main wallet)

### Installation

1. Clone this repo:

   ```bash
   git clone https://github.com/yourusername/gasless-token-claim.git
   cd gasless-token-claim
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env.local` file with:

   ```env
   PRIVATE_KEY=your_signer_private_key
   SIGNER_ADDRESS=your_signer_public_address
   NEXT_PUBLIC_APP_ENV=development
   ```

4. Update smart contract address and ABI in `pages/index.tsx` (replace `CONTRACT_ADDRESS` and `ABI` constants).

5. Run the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## Usage

- Click **Claim Tokens** to request tokens gaslessly.  
- The backend signs the message off-chain.  
- The smart contract verifies the signature and transfers tokens to the user.

---

## Smart Contract Overview

The contract verifies signatures signed by the backend's private key, allowing token claims without requiring users to pay gas for signature verification.

---

## Security Notes

- Keep your `PRIVATE_KEY` secure and do **not** expose it on the frontend.  
- Use a dedicated wallet for signing messages.  
- Validate all inputs carefully on backend and smart contract.

---

## Contributing

Feel free to open issues or submit pull requests!

