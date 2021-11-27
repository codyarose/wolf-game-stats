import { Button } from "@chakra-ui/button";
import { List, ListIcon, ListItem } from "@chakra-ui/layout";
import { useWallet } from "./context/wallet";

function MetaMaskConnect() {
  const {
    currentAccount,
    checkIfWalletIsConnected,
    connectWalletAction,
    wrongChain,
    changeChain
  } = useWallet();

  if (currentAccount) {
    return <List>
        <ListItem>
          <ListIcon color="green.500"/>
          Logged in as {currentAccount}
        </ListItem>
    </List>
  }

  if (wrongChain) {
    return <Button onClick={()=> changeChain() }>Switch to mainnet</Button>
  }

  return <Button onClick={()=> connectWalletAction() }>Connect to metamask</Button>


}

export default MetaMaskConnect;
