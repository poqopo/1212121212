import React, { Component } from 'react'
import Web3 from 'web3'
import WUSDStablecoin from './abis/WUSDStablecoin.json'
import We_Made_Future from './abis/We_Made_Future.json'
import MockDai from './abis/MockDai.json'
import WUSDPool from './abis/WUSDPool.json'
import WMFChef from './abis/WMFChef.json'
import WMFWETH_Pair from './abis/WMFWETH_Pair.json'
import UniswapPairOracle_MDAI_WETH from './abis/UniswapPairOracle_MDAI_WETH.json'
import UniswapPairOracle_WMF_WETH from './abis/UniswapPairOracle_WMF_WETH.json'
import UniswapPairOracle_WUSD_WETH from './abis/UniswapPairOracle_WUSD_WETH.json'
import BettingGame from './abis/BettingGame.json'
import { Home, Pool, ComingSoon, Farm } from './components/Pages'
import { MintBoxes, RedeemBoxes, OtherBoxes, FarmBox } from './components/Boxes'
import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Game from './components/Game'
import GameLoading from './components/GameLoading'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      WUSDToken: {},
      WMFToken: {},
      MockDaiToken: {},
      WUSDTokenBalance: '-',
      WMFTokenBalance: '-',
      WUSDTokenPrice: '0',
      WMFTokenPrice: '0',
      MockDaiTokenPrice: '0',
      MockDaiTokenBalance: {},
      Pool: {},
      mintPaused: false,
      redeemPaused: false,
      userInfo: "-",
      loading: true
    }
    this.setState = this.setState.bind(this)
    this.onChange = this.onChange.bind(this)
    this.makeBet = this.makeBet.bind(this)
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
    await this.getCollateralRatio()
    await this.userInfo()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load WUSDStablecoin
    const WUSDStablecoinData = WUSDStablecoin.networks[networkId]
    if(WUSDStablecoinData) {
      const WUSDToken = new web3.eth.Contract(WUSDStablecoin.abi, WUSDStablecoinData.address)
      let WUSDTokenBalance = await WUSDToken.methods.balanceOf(this.state.account).call()
      

      /// 오라클 업데이트를 돌려놔야됨!! ///

      let WMFTokenPrice = await WUSDToken.methods.WMF_price().call()
      let WUSDTokenPrice = await WUSDToken.methods.WUSD_price().call()
      let ETHPrice = await WUSDToken.methods.eth_usd_price().call()
      this.setState({ 
        WUSDToken: WUSDToken,
        WUSDTokenBalance: WUSDTokenBalance.toString(),
        WMFTokenPrice: WMFTokenPrice.toString(),
        WUSDTokenPrice: WUSDTokenPrice.toString(),
        ETHPrice: ETHPrice.toString()
      })
      await this.getCollateralRatio()
    } else {
      window.alert('WUSDToken contract not deployed to detected network.')
    }

    // Load MockDai
    const MockDaiData = MockDai.networks[networkId]
    if(MockDaiData) {
      const MockDaiToken = new web3.eth.Contract(MockDai.abi, MockDaiData.address)
      this.setState({ MockDaiToken })
      let MockDaiTokenBalance = await MockDaiToken.methods.balanceOf(this.state.account).call()
      this.setState({ MockDaiTokenBalance: MockDaiTokenBalance.toString() })
    }

    // Load We_Made_Future
    const We_Made_FutureData = We_Made_Future.networks[networkId]
    if(We_Made_FutureData) {
      const WMFToken = new web3.eth.Contract(We_Made_Future.abi, We_Made_FutureData.address)
      let WMFTokenBalance = await WMFToken.methods.balanceOf(this.state.account).call()
      this.setState({ 
        WMFToken: WMFToken,
        WMFTokenBalance: WMFTokenBalance.toString()
      })
    } else {
      window.alert('We_Made_Future contract not deployed to detected network.')
    }

    // Load WUSDPool
    const WUSDPoolData = WUSDPool.networks[networkId]
    if(WUSDPoolData) {
      const Pool = new web3.eth.Contract(WUSDPool.abi, WUSDPoolData.address)
      this.setState({ Pool })
      // let mintPaused = await Pool.methods.mintPaused().call()
      // this.setState({ mintPaused: mintPaused.toString() })
      // let redeemPaused = await Pool.methods.redeemPaused().call()
      // this.setState({ redeemPaused: redeemPaused.toString() }) 
    } else {
      window.alert('WUSDPool contract not deployed to detected network.')
    }

    // Load Farm
    const FarmData = WMFChef.networks[networkId]
    if(FarmData) {
      const Farm = new web3.eth.Contract(WMFChef.abi, FarmData.address)
      this.setState({ Farm })
    } else {
      window.alert('Farm contract not deployed to detected network.')
    }
    
    // Load WMF-WETH Pair Link Token
    const WMFWETH_PairData = WMFWETH_Pair.networks[networkId]
    if(WMFWETH_PairData) {
      const WMF_WETH_Pair = new web3.eth.Contract(WMFWETH_Pair.abi, WMFWETH_PairData.address)
      let PairTokenBalance = await WMF_WETH_Pair.methods.balanceOf(this.state.account).call()
      this.setState({ WMF_WETH_Pair, PairTokenBalance })
    } else {
      window.alert('WMF_WETH_Pair contract not deployed to detected network.')
    }

    // Load Oracles
    const MDAI_OracleData = UniswapPairOracle_MDAI_WETH.networks[networkId]
    if(MDAI_OracleData) {
      const MockDaiTokenOracle = new web3.eth.Contract(UniswapPairOracle_MDAI_WETH.abi, MDAI_OracleData.address)
      this.setState({ MockDaiTokenOracle })
    } else {
      window.alert('MockDaiTokenOracle contract not deployed to detected network.')
    }

    const WMF_OracleData = UniswapPairOracle_WMF_WETH.networks[networkId]
    if(WMF_OracleData) {
      const WMFTokenOracle = new web3.eth.Contract(UniswapPairOracle_WMF_WETH.abi, WMF_OracleData.address)
      this.setState({ WMFTokenOracle })
    } else {
      window.alert('WMFTokenOracle contract not deployed to detected network.')
    }

    const WUSD_OracleData = UniswapPairOracle_WUSD_WETH.networks[networkId]
    if(WUSD_OracleData) {
      const WUSDTokenOracle = new web3.eth.Contract(UniswapPairOracle_WUSD_WETH.abi, WUSD_OracleData.address)
      this.setState({ WUSDTokenOracle })
    } else {
      window.alert('WUSDTokenOracle contract not deployed to detected network.')
    }

    // Load Game Contract & Set Max/Min bet
    const BettingGameData = BettingGame.networks[networkId]
    if(BettingGameData) {
      const BettingGameContract = new web3.eth.Contract(BettingGame.abi, BettingGameData.address)
      const bettingGameMaxBet = await this.state.WMFToken.methods.balanceOf(BettingGameData.address).call()
      const bettingGameMinBet = 1e18
      this.setState({ BettingGameContract, bettingGameMaxBet, bettingGameMinBet})
      console.log(this.state.bettingGameMaxBet)
    } else {
      window.alert('BettingGame contract not deployed to detected network.')
    }
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      this.setState({web3: window.web3})
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  // Test Functions
  testFunc = () => {
    this.state.WUSDToken.methods.global_collateral_ratio().call().then((ratio) => {
      console.log(ratio)
    })
  }



  // Game
  onChange(value) {
    this.setState({'amount': value});
  }
  makeBet(bet, amount) {
    //randomSeed - one of the components from which will be generated final random value
    
    if(typeof this.state.account !=='undefined' && this.state.account !==null){
      var randomSeed = Math.floor(Math.random() * Math.floor(1e9))

      //Send bet to the contract and wait for the verdict
      this.state.WMFToken.methods.approve(this.state.BettingGameContract._address, amount).send({ from: this.state.account })
      .on('transactionHash', (hash) => {console.log(hash)})
      .on('receipt', (r1) => {
        console.log(r1)
        this.state.BettingGameContract.methods.game(amount, bet, randomSeed).send({from: this.state.account})
        .on('transactionHash', (hash) => {
          this.setState({ loading: true })
          console.log(hash)})
        .on('r2', (r2) => {
          console.log(r2)
          console.log("send success") 
         
          this.state.BettingGameContract.events.Result({}, async (error, event) => {
            console.log("verdict found")
            const verdict = event.returnValues.winAmount
            if(verdict === '0') {
              window.alert('lose :(')
            } else {
              window.alert('WIN!')
            }
            this.setState({ loading: false })
          })
        })
        }).on('error', (error) => {
          window.alert('Error')
        })
    } else {
        window.alert('Problem with account or network')
    }
  }

  // Pool
  getCollateralRatio = async () => {
    let ratio = await this.state.WUSDToken.methods.global_collateral_ratio().call()
    this.setState({collateralRatio:ratio})
  }

  mintAlgorithmicWUSD = (WMF_amount, WUSD_out_min) => {
    this.setState({loading: true})
    this.state.WMFToken.methods.approve(this.state.Pool._address, WMF_amount).send({from: this.state.account}).on('receipt', (r1)=>{
      console.log(r1)
      this.state.Pool.methods.mint1t1WUSD(WMF_amount, WUSD_out_min).send({from: this.state.account}).on('receipt', (r2) => {
        console.log(r2)
        this.loadBlockchainData()
        this.setState({loading: false})
      })
    })
  }

  mint1t1WUSD = (MockDai_amount, WUSD_out_min) => {
    this.setState({loading: true})
    this.state.WMFToken.methods.approve(this.state.Pool._address, MockDai_amount).send({from: this.state.account}).on('receipt', (r1)=>{
      console.log(r1)
      this.state.Pool.methods.mint1t1WUSD(MockDai_amount, WUSD_out_min).send({from: this.state.account}).on('receipt', (r2) => {
        console.log(r2)
        this.loadBlockchainData()
        this.setState({loading: false})
      })
    })
  }

  // mock 99.75  wmf 0.25 wusd 100
  // mock 99.75 wmf many wusd 100
  // 90 100 1 - Main.js 테스트 확인
  mintFractionalWUSD = (MockDai_amount, WMF_amount, WUSD_out_min) => {
    this.setState({ loading: true })
    this.state.MockDaiToken.methods.approve(this.state.Pool._address, MockDai_amount).send({from: this.state.account})
    .on('error',() => {
      this.loadBlockchainData()
      this.setState({loading: false})
      console.log('error')
    })
    .on('receipt', (r1) => {
      this.state.WMFToken.methods.approve(this.state.Pool._address, WMF_amount).send({from: this.state.account}).on('receipt', (r2) =>{
        this.state.Pool.methods.mintFractionalWUSD(MockDai_amount, WMF_amount, WUSD_out_min).send({from: this.state.account})
        .on('transactionHash', (hash) => {console.log(hash)})
        .on('receipt', (receipt) => {
          this.loadBlockchainData()
          this.setState({loading: false})
        })
      }
    )})
  }

  redeem1t1WUSD = (WUSD_amount, MockDai_out_min) => {
    this.setState({loading:true})
    this.state.WUSDToken.methods.approve(this.state.Pool._address, WUSD_amount).send({from: this.state.account}).on('receipt', (r1) => {
      console.log(r1)
      this.state.Pool.methods.redeem1t1WUSD(WUSD_amount, MockDai_out_min).send({from: this.state.account}).on('receipt', (r2) => {
        console.log(r2)
        this.loadBlockchainData()
        this.setState({loading: false})
      })
    })
  }

  redeemFractionalWUSD = (WUSD_amount, WMF_out_min, MockDai_out_min) => {
    this.setState({loading:true})
    this.state.WUSDToken.methods.approve(this.state.Pool._address, WUSD_amount).send({from: this.state.account}).on('receipt', (r1) => {
      console.log(r1)
      this.state.Pool.methods.redeemFractionalWUSD(WUSD_amount, WMF_out_min, MockDai_out_min).send({from: this.state.account}).on('receipt', (r2) => {
        console.log(r2)
        this.loadBlockchainData()
        this.setState({loading: false})
      })
    })
  }

  redeemAlgorithmicWUSD = (WUSD_amount, WMF_out_min) => {
    this.setState({loading:true})
    this.state.WUSDToken.methods.approve(this.state.Pool._address, WUSD_amount).send({from: this.state.account}).on('receipt', (r1) => {
      console.log(r1)
      this.state.Pool.methods.redeemAlgorithmicWUSD(WUSD_amount, WMF_out_min).send({from: this.state.account}).on('receipt', (r2) => {
        console.log(r2)
        this.loadBlockchainData()
        this.setState({loading: false})
      })
    })
  }

  recollateralizeWUSD = (MockDai_amount, WMF_out_min) => {
    this.setState({loading:true})
    this.state.MockDaiToken.methods.approve(this.state.Pool._address, MockDai_amount).send({from: this.state.account}).on('receipt', (r1) => {
      console.log(r1)
      this.state.Pool.methods.recollateralizeWUSD(MockDai_amount, WMF_out_min).send({from: this.state.account}).on('receipt', (r2) => {
        console.log(r2)
        this.loadBlockchainData()
        this.setState({loading: false})
      })
    })
  }

  buyBackWMF = (WMF_amount, MockDai_out_min) => {
    this.setState({loading:true})
    this.state.WMFToken.methods.approve(this.state.Pool._address, WMF_amount).send({from: this.state.account}).on('receipt', (r1) => {
      console.log(r1)
      this.state.Pool.methods.recollateralizeWUSD(WMF_amount, MockDai_out_min).send({from: this.state.account}).on('receipt', (r2) => {
        console.log(r2)
        this.loadBlockchainData()
        this.setState({loading: false})
      })
    })
  }
  
  // Farm
  userInfo = async () => {
    let userInfo = await this.state.Farm.methods.userInfo(0, this.state.account).call()
    let farmWMFPerSecond = await this.state.Farm.methods.WMFPerSecond().call()
    let farmInfo = await this.state.Farm.methods.poolInfo(0).call()
    let farmPendingWMF = await this.state.Farm.methods.pendingWMF(0, this.state.account).call()
    let {lpSupply} = farmInfo
    let farmLPSupply = lpSupply
    const {amount, rewardDebt} = userInfo
    let farmAmount = amount
    let farmRewardDebt = rewardDebt
    this.setState({farmAmount, farmRewardDebt, farmWMFPerSecond, farmLPSupply, farmPendingWMF})
    this.setState({loading:false})
  }

  farmDeposit = (deposit_amount) => {
    this.setState({loading:true})
    this.state.WMF_WETH_Pair.methods.approve(this.state.Farm._address, deposit_amount).send({from: this.state.account}).on('receipt', (r1)=>{
      console.log(r1)
      this.state.Farm.methods.deposit(0, deposit_amount).send({from: this.state.account}).on('receipt', (r2) =>{
        console.log(r2)
        this.loadBlockchainData()
        this.userInfo()
        this.setState({loading: false})
      })
    })
  }

  farmWithdraw = (withrdaw_amount) => {
    this.setState({loading:true})
    this.state.Farm.methods.withdraw(0, withrdaw_amount).send({from: this.state.account}).on('receipt', (r1) => {
      console.log(r1)
      this.loadBlockchainData()
      this.userInfo()
      this.setState({loading: false})
    })
  }

  farmHarvest = () => {
    this.setState({loading:true})
    this.state.Farm.methods.withdraw(0, 0).send({from: this.state.account}).on('receipt', (r1) => {
      console.log(r1)
      this.loadBlockchainData()
      this.userInfo()
      this.setState({loading: false})
    })
  }



  render() {
    return (
      <>
        <Navigation loading={this.state.loading}WMFTokenBalance={this.state.WMFTokenBalance} WUSDTokenBalance={this.state.WUSDTokenBalance}/>
        <Routes>
         
          <Route path='/' element = {<Home/>}/>
          <Route path='/pool/mint' element={
            <Pool
            heading='MINT'
            loading={this.state.loading}
            WUSDTokenPrice={this.state.WUSDTokenPrice}
            WMFTokenPrice={this.state.WMFTokenPrice}
            collateralRatio={this.state.collateralRatio}
            box={<MintBoxes 
              collateralRatio={this.state.collateralRatio}
              mint1t1WUSD={this.mint1t1WUSD}
              mintAlgorithmicWUSD={this.mintAlgorithmicWUSD}
              mintFractionalWUSD={this.mintFractionalWUSD}
              MockDaiTokenBalance={this.state.MockDaiTokenBalance}
              WUSDTokenBalance={this.state.WUSDTokenBalance}
              WMFTokenBalance={this.state.WMFTokenBalance}
              />}

            />
          } />
          <Route path='/pool/redeem' element={
            <Pool
            heading='REDEEM'
            loading={this.state.loading}
            WUSDTokenPrice={this.state.WUSDTokenPrice}
            WMFTokenPrice={this.state.WMFTokenPrice}
            collateralRatio={this.state.collateralRatio}
            box={<RedeemBoxes 
              collateralRatio={this.state.collateralRatio}
              MockDaiTokenBalance={this.state.MockDaiTokenBalance}
              WUSDTokenBalance={this.state.WUSDTokenBalance}
              WMFTokenBalance={this.state.WMFTokenBalance}
              redeem1t1WUSD={this.redeem1t1WUSD}
              redeemAlgorithmicWUSD={this.redeemAlgorithmicWUSD}
              redeemFractionalWUSD={this.redeemFractionalWUSD}
              />}          
            />
          } />  
          <Route path='/pool/others' element={
            <Pool
            heading='RECOLLATERALIZE/BUYBACK'
            loading={this.state.loading}
            WUSDTokenPrice={this.state.WUSDTokenPrice}
            WMFTokenPrice={this.state.WMFTokenPrice}
            collateralRatio={this.state.collateralRatio}
            box={<OtherBoxes 
              MockDaiTokenBalance={this.state.MockDaiTokenBalance}
              WUSDTokenBalance={this.state.WUSDTokenBalance}
              WMFTokenBalance={this.state.WMFTokenBalance}
              collateralRatio={this.state.collateralRatio}
              recollateralizeWUSD={this.recollateralizeWUSD}
              buyBackWMF={this.buyBackWMF}
              />}
            />
          } />  
          <Route path='/game' element={
            this.state.loading 
            ? <GameLoading
                // balance={this.state.WMFTokenBalance}
                // maxBet={this.state.bettingGameMaxBet}
                // minBet={this.state.bettingGameMinBet}
                web3={this.state.web3}
              />
            : <Game
                amount={this.state.amount}
                balance={this.state.WMFTokenBalance}
                makeBet={this.makeBet}
                onChange={this.onChange}
                maxBet={this.state.bettingGameMaxBet}
                minBet={this.state.bettingGameMinBet}
                web3={this.state.web3}
                loading={this.state.loading}
              />   
          }  
              />
          <Route path='/swap' element={<ComingSoon/>}/>
          <Route path='/farm' element={
          <Farm heading='FARM' loading={this.state.loading}
          box={<FarmBox
            WMFTokenPrice={this.state.WMFTokenPrice}
            PairTokenBalance={this.state.PairTokenBalance}
            farmWMFPerSecond={this.state.farmWMFPerSecond}
            farmLPSupply={this.state.farmLPSupply}
            farmPendingWMF={this.state.farmPendingWMF}
            farmAmount={this.state.farmAmount}
            farmRewardDebt={this.state.farmRewardDebt}
            farmDeposit={this.farmDeposit}
            farmWithdraw={this.farmWithdraw}
            farmHarvest={this.farmHarvest}
            />}
          />
          }/>
          <Route path='/nft' element={<ComingSoon/>}/>
        </Routes>
      </>
    );
  }
}

export default App;