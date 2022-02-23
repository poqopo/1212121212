import React from 'react'
import './css/OtherBoxes.css'

const OtherBoxes = (props) => {
    let MockDaiTokenBalance = Number(window.web3.utils.fromWei(props.MockDaiTokenBalance, 'Ether')).toFixed(2)
    let WMFTokenBalance = Number(window.web3.utils.fromWei(props.WMFTokenBalance, 'Ether')).toFixed(2)
    let amount1 = 0;
    let minAmount1 = 0;
    let amount3 = 0;
    let minAmount3 = 0;
    return(
        <div className='box-group'>
            <div className='box box1'>
                <div className='title'>Recollateralize</div>
                <div className='form-div'>
                <form onSubmit={(event) => {
                event.preventDefault()
                let amountInEth = window.web3.utils.toWei(amount1.toString(), 'Ether')
                let minAmountInEth = window.web3.utils.toWei(minAmount1.toString(), 'Ether')
                props.recollateralizeWUSD(amountInEth, minAmountInEth)
              }}>
                    <div className='form-text'>Amount(DAI): </div>
                    <input
                    type="number"
                    step="0.01"
                    min={0}
                    max={MockDaiTokenBalance}
                    onChange={(i) => amount1 = i.target.value}
                    placeholder="0"
                    required />
                    <hr/>
                    <div className='form-text'>Min Receive(WMF): </div>
                    <input type="number"
                    step="0.01"
                    min={0}
                    onChange={(i)=> minAmount1 = i.target.value}
                    placeholder="0"
                    required/>
                <button type="submit" className="button" style={{fontSize:'1.2rem'}} disabled={true}>DISABLED</button>
                </form>
                </div>
            </div>
            <div className='box box3'>
                <div className='title'>Buyback</div>
                <div className='form-div'>
                <form onSubmit={(event) => {
                event.preventDefault()
                let amountInEth = window.web3.utils.toWei(amount3.toString(), 'Ether')
                let minAmountInEth = window.web3.utils.toWei(minAmount3.toString(), 'Ether')
                props.buyBackWMF(amountInEth, minAmountInEth)
                }}>
                    <div className='form-text'>Amount(WMF): </div>
                    <input
                    type="number"
                    step="0.01"
                    min={0}
                    max={WMFTokenBalance}
                    onChange={(i) => amount3 = i.target.value}
                    placeholder="0"
                    required />
                    <hr/>
                    <div className='form-text'>Min Receive(DAI): </div>
                    <input type="number"
                    step="0.01"
                    min={0}
                    onChange={(i)=> minAmount3 = i.target.value}
                    placeholder="0"
                    required/>
                <button type="submit" className="button"disabled={!(+props.collateralRatio > 1000000)}>{+props.collateralRatio > 1000000? 'BUYBACK' : 'DISABLED'}</button>
                </form>
                </div>
            </div>
        </div>
    ) 
}

export default OtherBoxes