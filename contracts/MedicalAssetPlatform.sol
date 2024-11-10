// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalAssetPlatform {
    struct MedicalAsset {
        uint256 id;
        string name;
        string description;
        address owner;
        uint256 timestamp;
    }

    mapping(uint256 => MedicalAsset) public assets;
    uint256 public assetCount;

    event AssetCreated(uint256 id, string name, address owner, uint256 timestamp);
    event AssetTransferred(uint256 id, address newOwner);

    function createAsset(string memory _name, string memory _description) public {
        assetCount++;
        assets[assetCount] = MedicalAsset(assetCount, _name, _description, msg.sender, block.timestamp);
        emit AssetCreated(assetCount, _name, msg.sender, block.timestamp);
    }

    function transferAsset(uint256 _id, address _newOwner) public {
        require(msg.sender == assets[_id].owner, "Only the owner can transfer the asset");
        assets[_id].owner = _newOwner;
        emit AssetTransferred(_id, _newOwner);
    }

    function getAsset(uint256 _id) public view returns (string memory, string memory, address, uint256) {
        MedicalAsset memory asset = assets[_id];
        return (asset.name, asset.description, asset.owner, asset.timestamp);
    }
}