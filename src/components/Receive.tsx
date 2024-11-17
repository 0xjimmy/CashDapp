import { PlusIcon } from "lucide-react"

import { Button } from "./ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
import { QRCodeCanvas } from "qrcode.react"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"

export function Receive() {
  const { primaryWallet } = useDynamicContext();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="flex-1 flex-grow"><PlusIcon /> Receive</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Receive Money</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0 flex items-center justify-center">
            <QRCodeCanvas value={primaryWallet?.address ?? ""} />
          </div>
          <DrawerFooter>
              <h3 className="text-sm text-neutral-400 text-center">{primaryWallet?.address ?? ""}</h3>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
