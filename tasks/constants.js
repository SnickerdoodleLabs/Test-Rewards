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

const originalCookieReward = function () {
    const hre = require("hardhat");
    if (hre.hardhatArguments.network == "rinkeby") {
        return "0x05BFCf31DDB6906332a657195c08a438dE6DddeA";
    } else if (hre.hardhatArguments.network == "fuji") {
        return "0xE52d20090701F2261C9a435142BBCAd8332052cE";
    } else if (hre.hardhatArguments.network == "kovan") {
        return "0x678586adA236937458D0e8cc9AbfCCfEA6918D8B";
    } else if (hre.hardhatArguments.network == "mumbai") {
        return "";
    } else if (hre.hardhatArguments.network == "localhost") {
        return "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    } else {
        return "";
    }
};

const nftLondonReward = function () {
    const hre = require("hardhat");
    if (hre.hardhatArguments.network == "rinkeby") {
        return "";
    } else if (hre.hardhatArguments.network == "fuji") {
        return "0x140694aA94F283dc31BE4352bF09A525c7a4A4c4";
    } else if (hre.hardhatArguments.network == "kovan") {
        return "";
    } else if (hre.hardhatArguments.network == "mumbai") {
        return "";
    } else if (hre.hardhatArguments.network == "localhost") {
        return "";
    } else {
        return "";
    }
};

const snickerdoodleOGs = function () {
    const hre = require("hardhat");
    if (hre.hardhatArguments.network == "rinkeby") {
        return "";
    } else if (hre.hardhatArguments.network == "fuji") {
        return "0x71e279A21F96cad4Ee870a69a81f2aC98EBc5551";
    } else if (hre.hardhatArguments.network == "kovan") {
        return "";
    } else if (hre.hardhatArguments.network == "mumbai") {
        return "";
    } else if (hre.hardhatArguments.network == "localhost") {
        return "";
    } else {
        return "";
    }
};

const goodVibesReward = function () {
    const hre = require("hardhat");
    if (hre.hardhatArguments.network == "rinkeby") {
        return "";
    } else if (hre.hardhatArguments.network == "fuji") {
        return "0x606565d105637E84dC3AB5f61cC2a6Cc42BFcDB4";
    } else if (hre.hardhatArguments.network == "kovan") {
        return "";
    } else if (hre.hardhatArguments.network == "mumbai") {
        return "";
    } else if (hre.hardhatArguments.network == "localhost") {
        return "";
    } else {
        return "";
    }
};

const theInfiniteCookie = function () {
    const hre = require("hardhat");
    if (hre.hardhatArguments.network == "rinkeby") {
        return "";
    } else if (hre.hardhatArguments.network == "fuji") {
        return "0xdDf6f1Cd665eA1a77dA40d85d3Bb98124D5C4Bb4";
    } else if (hre.hardhatArguments.network == "kovan") {
        return "";
    } else if (hre.hardhatArguments.network == "mumbai") {
        return "";
    } else if (hre.hardhatArguments.network == "localhost") {
        return "";
    } else {
        return "";
    }
};

const cookieSkulls = function () {
    const hre = require("hardhat");
    if (hre.hardhatArguments.network == "rinkeby") {
        return "";
    } else if (hre.hardhatArguments.network == "fuji") {
        return "0x887254ed647b2F2997DDa8a9b2c620a10B6Cb6Bc";
    } else if (hre.hardhatArguments.network == "kovan") {
        return "";
    } else if (hre.hardhatArguments.network == "mumbai") {
        return "";
    } else if (hre.hardhatArguments.network == "localhost") {
        return "";
    } else {
        return "";
    }
};

const uglySweater = function () {
    const hre = require("hardhat");
    if (hre.hardhatArguments.network == "rinkeby") {
        return "";
    } else if (hre.hardhatArguments.network == "fuji") {
        return "0x7E455acB8b94beEAf8FeDBf26d0D3C7E692d5f33";
    } else if (hre.hardhatArguments.network == "kovan") {
        return "";
    } else if (hre.hardhatArguments.network == "mumbai") {
        return "";
    } else if (hre.hardhatArguments.network == "localhost") {
        return "";
    } else {
        return "";
    }
};

const snickerdoodleBeanie = function () {
    const hre = require("hardhat");
    if (hre.hardhatArguments.network == "rinkeby") {
        return "";
    } else if (hre.hardhatArguments.network == "fuji") {
        return "0x322b7C18e3a4655BA86CeABd78dB525949308516";
    } else if (hre.hardhatArguments.network == "kovan") {
        return "";
    } else if (hre.hardhatArguments.network == "mumbai") {
        return "";
    } else if (hre.hardhatArguments.network == "localhost") {
        return "";
    } else {
        return "";
    }
};

const rewardSelector = function (reward) {
    if (reward == "COOKIE") {
        return originalCookieReward();
    } else if (reward == "NFTL") {
        return nftLondonReward();
    } else if (reward == "SOGs") {
        return snickerdoodleOGs();
    } else if (reward == "GVs") {
        return goodVibesReward();
    } else if (reward == "TIC") {
        return theInfiniteCookie();
    } else if (reward == "SKULLZ") {
        return cookieSkulls();
    } else if (reward == "UGLY") {
        return uglySweater();
    } else if (reward == "BEANIE") {
        return snickerdoodleBeanie();
    } else {
        return "";
    }
};

module.exports = {
    REWARD,
    rewardSelector,
    logTXDetails
};