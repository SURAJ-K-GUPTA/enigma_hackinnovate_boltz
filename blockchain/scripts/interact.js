const Web3 = require('web3');
const contractABI = require('/Users/kaustubh/work/innovate/artifacts/contracts/ArtworkRegistry.sol/ArtworkRegistry.json'); // Path to your contract's ABI
const contractAddress = '0x...'; // Replace with your deployed contract address

// Connect to your Ethereum node (Assuming a local Hardhat node)
const web3 = new Web3('http://127.0.0.1:8545');

// Create a contract instance
const artworkRegistry = new web3.eth.Contract(contractABI, contractAddress);

// Function to add artwork
async function addArtwork(name, description, imageURL) {
    const ownerAccount = '0x...'; // Replace with the account address you want to use
    await artworkRegistry.methods.addArtwork(name, description, imageURL)
        .send({ from: ownerAccount })
        .then(console.log) 
        .catch(console.error); 
}

// Function to retrieve artwork
async function getArtwork(artworkId) {
    const artworkData = await artworkRegistry.methods.getArtwork(artworkId).call();
    console.log("Artwork Details:", artworkData);
}

// Example Usage (Make sure to update with real values)
addArtwork("My Art Piece", "A beautiful landscape", "https://example.com/image.jpg"); 
getArtwork(1); // Retrieve the artwork with ID 1
