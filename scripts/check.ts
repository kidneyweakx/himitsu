import { BytesLike, Wallet, ethers } from "ethers"
import { quorumConfig } from './config'
import MembershipAbi from '../artifacts/contracts/membership.sol/Membership.json'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, '../.env') })

async function main() {
  const quorum = new ethers.providers.JsonRpcProvider(`http://${process.env.QUORUM_URL}:8545`)
  const feeData = await quorum.getFeeData()
  const WALLET = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, quorum)

  const membership = new ethers.Contract(
    quorumConfig.contractAddress2,
    MembershipAbi.abi,
    WALLET
  )
  await membership.checkRegister()

}

main()