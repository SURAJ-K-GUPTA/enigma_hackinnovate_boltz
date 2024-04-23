# Artwork Registry

This project implements a decentralized Artwork Registry smart contract on the Ethereum blockchain using Solidity. The contract allows users to register their artworks by providing essential details such as name, description, and image URL. Each artwork is assigned a unique identifier (UID) to ensure its uniqueness and integrity within the registry.

## Purpose

The Artwork Registry leverages blockchain technology to provide a secure and transparent platform for artists, art galleries, and collectors to record and authenticate artworks. By storing artworks on a blockchain with unique identifiers, the registry mitigates the risk of plagiarism and unauthorized duplication.

### Addressing Plagiarism

The utilization of unique identifiers (UIDs) for each artwork in the registry serves as a proactive measure against plagiarism. By associating a distinct identifier with each registered artwork, the registry fosters transparency and accountability within the art community, discouraging unauthorized replication and ensuring the integrity of original creations.

## How to Run

To run the program, ensure you have the following prerequisites installed:

- Node.js
- Hardhat (Ethereum development environment)

Follow these steps to deploy and interact with the Artwork Registry contract:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/artwork-registry.git
   ```
2. Navigate to the project directory:
   ```bash
   cd backend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Deploy the contract to a local Ethereum network:
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```
5. Once the contract is deployed, the contract address along with the unique identifier of the artwork will be displayed.


## Contribution Guidelines

Contributions to the project are welcome! Please fork the repository, make your enhancements, and submit a pull request. Together, we can improve the functionality and usability of the Artwork Registry for the benefit of the art community.
