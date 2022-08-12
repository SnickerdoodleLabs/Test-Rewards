![Test Rewards](https://github.com/SnickerdoodleLabs/Snickerdoodle-Theme-Light/blob/main/snickerdoodle_horizontal_notab.png?raw=true)

# Snickerdoodle Labs Simple Testnet Reward

The project creates a vanilla ERC721 contract for use as a test reward contract. Team members can add their wallets to the `MINTER_ROLE` and 
mint rewads to their wallets for testing various functionalities of the reward stack on EVM-compatible public testnets. 

You'll need to set a MNEMONIC phrase with funding and an ETH provider URL in order to use the CLI exposed by the hardhat framework. See the 
instructions below.

## Deployment Addresses

- Kovan: [`0x678586adA236937458D0e8cc9AbfCCfEA6918D8B`](https://kovan.etherscan.io/address/0x678586adA236937458D0e8cc9AbfCCfEA6918D8B)
- Rinkeby: [`0x05BFCf31DDB6906332a657195c08a438dE6DddeA`](https://rinkeby.etherscan.io/address/0x05BFCf31DDB6906332a657195c08a438dE6DddeA)
- Fuji: [`0xE52d20090701F2261C9a435142BBCAd8332052cE`](https://testnet.snowtrace.io/address/0xE52d20090701F2261C9a435142BBCAd8332052cE)

## How To:

### Use a specific MNEMONIC

You should set the `MNEMONIC` variable in the [`.env`](https://www.npmjs.com/package/dotenv) file or `export` the environment variable in the terminal:

```shell
export MNEMONIC = "test test test test test test test test test test test junk"
npx hardhat accounts --network fuji
```

### Set your RPC endpoint provider

You should set the `ETH_PROVIDER_URL` variable in the [`.env`](https://www.npmjs.com/package/dotenv) file or `export` the environment variable in the terminal:

```shell
export ETH_PROVIDER_URL = https://rinkeby.infura.io/v3/<myinfurakey>
npx hardhat accounts --network rinkeby
```

### Mint a Test Reward

This example would use the first account in your configured HD Wallet associated with the MNEMONIC you set.

```shell
npx hardhat mintReward --network rinkeby --recipient 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --accountnumber 0
```

### Set Reward Base URI

```shell
npx hardhat setBaseURI --network rinkeby --uri ipfs://QmfWJbH5drBJrNmxh11dsm4LP5RfkcZ8KzkPzL5dkgAaDT?
npx hardhat setBaseURI --network fuji --uri ipfs://QmcXyspky1fwDbmV8eakfMXkGkqQhiuttMzjPa5EwqCX7y?
npx hardhat setBaseURI --network mumbai --uri ipfs://QmbscAuTV19U8SuJgRqUDF5XaeJ6pRadPz4k3JotrjyNV9?
```

IMPORTANT NOTE: 
You need to put a question mark, `?`, at the end of your IPFS CID in order for your metadata to be parsed correctly
by indexing services. This is due to the internal logic of the `tokenURI` function implemented in the OpenZeppelin 
library which automatically adds the tokenID to the end of `baseURI` which will result in an incorrect CID without
the presence of the parameter separator. 