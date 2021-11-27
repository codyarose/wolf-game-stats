import React, {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback
} from 'react';

import { ETH_NETWORK_ID } from '../constants';

interface WalletContextType {
  checkIfWalletIsConnected(): void;
  connectWalletAction(): void;
  changeChain(): void;
  currentAccount: string | null;
  currentChain: string | null;
  wrongChain: boolean;
  hasEthereum: boolean;
}

const WalletContext = createContext<WalletContextType>({} as WalletContextType);

const WalletProvider: React.FC = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [currentChain, setCurrentChain] = useState<string | null>(null);
  const [wrongChain, setWrongChain] = useState(false);
  const [hasEthereum, setHasEthereum] = useState(true);

  const checkChain = useCallback(async () => {
    function handleChainChanged(_chainId: string) {
      setCurrentChain(_chainId);
      if (_chainId !== String(ETH_NETWORK_ID)) {
        setWrongChain(true);
      } else {
        setWrongChain(false);
      }
    }
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    handleChainChanged(chainId);
    window.ethereum.on('chainChanged', handleChainChanged);
  }, []);

  /*
   * Since this method will take some time, make sure to declare it as async
   */
  const checkIfWalletIsConnected = useCallback(async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        setHasEthereum(false);
        return;
      } else {
        /*
         * Check if we're authorized to access the user's wallet
         */
        const accounts = await ethereum.request!({ method: 'eth_accounts' });

        /*
         * User can have multiple authorized accounts, we grab the first one if its there!
         */
        if (accounts.length !== 0) {
          const account = accounts[0];
          await checkChain();
          setCurrentAccount(account);
        } else {
          console.log('No authorized account found');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [checkChain]);

  const connectWalletAction = async () => {
    try {
      if (!window.ethereum) {
        alert(
          'You need to install metamask to connect your wallet to our app. Please visit their site at https://metamask.io/.'
        );
        return;
      }

      const accounts = await window.ethereum.request!({
        method: 'eth_requestAccounts'
      });

      await checkChain();

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const changeChain = async () => {
    if (!window.ethereum) {
      alert(
        'You need to install metamask to connect your wallet to our app. Please visit their site at https://metamask.io/.'
      );
      return;
    }

    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: process.env.NEXT_PUBLIC_ETH_NETWORK_ID }]
    });
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <WalletContext.Provider
      value={{
        checkIfWalletIsConnected,
        connectWalletAction,
        currentAccount,
        currentChain,
        wrongChain,
        changeChain,
        hasEthereum
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);

export default WalletProvider;
