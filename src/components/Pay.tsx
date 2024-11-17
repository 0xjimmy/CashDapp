import { QrCodeIcon, SendIcon } from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
import { transfer } from "@/lib/getBalance"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"

export function Pay() {
  const { primaryWallet } = useDynamicContext();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="flex-1 flex-grow"><SendIcon/>Pay</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Make a Payment</DrawerTitle>
          </DrawerHeader>
          <div className="p-4">
            <div className="flex gab-8 py-3 flex-col items-center justify-center space-x-2">
              <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
                <Label htmlFor="to">Reciept</Label>
                <div className="flex gap-2">
                <Input type="text" className="flex-4" id="to" placeholder="Reciept" />
                <Button className="flex-1"><QrCodeIcon /></Button>
                </div>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 my-2">
                <Label htmlFor="amount">Amount</Label>
                <Input type="number" id="amount" placeholder="Amount" />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={() => transfer(primaryWallet!)}>Pay</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
