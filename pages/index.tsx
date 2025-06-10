import { usePrivy, useWallets } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const CONTRACT_ADDRESS = '0xYourContractAddressHere'; // Replace this
const ABI = [ /* Your contract ABI here */ ];

export default function Home() {
  const { ready, authenticated, login } = usePrivy();
  const { wallets } = useWallets();
  const [message, setMessage] = useState('');

  const claim = async () => {
    const wallet = wallets[0]?.walletClient;
    if (!wallet) return;

    const provider = new ethers.providers.Web3Provider(wallet);
    const signer = provider.getSigner();
    const to = await signer.getAddress();
    const amount = 10;

    const response = await fetch('/api/get-signature', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, amount }),
    });

    const { signature } = await response.json();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    const tx = await contract.claim(to, amount, signature);
    setMessage(`Claimed! Tx: ${tx.hash}`);
  };

  useEffect(() => {
    if (ready && !authenticated) login();
  }, [ready, authenticated]);

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold">Gasless Token Claim</h1>
      <button onClick={claim} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Claim 10 Tokens
      </button>
      <p className="mt-4">{message}</p>
    </main>
  );
}
