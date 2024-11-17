import { DynamicConnectButton, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { Button } from './ui/button'
import Dapp from './Dapp';

const Layout = () => {
  const { primaryWallet } = useDynamicContext();
  console.log({ primaryWallet })
  return (
    <>
      <div className='flex gap-1 items-end p-4 justify-center my-4'>
        <div className='w-10 h-10 rounded-sm bg-lime-500' />
        <h1 className='font-mono font-extrabold text-lime-500 text-md'>Cash dApp</h1>
      </div>

      {primaryWallet === null
        ? (<div className='w-full flex items-center justify-center'>
          <Button variant="secondary" size="lg">
            <DynamicConnectButton>Login</DynamicConnectButton>
          </Button>
          </div>)
        : <Dapp />
      }
    </>
  )
}

export default Layout
