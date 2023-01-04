![Test Rewards](https://github.com/SnickerdoodleLabs/Snickerdoodle-Theme-Light/blob/main/snickerdoodle_horizontal_notab.png?raw=true)

# Snickerdoodle Labs Simple Testnet Reward

![Data Wallet](/assets/wallet-visualization.png)

The project creates a vanilla ERC721 contract for use as a test reward contract. Team members can add their wallets to the `MINTER_ROLE` and 
mint rewads to their wallets for testing various functionalities of the reward stack on EVM-compatible public testnets. 

You'll need to set a MNEMONIC phrase with funding and an ETH provider URL in order to use the CLI exposed by the hardhat framework. See the 
instructions below.

## Deployment Addresses

### Original Flavor Cookie Reward (COOKIE)

- Fuji: [`0xE52d20090701F2261C9a435142BBCAd8332052cE`](https://testnet.snowtrace.io/address/0xE52d20090701F2261C9a435142BBCAd8332052cE)

### NFT London 2022 Reward (NFTL)

- Fuji [`0x140694aA94F283dc31BE4352bF09A525c7a4A4c4`](https://testnet.snowtrace.io/address/0x140694aA94F283dc31BE4352bF09A525c7a4A4c4)

### Snickerdoodle OG Beta Testers (SOGs)

- Fuji [`0x71e279A21F96cad4Ee870a69a81f2aC98EBc5551`](https://testnet.snowtrace.io/address/0x71e279A21F96cad4Ee870a69a81f2aC98EBc5551)

### Good Vibes (GVs)

- Fuji [`0x606565d105637E84dC3AB5f61cC2a6Cc42BFcDB4`](https://testnet.snowtrace.io/address/0x606565d105637E84dC3AB5f61cC2a6Cc42BFcDB4)

### The Infinite Cookie (TIC)

- Fuji [`0xdDf6f1Cd665eA1a77dA40d85d3Bb98124D5C4Bb4`](https://testnet.snowtrace.io/address/0xdDf6f1Cd665eA1a77dA40d85d3Bb98124D5C4Bb4)

### Cookie Skullz (SKULLZ)

- Fuji [`0x887254ed647b2F2997DDa8a9b2c620a10B6Cb6Bc`](https://testnet.snowtrace.io/address/0x887254ed647b2F2997DDa8a9b2c620a10B6Cb6Bc)

### Ugly Sweater (UGLY)

- Fuji [`0x7E455acB8b94beEAf8FeDBf26d0D3C7E692d5f33`](https://testnet.snowtrace.io/address/0x7E455acB8b94beEAf8FeDBf26d0D3C7E692d5f33)

### Snickerdoodle Beanie (BEANIE)

- Fuji [`0x322b7C18e3a4655BA86CeABd78dB525949308516`](https://testnet.snowtrace.io/address/0x322b7C18e3a4655BA86CeABd78dB525949308516)

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
npx hardhat mintReward --network rinkeby --symbol COOKIE --recipient 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 --accountnumber 0
```

### Set Reward Base URI

```shell
npx hardhat setBaseURI --network fuji --symbol COOKIE --uri ipfs://QmfWJbH5drBJrNmxh11dsm4LP5RfkcZ8KzkPzL5dkgAaDT?
npx hardhat setBaseURI --network fuji --symbol COOKIE --uri ipfs://QmcXyspky1fwDbmV8eakfMXkGkqQhiuttMzjPa5EwqCX7y?
npx hardhat setBaseURI --network fuji --symbol COOKIE --uri ipfs://QmbscAuTV19U8SuJgRqUDF5XaeJ6pRadPz4k3JotrjyNV9?
```

IMPORTANT NOTE: 
You need to put a question mark, `?`, at the end of your IPFS CID in order for your metadata to be parsed correctly
by indexing services. This is due to the internal logic of the `tokenURI` function implemented in the OpenZeppelin 
library which automatically adds the tokenID to the end of `baseURI` which will result in an incorrect CID without
the presence of the parameter separator. 