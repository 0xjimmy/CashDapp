import { type useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { Contract } from "ethers";
import { getSigner } from '@dynamic-labs/ethers-v6';

import { BALANCES_ADDRESS } from "@/constants";
import { BalancesABI } from "./BalancesABI";
import { getFhevmInstance } from "./fhevm";
import { toHex } from "viem";
import { atom } from "nanostores";

export const balance = atom<bigint>(0n)

export const fetchBalance = async (primaryWallet: ReturnType<typeof useDynamicContext>['primaryWallet']) => {
  try {
    if (!primaryWallet) throw "No Wallet"
    const signer = await getSigner(primaryWallet);
    const instance = await getFhevmInstance()

    const contract = new Contract(BALANCES_ADDRESS, BalancesABI, signer);
    const balanceHandle = await contract.balanceOf(await signer.getAddress());

    const { publicKey, privateKey } = instance.generateKeypair();
    const eip712 = instance.createEIP712(publicKey, BALANCES_ADDRESS);
    const signature = await signer.signTypedData(
      eip712.domain,
      { Reencrypt: eip712.types.Reencrypt },
      eip712.message
    );

    if (balanceHandle.toString() === "0") {
      console.warn("No balance")
      balance.set(0n)
    } else {
      const balanceResult = await instance.reencrypt(
        balanceHandle,
        privateKey,
        publicKey,
        signature.replace("0x", ""),
        BALANCES_ADDRESS,
        await signer.getAddress()
      );
      balance.set(balanceResult)
    }
  } catch (e) {
    console.log(e);
  }
}

export const transfer = async (primaryWallet: ReturnType<typeof useDynamicContext>['primaryWallet']) => {
  try {
    if (!primaryWallet) throw "No Wallet"
    const signer = await getSigner(primaryWallet);
    const instance = await getFhevmInstance()
    
    const contract = new Contract(BALANCES_ADDRESS, BalancesABI, signer);
    const input = instance.createEncryptedInput(
      BALANCES_ADDRESS,
      await signer.getAddress()
    );
    input.add64(10n);
    const encryptedInput = input.encrypt();

    const response = await contract.transferEnc(
      '0xa557cE11bB31495C2758990E30357003065C9179',
      encryptedInput.handles[0],
      toHex(encryptedInput.inputProof)
    );
    await response.wait();
  } catch (e) {
    console.log(e);
  } 
};
