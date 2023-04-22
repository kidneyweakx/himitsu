import { task } from 'hardhat/config'
import type { TaskArguments } from "hardhat/types"
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

task("deploy:membership")
  .addParam('verifier','zk verifier')
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const signers: SignerWithAddress[] = await ethers.getSigners()
  const Factory: any = await ethers.getContractFactory("Membership")
  const contract: any = await Factory.connect(signers[0]).deploy(taskArguments.verifier)
  await contract.deployed()
  console.log("contract deployed to: ", contract.address)
})

task("deploy:oracle").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const feeData = await ethers.provider.getFeeData()
  const signers: SignerWithAddress[] = await ethers.getSigners()
  const Factory: any = await ethers.getContractFactory("EasyOracleAdapter")
  const contract: any = await Factory.connect(signers[0]).deploy({
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas as any,
    maxFeePerGas: feeData.maxFeePerGas as any,
    gasLimit: 4000000,
  })
  await contract.deployed()
  console.log("contract deployed to: ", contract.address)
})

task("deploy:verifier").setAction(async function (taskArguments: TaskArguments, { ethers }) {
  const feeData = await ethers.provider.getFeeData()
  const signers: SignerWithAddress[] = await ethers.getSigners()
  const Factory: any = await ethers.getContractFactory("Verifier")
  const contract: any = await Factory.connect(signers[0]).deploy({
    maxPriorityFeePerGas: feeData.maxPriorityFeePerGas as any,
    maxFeePerGas: feeData.maxFeePerGas as any,
    gasLimit: 4000000,
  })
  await contract.deployed()
  console.log("contract deployed to: ", contract.address)
})