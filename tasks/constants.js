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
    if (hre.hardhatArguments.network == "dev") {
        return "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    } else if (hre.hardhatArguments.network == "localhost") {
        return "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    } else if (hre.hardhatArguments.network == "doodle") {
        return "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    } else if (hre.hardhatArguments.network == "hardhat") {
        return "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    } else if (hre.hardhatArguments.network == "rinkeby") {
        return "";
    } else if (hre.hardhatArguments.network == "mumbai") {
        return "";
    } else if (hre.hardhatArguments.network == "polygon") {
        return "";
    } else if (hre.hardhatArguments.network == "fuji") {
        return "";
    } else if (hre.hardhatArguments.network == "avalanche") {
        return "";
    } else if (hre.hardhatArguments.network == "fantom") {
        return "";
    } else if (hre.hardhatArguments.network == "mainnet") {
        return "";
    } else {
        return "";
    }
};

module.exports = {
    REWARD,
    Reward,
    logTXDetails
};