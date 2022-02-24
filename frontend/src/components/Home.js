import React from 'react'
import './css/Home.css'
import { Container } from 'react-bootstrap'
import  farm from '../images/farm.png';
import game from '../images/game.png';
import launchpad from '../images/launchpad.png';
import nft from '../images/nft.png';

const Home = () => {
    return(
        <div className='home'>
            <Container>
            <br></br>
            <br></br>
            <h2 className='wemadefuture'>WE MADE FUTURE</h2>
            <br></br>
            <p className='wemadefuture' style={{fontSize:'1.5rem', color:'#ddffff'}}>We Made Future is a GameFi Project aiming to integrate DeFi, Games, and Marketplaces into a unified system.<br/> The project provides a stable tokenomics powered by dual tokens, which includes a utilization of fractional-algorithmic stablecoin back by collateral.</p>
            <br/><br/><br/>
            <h2 className='maintitle'>Features</h2>
            <br/>
                <div className='imgbox'>
                    <div className='imgs farm'>
                        <img className='farmimg' src={farm}></img>
                        <h5>Farm</h5>
                        <p>Increase your assets by collecting interest thorugh staking!</p>
                    </div>
                    <div className='imgs game'>
                        <img className='gameimg' src={game}></img>
                        <h5>P2E</h5>
                     
                        <p>Play various mini games and win tokens and NFTs as rewards!</p>
                    </div>
                    <div className='imgs nft'>
                        <img className='nftimg'src={nft}></img>
                        <h5>NFT Marketplace</h5>
                        
                        <p>Buy and sell NFTs with players on the Marketplace!</p>
                    </div>
                    <div className='imgs launchpad'>
                        <img className='launchpadimg'src={launchpad}></img>
                        <h5>Pool</h5>
                        <p>Exchange freely: Mint, Redeem, Recollateralize, and Buyback! </p>
                    </div>
                </div>
                <br/><br/>
                <h2 className='maintitle' style={{fontSize:'28px'}}>Token Contracts</h2>
                <br/>
                <div className='imgbox' style={{justifyContent:'center'}}>
                    <div className='imgs farm' style={{margin:'0 2%', width: '18%'}}>
                        <h5>WMF</h5>
                        <p><span style={{fontSize:'1.1rem'}}>Rinkeby Testnet</span><br/><a style={{ color:'#ddffff'}} target='_blank' href='https://rinkeby.etherscan.io/address/0x040d87e9A4f44dF98b67C60B47515019975E7ad7'>0x040d87e9A4f44dF98b67C60B47515019975E7ad7</a></p>
                    </div>
                    <div className='imgs game' style={{margin:'0 2%', width: '18%'}}>
                        <h5>WUSD</h5>                   
                        <p><span style={{fontSize:'1.1rem'}}>Rinkeby Testnet</span><br/><a style={{ color:'#ddffff'}} target='_blank' href='https://rinkeby.etherscan.io/address/0xB7FB1bb06a10f7Ec53CaC0Bf29d7d7c058A47dE8'>0xB7FB1bb06a10f7Ec53CaC0Bf29d7d7c058A47dE8</a></p>

                    </div>
                    <div className='imgs nft' style={{margin:'0 2%', width: '18%'}}>
                        <h5>MDAI</h5>         
                        <p><span style={{fontSize:'1.1rem'}}>Rinkeby Testnet</span><br/><a style={{ color:'#ddffff'}} target='_blank' href='https://rinkeby.etherscan.io/address/0x0feB3a8702F4943aA3e502369fEda55258f1a018'>0x0feB3a8702F4943aA3e502369fEda55258f1a018</a></p>

                    </div>
                    
                </div>
                <br/>
                <p className='maintitle' style={{fontSize:'1.2rem', color:'#ddffff'}}>* You can earn each token by swapping tokens at <a style={{color:'#ddffff' }} target='_blank' href='https://app.uniswap.org/#/pool?chain=rinkeby'>UniSwap-V3</a></p>
                
                <br/><br/>
                </Container>
        </div>
        
    ) 
}

export default Home