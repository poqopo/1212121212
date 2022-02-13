import React, { Component } from 'react'
import Web3 from 'web3'
import WUSDStablecoin from './abis/WUSDStablecoin.json'
import We_Made_Future from './abis/We_Made_Future.json'
import MockDai from './abis/MockDai.json'
import WUSDPool from './abis/WUSDPool.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      WUSDToken: {},
      WMFToken: {},
      MockDaiToken: {},
      WUSDTokenBalance: '',
      WMFTokenBalance: '',
      MockDaiTokenBalance: {},
      Pool: {},
      mintPaused: false,
      redeemPaused: false,
      loading: true
    }
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
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
      this.setState({ WUSDToken })
      let WUSDTokenBalance = await WUSDToken.methods.balanceOf(this.state.account).call()
      this.setState({ WUSDTokenBalance: WUSDTokenBalance.toString() })
    } else {
      window.alert('WUSDStablecoin contract not deployed to detected network.')
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
      this.setState({ WMFToken })
      let WMFTokenBalance = await WMFToken.methods.balanceOf(this.state.account).call()
      this.setState({ WMFTokenBalance: WMFTokenBalance.toString() })
    } else {
      window.alert('We_Made_Future contract not deployed to detected network.')
    }

    // Load WUSDPool
    const WUSDPoolData = WUSDPool.networks[networkId]
    if(WUSDPoolData) {
      const Pool = new web3.eth.Contract(WUSDPool.abi, WUSDPoolData.address)
      this.setState({ Pool })
      let mintPaused = await Pool.methods.mintPaused().call()
      this.setState({ mintPaused: mintPaused.toString() }) // Parameter 오류
      let redeemPaused = await Pool.methods.redeemPaused().call()// Parameter 오류
      this.setState({ redeemPaused: redeemPaused.toString() }) 
    } else {
      window.alert('WUSDPool contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  transferTest = () => {
    this.setState({loading:true})
      this.state.WUSDToken.methods.transfer('0xb682C6091DEaE7D072b9DF6098218D5c3f438cE8', window.web3.utils.toWei('100'))
      .send({from:this.state.account})
      .on('receipt', (receipt => {
        this.loadBlockchainData()
        this.setState({loading: false})
      }))
      .on('error', err =>{
        this.loadBlockchainData()
        this.setState({loading: false})
        window.alert("Error났당")
      })
  }

  mint1t1WUSD = (WMF_amount_d18, WUSD_out_min) => {
  
  }

  mintAlgorithmicWUSD = (collateral_amount, WUSD_out_min) => {
  }

  // mock 99.75  wmf 0.25 wusd 100
  // mock 99.75 wmf many wusd 100
  // 90 100 1
  mintFractionalWUSD = (MockDai_amount, WMF_amount, WUSD_out_min) => {
    this.setState({ loading: true })
    this.state.MockDaiToken.methods.approve(this.state.Pool._address, MockDai_amount).send({from: this.state.account})
    .on('error',() => {
      this.loadBlockchainData()
      this.setState({loading: false})
      console.log('error남')
    })
    .on('receipt', () => {
      this.state.WMFToken.methods.approve(this.state.Pool._address, WMF_amount).send({from: this.state.account}).on('receipt', () =>{
        this.state.Pool.methods.mintFractionalWUSD(MockDai_amount, WMF_amount, WUSD_out_min).send({from: this.state.account})
        .on('transactionHash', (hash) => {console.log(hash)})
        .on('receipt', (receipt) => {
          console.log(receipt)
          this.loadBlockchainData()
          this.setState({loading: false})
        })
      }
    )})
  }

  redeem1t1WUSD = (WUSD_amount, COLLATERAL_out_min) => {
  
  }

  redeemAlgorithmicWUSD = (WUSD_amount, WMF_out_min) => {

  }

  redeemFractionalWUSD = (WUSD_amount, WMF_out_min, COLLATERAL_out_min) => {
  
  }

  recollateralizeWUSD = (collateral_amount, WMF_out_min) => {
  
  }

  buyBackWMF = (WMF_amount, COLLATERAL_out_min) => {

  }

  

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        MockDaiTokenBalance={this.state.MockDaiTokenBalance}
        WUSDTokenBalance={this.state.WUSDTokenBalance}
        WMFTokenBalance={this.state.WMFTokenBalance}
        mint1t1WUSD={this.mint1t1WUSD}
        mintAlgorithmicWUSD={this.mintAlgorithmicWUSD}
        mintFractionalWUSD={this.mintFractionalWUSD}
        redeem1t1WUSD={this.redeem1t1WUSD}
        redeemAlgorithmicWUSD={this.redeemAlgorithmicWUSD}
        redeemFractionalWUSD={this.redeemFractionalWUSD}
        recollateralizeWUSD={this.recollateralizeWUSD}
        buyBackWMF={this.buyBackWMF}
        mintPaused={this.state.mintPaused}
        transferTest={this.transferTest}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;