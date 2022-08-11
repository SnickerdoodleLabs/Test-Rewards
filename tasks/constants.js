const fs = require("fs");

const logTXDetails = (txrct) => {
    console.log("----TX Mined---");
    console.log("Blocknumber:", txrct.blockNumber);
    console.log("TX Hash:", txrct.transactionHash);
    console.log("Gas Used:", txrct.gasUsed.toString());
};

const REWARD = function () {
    const artifactPath =
        "./artifacts/contracts/Reward.sol/Reward.json";
    if (fs.existsSync(artifactPath)) {
        return require("../" + artifactPath);
    } else {
        return null;
    }
};

// returns deployment address of the Consent Contract Factory
const Reward = function () {
    const hre = require("hardhat");
    if (hre.hardhatArguments.network == "rinkeby") {
        return "0x05BFCf31DDB6906332a657195c08a438dE6DddeA";
    } else if (hre.hardhatArguments.network == "fuji") {
        return "0xE52d20090701F2261C9a435142BBCAd8332052cE";
    } else if (hre.hardhatArguments.network == "mumbai") {
        return "";
    } else if (hre.hardhatArguments.network == "localhost") {
        return "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    } else {
        return "";
    }
};

module.exports = {
    REWARD,
    Reward,
    logTXDetails
};