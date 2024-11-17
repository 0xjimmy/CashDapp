import { Scanner } from '@yudiel/react-qr-scanner';
import { atom } from "nanostores";

export const showScanner = atom<boolean>(false)

export const scanQr = () => {
  showScanner.set(true)
}

export const ScanComponent = (props: { callback: (args: unknown) => unknown}) => {
  if (!showScanner.get()) return <></>

  return <div className='abosolute inset-0 w-screen h-screen bg-blue-300'><Scanner onScan={(result) => {
    console.log(result)
    props.callback(result)
    showScanner.set(false)
  }} /></div>
}
