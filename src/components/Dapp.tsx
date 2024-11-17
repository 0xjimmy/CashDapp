import { Receive } from "./Receive"
import { Pay } from "./Pay"
import { balance, fetchBalance } from "@/lib/getBalance"
import { computed } from "nanostores"
import { formatUnits } from "viem"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"
import { Button } from "./ui/button"
import { useEffect } from "react"

const Dapp = () => {
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
  if (primaryWallet) fetchBalance(primaryWallet)
  }, [])


  const balanceString = computed(balance, $bal => $bal === 0n ? '0.00' : formatUnits($bal, 2))


  return (
    <div className='w-full flex gap-4 flex-col items-center justify-center'>
      <div className="text-center">
        <Button className="h-max p-4 flex items-center justify-center" onClick={() => fetchBalance(primaryWallet)} variant="outline">
        <h2 className="text-6xl font-mono"><span className="mr-2">$</span><span>{balanceString.get()}</span></h2>
        </Button>
      </div>
      <div className="grid gap-2">
        <Receive />
        <Pay />
      </div>
    </div>
  )
}

export default Dapp
