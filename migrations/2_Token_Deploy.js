//const We_Made_Future = artifacts.require('We_Made_Future')
//const WUSDStablecoin = artifacts.require('WUSDStablecoin')
//const WUSDPool = artifacts.require('WUSDPool')
//const WUSDPoolLibrary = artifacts.require('WUSDPoolLibrary')
//const ChainlinkETHUSDPriceConsumer = artifacts.require('ChainlinkETHUSDPriceConsumer')
//const Farm = artifacts.require("WMFChef")
//const Stake = artifacts.require("WMFstake")
const WMF_WETH = artifacts.require('UniswapPairOracle_WMF_WETH')


const Owner_Address = "0xe7f890A0CB4c0Cbd68848F26F0998562502323Dc"
const Collateral_Address = "0x628712ee7f0c240c24820af6Efa06CAD3DA8AC20"

module.exports = async function(deployer, network, accounts) {
  // Deploy WUSD
 // await deployer.deploy(WUSDStablecoin, "We_Made_Future_USD", "WUSD", Owner_Address)
//  const wusdstablecoin = await WUSDStablecoin.deployed()

  // Deploy WMF
//  await deployer.deploy(We_Made_Future, "We_Made_Future", "WMF", "0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e", Owner_Address)
//  const we_made_future = await We_Made_Future.deployed()

  // Deploy WUSDPool
//  await deployer.deploy(WUSDPoolLibrary)
//  await deployer.link(WUSDPoolLibrary, WUSDPool)
//  await deployer.deploy(WUSDPool, "0xB7FB1bb06a10f7Ec53CaC0Bf29d7d7c058A47dE8", "0x040d87e9A4f44dF98b67C60B47515019975E7ad7", "0x628712ee7f0c240c24820af6Efa06CAD3DA8AC20", Owner_Address)

  // Deploy Farm
//  await deployer. deploy(Farm, "0xe7cB1d8902B372199ae07776Ac037207CBe1d6AA",  "0xe7f890A0CB4c0Cbd68848F26F0998562502323Dc", "0x0380bb57500562DA6Da4789AE9D04669c28243F1", 5000000000000, 11871940)
  // Deploy Stake

//  await deployer.deploy(Stake, "0xe7cB1d8902B372199ae07776Ac037207CBe1d6AA", "0xe7f890A0CB4c0Cbd68848F26F0998562502323Dc", 10000000000, 11895500)
//  await deployer.deploy(ChainlinkETHUSDPriceConsumer)
  await deployer.deploy(WMF_WETH, "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f", "0xB7FB1bb06a10f7Ec53CaC0Bf29d7d7c058A47dE8", "0xc778417E063141139Fce010982780140Aa0cD5Ab", "0xe7f890A0CB4c0Cbd68848F26F0998562502323Dc")

}