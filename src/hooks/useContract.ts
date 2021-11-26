import { useWallet } from '../context/wallet';
import { ethers, Contract } from 'ethers';
import { useMemo } from 'react';
import { ETH_NETWORK_URL } from '../constants';

let contract: Contract | null = null;

export const useContract = (contractAddress: string, contractAbi: any) => {
  const { currentAccount, wrongChain } = useWallet();

  contract = useMemo(() => {
    if (typeof window === 'undefined') {
      return null;
    }
    // If we're connected, we'll establish contract connection using our wallet
    if (window.ethereum && currentAccount && !wrongChain) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      contract = new ethers.Contract(contractAddress, contractAbi, signer);
    } else {
      // Otherwise there is no signer, only allowed to do public queries
      const provider = new ethers.providers.JsonRpcProvider(
        ETH_NETWORK_URL
      );
      contract = new ethers.Contract(
        contractAddress,
        contractAbi,
        provider
      );
    }
    return contract;
  }, [currentAccount, wrongChain]);

  return contract;
};

export default useContract;
