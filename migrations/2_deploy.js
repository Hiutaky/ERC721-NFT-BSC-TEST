const NFTmint = artifacts.require("NFTmint");

module.exports = function (deployer) {
  deployer.deploy(NFTmint);
};
