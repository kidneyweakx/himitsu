// Quorum <> Gnosis : event listener type relayer
import { BytesLike, ethers } from "ethers"
import { quorumConfig, contractAbi, chiadoConfig } from '../config'
import GiriGiriABI from '../chore/GiriGiriBashi.json'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

async function main() {
  const quorum = new ethers.providers.JsonRpcProvider(`http://${process.env.QUORUM_URL2}:8545`)
  const eventContract = new ethers.Contract(quorumConfig.contractAddress2, contractAbi.abi, quorum)
  
  // use chiado as cosmos hub
  const chiado = new ethers.providers.JsonRpcProvider("https://rpc.chiado.gnosis.gateway.fm")
  const WALLET = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, chiado)
  const giri = new ethers.Contract(chiadoConfig.girigiribashi, GiriGiriABI.abi, WALLET)
  const feeData = await chiado.getFeeData()
    const o = await giri.getHash(81712, 35, [chiadoConfig.oracle],{
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.mul(2),
      maxFeePerGas: feeData.maxFeePerGas?.mul(2),
      gasLimit: 4000000,
    })
    // await o.wait()
    console.log(o)
  // eventContract.on("MessageDispatched", async (address, chainId, hash, blockHash) => {
    
  // })

}

main()