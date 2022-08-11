![Test Rewards](https://github.com/SnickerdoodleLabs/Snickerdoodle-Theme-Light/blob/main/snickerdoodle_horizontal_notab.png?raw=true)

# Snickerdoodle Labs Simple Testnet Reward

The project creates a vanilla ERC721 contract for use as a test reward contract. Team members can add their wallets to the `MINTER_ROLE` and 
mint rewads to their wallets for testing various functionalities of the reward stack on EVM-compatible public testnets. 

## How To:

### Use a specific MNEMONIC

```shell
export MNEMONIC = "test test test test test test test test test test test junk"
npx hardhat accounts --network fuji
```

### Set your RPC endpoint provider

```shell
export ETH_PROVIDER_URL = https://rinkeby.infura.io/v3/<myinfurakey>
npx hardhat accounts --network rinkeby
```

### Mint a Test Reward

This example would use the first account in your configured HD Wallet associated with the MNEMONIC you set.

```shell
npx hardhat mintReward --network rinkeby --recipient 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --accountnumber 0
```