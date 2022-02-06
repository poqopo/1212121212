const BettingGame = artifacts.require("BettingGame")

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(BettingGame, "0x040d87e9A4f44dF98b67C60B47515019975E7ad7");

};