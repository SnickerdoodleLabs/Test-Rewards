// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {

  const Reward = await hre.ethers.getContractFactory("Reward");
  const reward = await Reward.deploy();

  const txrct = await reward.deployed();

  console.log("Reward deployed to:", reward.address);
  console.log("TX Hash:", txrct.transactionHash);
  console.log("Blocknumber:", txrct.blockNumber);
  console.log("Gas Used:", txrct.gasUsed.toString());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
