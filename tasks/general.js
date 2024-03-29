const {
    logTXDetails,
    REWARD,
    rewardSelector,
} = require("./constants.js");

task("accounts", "Prints the list of accounts for configured HD Wallet", async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();

    for (const account of accounts) {
        let accountBalance = await account.getBalance();
        console.log(
            account.address,
            "balance:",
            hre.ethers.utils.formatEther(accountBalance),
        );
    }
});

task("accountBalance", "Prints the first account.")
    .addParam("accountnumber", "integer referencing the account to you in the configured HD Wallet")
    .setAction(async (taskArgs) => {
        const accountnumber = taskArgs.accountnumber;
        const accounts = await hre.ethers.getSigners();
        const account = accounts[accountnumber];

        let accountBalance = await account.getBalance();
        console.log(
            account.address,
            "balance:",
            hre.ethers.utils.formatEther(accountBalance),
        );
    });

task("transactionCount", "Get the nonce of the current account.")
    .addParam("accountnumber", "integer referencing the account to you in the configured HD Wallet")
    .setAction(async (taskArgs) => {
        const accountnumber = taskArgs.accountnumber;
        const accounts = await hre.ethers.getSigners();
        const account = accounts[accountnumber];

        const txCount = await account.getTransactionCount();

        console.log("Transaction count is:", txCount);
        console.log("Account Address:", account.address);
    });

task("currentBlockStats", "Get the current block gas limit.").setAction(
    async (taskArgs) => {
        const accounts = await hre.ethers.getSigners();

        const block = await accounts[0].provider.getBlock("latest");

        console.log("Block Number:", block["number"].toString());
        console.log("Gas Limit:", block["gasLimit"].toString());
        console.log("Gas Used:", block["gasUsed"].toString());
        console.log("Number Transactions:", block["transactions"].length);
    });

task("cancelTx", "Send 0 ETH to cancel a transaction")
    .addParam("nonce", "current transaction count of the account")
    .addParam("accountnumber", "Which HD account to query")
    .setAction(async (taskArgs) => {
        const acntnmbr = taskArgs.accountnumber;
        const accounts = await hre.ethers.getSigners();

        const txCount = parseInt(taskArgs.nonce);
        const feeData = await accounts[acntnmbr].getFeeData();
        console.log(feeData);

        await accounts[acntnmbr].sendTransaction({
            from: accounts[acntnmbr].address,
            to: accounts[acntnmbr].address,
            value: ethers.utils.parseEther("0"),
            nonce: txCount,
            maxFeePerGas: 10 * feeData.maxFeePerGas,
            maxPriorityFeePerGas: 10 * feeData.maxPriorityFeePerGas,
        })
            .then((txResponse) => {
                return txResponse.wait();
            })
            .then((txrct) => {
                logTXDetails(txrct);
            })
            .then(() => {
                return accounts[acntnmbr].provider.getBalance(
                    accounts[acntnmbr].address,
                );
            })
            .then((balance) => {
                console.log(
                    "Balance of sender:",
                    hre.ethers.utils.formatUnits(balance.toString()),
                );
            });
    });

task("grantAdminRole", "Grant admin role on the reward contract.")
    .addParam("symbol", "The NFT symbol to query.")
    .addParam("grantee", "Address to grant role to.")
    .addParam("accountnumber", "integer referencing the account to you in the configured HD Wallet")
    .setAction(async (taskArgs) => {
        const SYMBOL = taskArgs.symbol;
        const accountnumber = taskArgs.accountnumber;
        const accounts = await hre.ethers.getSigners();
        const account = accounts[accountnumber];
        const grantee = taskArgs.grantee;

        // attach the first signer account to the reward contract handle
        const rewardHandle = new hre.ethers.Contract(
            rewardSelector(SYMBOL),
            REWARD().abi,
            account
        );

        const roleBytes = await rewardHandle.DEFAULT_ADMIN_ROLE();

        await rewardHandle.grantRole(roleBytes, grantee)
            .then((txResponse) => {
                return txResponse.wait();
            })
            .then((txrct) => {
                logTXDetails(txrct);
            });
    });

task("grantRole", "Grant specific role on the reward contract.")
    .addParam("symbol", "The NFT symbol to query.")
    .addParam("grantee", "Address to grant role to.")
    .addParam("role", "Role to grant (DEFAULT_ADMIN_ROLE should use grantAdminRole)")
    .addParam("accountnumber", "integer referencing the account to you in the configured HD Wallet")
    .setAction(async (taskArgs) => {
        const SYMBOL = taskArgs.symbol;
        const accountnumber = taskArgs.accountnumber;
        const accounts = await hre.ethers.getSigners();
        const account = accounts[accountnumber];
        const ROLE = taskArgs.role;

        const roleBytes = ethers.utils.id(ROLE);
        const grantee = taskArgs.grantee;

        // attach the first signer account to the reward contract handle
        const rewardHandle = new hre.ethers.Contract(
            rewardSelector(SYMBOL),
            REWARD().abi,
            account
        );

        await rewardHandle.grantRole(roleBytes, grantee)
            .then((txResponse) => {
                return txResponse.wait();
            })
            .then((txrct) => {
                logTXDetails(txrct);
            });
    });

task("revokeRole", "Revokes a specific role on the consent contract.")
    .addParam("symbol", "The NFT symbol to query.")
    .addParam("revokee", "Address to revoke role from.")
    .addParam("role", "Role to grant (DEFAULT_ADMIN_ROLE is '0')")
    .addParam("accountnumber", "integer referencing the account to you in the configured HD Wallet")
    .setAction(async (taskArgs) => {
        const SYMBOL = taskArgs.symbol;
        const accountnumber = taskArgs.accountnumber;
        const accounts = await hre.ethers.getSigners();
        const account = accounts[accountnumber];
        const ROLE = taskArgs.role;

        const roleBytes = ethers.utils.id(ROLE);
        const revokee = taskArgs.revokee;


        // attach the first signer account to the reward contract handle
        const rewardHandle = new hre.ethers.Contract(
            rewardSelector(SYMBOL),
            REWARD().abi,
            account
        );

        await rewardHandle.revokeRole(roleBytes, revokee)
            .then((txResponse) => {
                return txResponse.wait();
            })
            .then((txrct) => {
                logTXDetails(txrct);
            });
    });

task("mintReward", "Revokes a specific role on the consent contract.")
    .addParam("symbol", "The NFT symbol to query.")
    .addParam("recipient", "Address to mint reward to.")
    .addParam("accountnumber", "integer referencing the account to you in the configured HD Wallet")
    .setAction(async (taskArgs) => {
        const SYMBOL = taskArgs.symbol;
        const accountnumber = taskArgs.accountnumber;
        const accounts = await hre.ethers.getSigners();
        const account = accounts[accountnumber];
        const recipient = taskArgs.recipient;


        // attach the first signer account to the reward contract handle
        const rewardHandle = new hre.ethers.Contract(
            rewardSelector(SYMBOL),
            REWARD().abi,
            account
        );

        await rewardHandle.safeMint(recipient)
            .then((txResponse) => {
                return txResponse.wait();
            })
            .then((txrct) => {
                logTXDetails(txrct);
            });
    });

task("setBaseURI", "Sets the base URI variable on the reward contract.")
    .addParam("symbol", "The NFT symbol to query.")
    .addParam("uri", "baseURI string that will be written to the NFT contract.")
    .addParam("accountnumber", "integer referencing the account to you in the configured HD Wallet")
    .setAction(async (taskArgs) => {
        const SYMBOL = taskArgs.symbol;
        const accountnumber = taskArgs.accountnumber;
        const accounts = await hre.ethers.getSigners();
        const account = accounts[accountnumber];
        const uri = taskArgs.uri;

        // attach the first signer account to the reward contract handle
        const rewardHandle = new hre.ethers.Contract(
            rewardSelector(SYMBOL),
            REWARD().abi,
            account
        );

        await rewardHandle.setBaseURI(uri)
            .then((txResponse) => {
                return txResponse.wait();
            })
            .then((txrct) => {
                logTXDetails(txrct);
            });
    });

task("getBaseURI", "Prints the base URI of the reward contract.")
    .addParam("symbol", "The NFT symbol to query.")
    .setAction(async (taskArgs) => {
        const SYMBOL = taskArgs.symbol;
        const provider = await hre.ethers.provider;

        const rewardHandle = new hre.ethers.Contract(
            rewardSelector(SYMBOL),
            REWARD().abi,
            provider
        );

        await rewardHandle.baseURI()
            .then((baseURI) => {
                console.log("Base URI:", baseURI)
            })
    });

task("getTokenURI", "Prints the token URI for the given token ID.")
    .addParam("symbol", "The NFT symbol to query.")
    .addParam("id", "The token id to query. ")
    .setAction(async (taskArgs) => {
        const SYMBOL = taskArgs.symbol;
        const tokenid = taskArgs.id;
        const provider = await hre.ethers.provider;

        // attach the first signer account to the reward contract handle
        const rewardHandle = new hre.ethers.Contract(
            rewardSelector(SYMBOL),
            REWARD().abi,
            provider
        );

        await rewardHandle.tokenURI(tokenid)
            .then((tokenURI) => {
                console.log("Token URI:", tokenURI)
            })
    });

task("balanceOf", "Prints the number of rewards owned by an address.")
    .addParam("symbol", "The NFT symbol to query.")
    .addParam("address", "The address to check token balance on.")
    .setAction(async (taskArgs) => {
        const SYMBOL = taskArgs.symbol;
        const address = taskArgs.address;
        const provider = await hre.ethers.provider;

        // attach the first signer account to the reward contract handle
        const rewardHandle = new hre.ethers.Contract(
            rewardSelector(SYMBOL),
            REWARD().abi,
            provider
        );

        await rewardHandle.balanceOf(address)
            .then((balance) => {
                console.log("The wallet has", balance.toString(), "rewards.")
            })
    });