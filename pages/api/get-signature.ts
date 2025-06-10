import { ethers } from 'ethers';
import type { NextApiRequest, NextApiResponse } from 'next';

const signer = new ethers.Wallet(process.env.SIGNER_PRIVATE_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { to, amount } = req.body;
  const hash = ethers.utils.solidityKeccak256(['address', 'uint256'], [to, amount]);
  const signature = await signer.signMessage(ethers.utils.arrayify(hash));
  res.status(200).json({ signature });
}
