import { useUserWallets, useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Button } from './ui/button'
import { balance, fetchBalance, transfer } from '@/lib/getBalance'
import { formatUnits } from 'viem'
import { useComputed } from '@preact/signals-react'

export const Balance = () => {
  const userWallets = useUserWallets()
  const { primaryWallet } = useDynamicContext();
  const balanceString = useComputed(() => formatUnits(balance.value, 2))

  return (
    <div>
      <h1>Wallets</h1>
      <p>{balanceString}</p>
      <Button onClick={() => fetchBalance(primaryWallet)}>Fetch Bal</Button>
      <Button onClick={() => transfer(primaryWallet)}>Transfer 10</Button>
      {userWallets.map((wallet) => (
        <p key={wallet.id}>
          {wallet.address}
        </p>
      ))}
    </div>
  )
}

