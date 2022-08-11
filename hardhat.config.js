require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()
require("./tasks/general.js");

// Remote RPC URL
const urlOverride = process.env.ETH_PROVIDER_URL;
console.log("ETH_PROVIDER_URL:", urlOverride);

// seed phrase for your HD wallet
const mnemonic =
  process.env.MNEMONIC ||
  "test test test test test test test test test test test junk";

// alternative to mnemonic, set a specific private key
const key = process.env.ETH_PRIVATE_KEY;

// if no private key is found in .env, use the public known mnemonic
const accounts = key ? [key] : { mnemonic };

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      mining: {
        auto: true,
        interval: 5000,
      },
    },
    fuji: {
      // avalanche testnet
      accounts: accounts,
      chainId: 43113,
      url: urlOverride || "https://api.avax-test.network/ext/bc/C/rpc",
    },
    rinkeby: {
      // ethereum testnet
      accounts: accounts,
      chainId: 4,
      url: urlOverride || "https://rinkeby-light.eth.linkpool.io",
    },
    mumbai: {
      // polygon testnet
      accounts: accounts,
      chainId: 80001,
      url: urlOverride || "https://rpc-mumbai.matic.today",
      gas: 6000000,
      gasPrice: 8000000000,
    }
  }
};
