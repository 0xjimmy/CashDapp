import './App.css'

// Dynamic!
import { DynamicContextProvider, mergeNetworks } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import Layout from './components/Layout';

const customNetworks = [{
    blockExplorerUrls: ['https://validator.rivest.inco.org/'],
    chainId: 21097,
    chainName: 'Inco Rivest Testnet',
    iconUrls: ['https://2921198789-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fb3FC48Xiy8fSq6XARds8%2Ficon%2FQlrBRTtastb5mRQNLhpk%2Fsymbol_brand.png?alt=media&token=79eebbe3-7881-4b26-bafc-13325a6c080d'],
    name: 'Inco Rivest Testnet',
    nativeCurrency: {
      decimals: 18,
      name: 'INCO',
      symbol: 'INCO',
      iconUrl: 'https://2921198789-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fb3FC48Xiy8fSq6XARds8%2Ficon%2FQlrBRTtastb5mRQNLhpk%2Fsymbol_brand.png?alt=media&token=79eebbe3-7881-4b26-bafc-13325a6c080d',
    },
    networkId: 21097,

    rpcUrls: ['https://validator.rivest.inco.org/'],
    vanityName: 'INCO Testnet',
}]



function App() {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: 'aa18d0e6-afcb-4824-8fc9-0cddda9bcb78',
        initialAuthenticationMode: 'connect-only',
        walletConnectors: [ EthereumWalletConnectors ],
        overrides: { evmNetworks: (networks) => mergeNetworks(customNetworks, networks) }, 
    }}>

      <Layout />
    </DynamicContextProvider>
  )
}

export default App
