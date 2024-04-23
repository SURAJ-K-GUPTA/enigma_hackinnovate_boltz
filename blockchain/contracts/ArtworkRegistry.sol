// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ArtworkRegistry {
    struct Artwork {
        uint256 uid;
        address owner;
        string name;
        string description;
        string imageURL;
        uint256 timestamp;
        
    }

    mapping(uint256 => Artwork) public artworks;
    uint256 public artworkCount;

<<<<<<< HEAD
    event ArtworkAdded(uint256 uid, string name, address owner);

    function addArtwork(string memory _name, string memory _description, string memory _imageURL) external {
        artworkCount++;
        artworks[artworkCount] = Artwork(artworkCount, msg.sender, _name, _description, _imageURL);
        emit ArtworkAdded(artworkCount, _name, msg.sender);
=======
    event ArtworkAdded(uint256 id, string name, address owner, uint256 timestamp);

    function addArtwork(string memory _name, string memory _description, string memory _imageURL) external {
        artworkCount++;
        artworks[artworkCount] = Artwork(msg.sender, _name, _description, _imageURL, block.timestamp);
        emit ArtworkAdded(artworkCount, _name, msg.sender, block.timestamp);
>>>>>>> dfb38d7 (ganache-working)
    }

    function getArtwork(uint256 _id) external view returns (address, string memory, string memory, string memory, uint256) {
        require(_id > 0 && _id <= artworkCount, "Invalid artwork ID");
        Artwork memory artwork = artworks[_id];
        return (artwork.owner, artwork.name, artwork.description, artwork.imageURL, artwork.timestamp);
    }
}
