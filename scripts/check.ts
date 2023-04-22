import { BytesLike, Wallet, ethers } from "ethers"
import { quorumConfig } from './config'
import MembershipAbi from '../artifacts/contracts/membership.sol/Membership.json'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, '../.env') })

async function main() {
  const quorum = new ethers.providers.JsonRpcProvider(`http://${process.env.QUORUM_URL2}:8545`)
  const feeData = await quorum.getFeeData()
  const WALLET = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, quorum)

  const membership = new ethers.Contract(
    quorumConfig.contractAddress2,
    MembershipAbi.abi,
    WALLET
  )

  const m = await membership.checkRegister2(81712, 51);
  await m.wait()
  console.log(m)
    console.log('emit cross chain event')
}

main()