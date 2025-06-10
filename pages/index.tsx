import { usePrivy, useWallets } from '@privy-io/react-auth';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const CONTRACT_ADDRESS = '0xYourContractAddressHere'; // Replace with deployed contract
const ABI = [ /* Paste your ABI here */ ];

export default function Home() {
  const { ready, authenticated, login } = usePrivy();
  const { wallets } = useWallets();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const claim = async () => {
    setLoading(true);
    try {
      const wallet = wallets[0]?.walletClient;
      if (!wallet) throw new Error('Wallet not found');

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
      await tx.wait();

      setMessage(`✅ Claimed successfully! TxHash: ${tx.hash}`);
    } catch (err: any) {
      console.error(err);
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ready && !authenticated) login();
  }, [ready, authenticated]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">🚀 Gasless Token Claim</h1>
        <p className="text-gray-600 mb-6">Claim 10 tokens for free, no gas needed!</p>
        <button
          onClick={claim}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {loading ? 'Processing...' : 'Claim Tokens'}
        </button>
        {message && <p className="mt-4 text-sm text-gray-800">{message}</p>}
      </div>
    </div>
  );
}
