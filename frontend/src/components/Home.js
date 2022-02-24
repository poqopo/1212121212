import React from 'react'
import './css/Home.css'
import  farm from '../images/farm.png';
import game from '../images/game.png';
import launchpad from '../images/launchpad.png';
import nft from '../images/nft.png';

const Home = () => {
    return(
        <div className='bg'>
            <br></br>
            <br></br>
            <h2 className='wemadefuture'>WE MADE FUTURE</h2>
            <br></br>
            <h2 className='maintitle'>Features</h2>
            <br></br>
                <div className='imgbox'>
                    <div className='farm'>
                        <img className='farmimg' src={farm}></img>
                        <h5>Farm</h5>
                        <br></br>
                        <p>이자농사로 당신의 자산을 불려보세요!</p>
                    </div>
                    <div className='game'>
                        <img className='gameimg' src={game}></img>
                        <h5>P2E</h5>
                        <br></br>
                        <p>다양한 미니게임을 플레이하여 코인,NFT를 획득해보세요!</p>
                    </div>
                    <div className='nft'>
                        <img className='nftimg'src={nft}></img>
                        <h5>NFT marketplace</h5>
                        <br></br>
                        <p>Game,Launchpad를 통해 얻은 다양한 NFT를 마켓플레이스를 통해 거래해보세요!</p>
                    </div>
                    <div className='launchpad'>
                        <img className='launchpadimg'src={launchpad}></img>
                        <h5>Launchpad</h5>
                        <br></br>
                        <p>WMF를 스테이킹하여 앞으로 나올 게임의 코인,NFT를 얻어보세요!</p>
                    </div>
                    
                </div>
        

        </div>
    ) 
}

export default Home