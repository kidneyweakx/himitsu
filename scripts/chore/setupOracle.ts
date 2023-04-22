import { BytesLike, ethers } from "ethers"
import GiriABI from './GiriGiriBashi.json'
import { chiadoConfig } from '../config'

import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

async function main() {
  const chiado = new ethers.providers.JsonRpcProvider("https://rpc.chiado.gnosis.gateway.fm")
  const WALLET = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, chiado)
  const bashi = new ethers.Contract(chiadoConfig.girigiribashi, GiriABI.abi, WALLET)
  console.log("start")
  // const getHashs = await bashi.getUnanimousHash(81712, 19)
  // console.log(getHashs)
  let feeData = await chiado.getFeeData()
  const tHold = await bashi.setThreshold(81712,1,{
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.mul(2),
    maxFeePerGas: feeData.maxFeePerGas?.mul(2),
    gasLimit: 4000000,
  })
  await tHold.wait()
  console.log("1\n")
  feeData = await chiado.getFeeData()
  const bashiSetup = await bashi.enableOracleAdapters(81712, [chiadoConfig.oracle],{
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.mul(2),
    maxFeePerGas: feeData.maxFeePerGas?.mul(2),
    gasLimit: 4000000,
  })
  await bashiSetup.wait()
  console.log("2\n")

// console.log(bashiSetup)
  const getHash = await bashi.getUnanimousHash(81712, 19)
  console.log(getHash)
}
main()