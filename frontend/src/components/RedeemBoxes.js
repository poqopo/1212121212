import React from 'react'
import './css/RedeemBoxes.css'

const RedeemBoxes = (props) => {
    //props will be collateral ratio
    let WUSDTokenBalance = Number(window.web3.utils.fromWei(props.WUSDTokenBalance, 'Ether')).toFixed(2)
    let amount1 = 0;
    let minAmount1 = 0;
    let amount2wusd = 0;
    let amount2mdai = 0;
    let minAmount2 = 0;
    let amount3 = 0;
    let minAmount3 = 0;
    return(
        <div className='box-group'>
            <div className='box box1'>
                <div className='title'>WUSD to DAI</div>
                <div className='form-div'>
                <form onSubmit={(event) => {
                event.preventDefault()
                let amountInEth = window.web3.utils.toWei(amount1.toString(), 'Ether')
                let minAmountInEth = window.web3.utils.toWei(minAmount1.toString(), 'Ether')
                props.redeem1t1WUSD(amountInEth, minAmountInEth)
              }}>
                    <div className='form-text'>Amount(WUSD): </div>
                    <input
                    type="number"
                    step="0.01"
                    min={0}
                    max={WUSDTokenBalance}
                    onChange={(i) => amount1 = i.target.value}
                    placeholder="0"
                    required />
                    <hr/>
                    <div className='form-text'>Min Receive(DAI): </div>
                    <input type="number"
                    step="0.01"
                    min={0}
                    onChange={(i)=> minAmount1 = i.target.value}
                    placeholder="0"
                    required/>
                <button type="submit" className="button" disabled={!(+props.collateralRatio === 1000000)}>{+props.collateralRatio === 1000000? 'REDEEM' : 'DISABLED'}</button>
                </form>
                </div>
            </div>
            <div style={{height:'100%'}}className='box box2'>
                <div className='title'>Fractional (DAI & WMF)</div>
                <div className='form-div'>
                <form onSubmit={(event) => {
                event.preventDefault()
                let WUSDAmountInEth = window.web3.utils.toWei(amount2wusd.toString(), 'Ether')
                let MDAIAmountInEth = window.web3.utils.toWei(amount2mdai.toString(), 'Ether')
                let minAmountInEth = window.web3.utils.toWei(minAmount2.toString(), 'Ether')
                props.redeemFractionalWUSD(WUSDAmountInEth, MDAIAmountInEth, minAmountInEth)
                }}>
                    <div className='form-text'>Amount(WUSD): </div>
                    <input
                    type="number"
                    step="0.01"
                    min={0}
                    max={WUSDTokenBalance}
                    onChange={(i) => amount2wusd = i.target.value}
                    placeholder="0"
                    required />
                    <hr/>
                    <div className='form-text'>Min Receive(DAI): </div>
                    <input type="number"
                    step="0.01"
                    min={0}
                    onChange={(i)=> amount2mdai = i.target.value}
                    placeholder="0"
                    required/>
                    <div style={{height:'10px'}}/>
                    <div className='form-text'>Min Receive(WMF): </div>
                    <input type="number"
                    step="0.01"
                    min={0}
                    onChange={(i)=> minAmount2 = i.target.value}
                    placeholder="0"
                    required/>
                <button type="submit" className="button" disabled={!(1000000 > +props.collateralRatio && +props.collateralRatio > 0)}>{(1000000 > +props.collateralRatio && +props.collateralRatio > 0)? 'REDEEM' : 'DISABLED'}</button>
                </form>
                <button className = "button" style={{fontSize:'1rem', marginTop:'0'}} onClick={(e)=>{props.collectRedemption()}}>COLLECT REDEMPTION</button>
                </div>
            </div>
            <div className='box box3'>
                <div className='title'>WUSD to WMF</div>
                <div className='form-div'>
                <form onSubmit={(event) => {
                event.preventDefault()
                let amountInEth = window.web3.utils.toWei(amount3.toString(), 'Ether')
                let minAmountInEth = window.web3.utils.toWei(minAmount3.toString(), 'Ether')
                props.redeemAlgorithmicWUSD(amountInEth, minAmountInEth)
                }}>
                    <div className='form-text'>Amount(WUSD): </div>
                    <input
                    type="number"
                    step="0.01"
                    min={0}
                    max={WUSDTokenBalance}
                    onChange={(i) => amount3 = i.target.value}
                    placeholder="0"
                    required />
                    <hr/>
                    <div className='form-text'>Min Receive(WMF): </div>
                    <input type="number"
                    step="0.01"
                    min={0}
                    onChange={(i)=> minAmount3 = i.target.value}
                    placeholder="0"
                    required/>
                <button type="submit" className="button" disabled={!(+props.collateralRatio === 0)}>{+props.collateralRatio === 0? 'REDEEM' : 'DISABLED'}</button>
                </form>
                </div>
            </div>
        </div>
    ) 
}

export default RedeemBoxes