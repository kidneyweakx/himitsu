// Quorum <> Gnosis : event listener type relayer
import { ethers } from "ethers"
import { quorumConfig, contractAbi } from '../config'

async function main() {
  const quorum = new ethers.providers.JsonRpcProvider("http://localhost:8545")
  const eventContract = new ethers.Contract(quorumConfig.contractAddress, contractAbi.abi, quorum)

  eventContract.on("NewMember", async (memberAddress, member) => {
    console.log(`BlockNumber: ${await quorum.getBlockNumber()}`)
    console.log(`Member Name: ${member.name}`)

  })

}

main()