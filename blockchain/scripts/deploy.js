const { Contract } = require("hardhat/internal/hardhat-network/stack-traces/model");

// deploy.js
async function main() {
  try {
      // Load the contract's artifacts and connect to an Ethereum network
<<<<<<< HEAD

      const MyContractFactory = await ethers.getContractFactory("ArtworkRegistry")

      const myContract = (await MyContractFactory.deploy());
      await myContract.waitForDeployment();
      const myContractDeployedAddress = await myContract.getAddress();
      console.log("ArtworkRegistry at:",myContractDeployedAddress);

      //console.log("Unique ID:", (await myContract.uid()).toString());

      console.log("ArtworkRegistry deployed to:", myContract.runner.address);
=======
      const MyContractFactory = await ethers.getContractFactory("ArtworkRegistry")

      const myContract = (await MyContractFactory.deploy());
      const myContractDeployedAddress = await myContract.getAddress();
      console.log("ArtworkRegistry deployed to:", myContractDeployedAddress);

      console.log("address of contract :", myContract.runner.address);
>>>>>>> dfb38d7 (ganache-working)
  } catch (error) {
      console.error("Error deploying contract:", error);
  }
}

// Execute the main function
main()
.then(() => process.exit(0))
.catch(error => {
  console.error(error);
  process.exit(1);
});
