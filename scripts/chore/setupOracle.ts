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

  const bashiSetup = await bashi
}
main()