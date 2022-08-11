const {
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Reward", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployReward() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Reward = await ethers.getContractFactory("Reward");
    const reward = await Reward.deploy();

    return { reward };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { reward } = await loadFixture(deployReward);

      expect(await reward.name()).to.equal("Test Reward");
      expect(await reward.symbol()).to.equal("COOKIE");
    });

    describe("Events", function () {
      it("Should emit an event on mint", async function () {
        const { reward } = await loadFixture(deployReward);
        const [owner, otherAccount] = await ethers.getSigners();

        await expect(reward.connect(owner).safeMint(otherAccount.address))
          .to.emit(reward, "Transfer")
          .withArgs(anyValue, otherAccount.address, anyValue); // We accept any value as `when` arg
      });
    });
  });
});
