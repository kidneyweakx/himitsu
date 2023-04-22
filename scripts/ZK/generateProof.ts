// @ts-ignore
const groth16 = require('snarkjs').groth16
import { BytesLike,BigNumber, ethers } from "ethers"

import { quorumConfig } from "../config"
import MemberABI from '../../artifacts/contracts/membership.sol/Membership.json'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'
dotenvConfig({ path: resolve(__dirname, '../../.env') })
export async function exportSolidity({ proof, publicSignals }: any) {
  const rawCallData: string = await groth16.exportSolidityCallData(proof, publicSignals);
  const tokens = rawCallData
    .replace(/["[\]\s]/g, "")
    .split(",")
    .map(BigNumber.from);
  const [a1, a2, b1, b2, b3, b4, c1, c2, ...inputs] = tokens;
  const a: [BigNumber, BigNumber] = [a1, a2] ;
  const b: [[BigNumber, BigNumber], [BigNumber, BigNumber]] = [
    [b1, b2],
    [b3, b4],
  ]
  const c: [BigNumber, BigNumber] = [c1, c2]
  return {
    a, b, c, inputs
  }
}

export async function generateProof(circuitInputs: any, filePathWASM: any, filePathZKEY: any) {
  const { proof, publicSignals } = await groth16.fullProve(
    circuitInputs,
    filePathWASM,
    filePathZKEY
  )
  const solidityProof = await exportSolidity({ proof, publicSignals })
  return solidityProof
}

async function main() {

  const WASM_FILE_PATH = "circuits/hash.wasm"
  const ZKEY_FILE_PATH = "circuits/hash.zkey"
  const circuitInputs = {
    address: "0x41725273FF50458aF4CFd10Ad1CeF7d10B729Bb0",
    value: 9527
  }
  const proofData = await generateProof(
    circuitInputs,
    WASM_FILE_PATH,
    ZKEY_FILE_PATH,
  )

  // console.log(`["${proofData.a[0]._hex}", "${proofData.a[1]._hex}"]`)
  // console.log(`[["${proofData.b[0][0]._hex}", "${proofData.b[0][1]._hex}"],["${proofData.b[1][0]._hex}", "${proofData.b[1][1]._hex}"]]`)
  // console.log(`["${proofData.c[0]._hex}", "${proofData.c[1]._hex}"]`)
  // console.log(`["${proofData.inputs[0]._hex}", "${proofData.inputs[1]._hex}"]`)

  const quorum = new ethers.providers.JsonRpcProvider(`http://${process.env.QUORUM_URL}:8545`)
  const feeData = await quorum.getFeeData()
  const WALLET = new ethers.Wallet(process.env.PRIVATE_KEY as BytesLike, quorum)
  console.log(WALLET.address)
  const membership = new ethers.Contract(
    quorumConfig.contractAddress,
    MemberABI.abi,
    WALLET)
  console.log(proofData)
  // const mem = await membership.zkRegister(proofData);
  const mem = await membership.register(WALLET.address, 'hello');

  await mem.wait()
  console.log('sent zk proof membership data')
}

main()