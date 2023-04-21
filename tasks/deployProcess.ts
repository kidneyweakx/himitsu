import { task } from 'hardhat/config'
import type { TaskArguments } from "hardhat/types"
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

task("deploy:membership").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners()
  const Factory: any = await ethers.getContractFactory("Membership")
  const contract: any = await Factory.connect(signers[0]).deploy()
  await contract.deployed()
  console.log("contract deployed to: ", contract.address)
})