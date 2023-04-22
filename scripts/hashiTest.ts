import { BytesLike, Wallet, ethers } from "ethers"
import { quorumConfig } from './config'
import MembershipAbi from '../artifacts/contracts/membership.sol/Membership.json'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, '../.env') })
async function main() {
  // add member in quorum
  const quorum = new ethers.providers.JsonRpcProvider("http://localhost:8545")
  const feeData = await quorum.getFeeData()
  const WALLET = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, quorum)
  console.log(WALLET.address)
  const membership = new ethers.Contract(
    quorumConfig.contractAddress,
    MembershipAbi.abi,
    WALLET)
  const register = membership.register(WALLET.address, 'test member', {
    gasLimit: 1000000,
    gasPrice: feeData.maxFeePerGas
  })
  // await register.
}

main()