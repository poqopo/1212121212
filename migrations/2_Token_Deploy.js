const Farm = artifacts.require("WMFChef")

module.exports = async function(deployer, network, accounts) {
  await deployer.deploy(Farm, "0x040d87e9A4f44dF98b67C60B47515019975E7ad7", "0xe7f890A0CB4c0Cbd68848F26F0998562502323Dc", "0x0380bb57500562DA6Da4789AE9D04669c28243F1", 5e12, 10121800);

};