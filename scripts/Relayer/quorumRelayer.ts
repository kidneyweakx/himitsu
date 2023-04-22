// Quorum <> Gnosis : event listener type relayer
import { BytesLike, ethers } from "ethers"
import { quorumConfig, contractAbi, chiadoConfig } from '../config'
import OracleABI from '../../artifacts/contracts/adapter/EasyOracleAdapter.sol/EasyOracleAdapter.json'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, '../../.env') })

async function main() {
  const quorum = new ethers.providers.JsonRpcProvider("http://localhost:8545")
  const eventContract = new ethers.Contract(quorumConfig.contractAddress, contractAbi.abi, quorum)
  
  // use chiado as cosmos hub
  const chiado = new ethers.providers.JsonRpcProvider("https://rpc.chiado.gnosis.gateway.fm")
  const WALLET = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, chiado)
  const oracle = new ethers.Contract(chiadoConfig.oracle, OracleABI.abi, WALLET)

  eventContract.on("NewMember", async (memberAddress, member) => {
    const blockNum = await quorum.getBlockNumber()
    // console.log(`BlockNumber: ${await quorum.getBlockNumber()}`)
    const block = await quorum.getBlock(blockNum)
    // console.log(block.hash)
    const feeData = await chiado.getFeeData()
    const o = await oracle.blockHash(81712, [blockNum, block.hash],{
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas?.mul(2),
      maxFeePerGas: feeData.maxFeePerGas?.mul(2),
      gasLimit: 4000000,
    })
    await o.wait()
    console.log(`Member Name: ${member.name}`)
  })

}

main()