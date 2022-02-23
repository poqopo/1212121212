import React from 'react'
import './css/MintBoxes.css'

const MintBoxes = (props) => {
    //props will be collateral ratio
    console.log(+props.collateralRatio)
    let amount1 = 0;
    let minAmount1 = 0;
    let amount2wmf = 0;
    let amount2mdai = 0;
    let minAmount2 = 0;
    let amount3 = 0;
    let minAmount3 = 0;
    return(
        <>
        <div className='box-group'>
            <div className='box box1'>
                <div className='title'>DAI to WUSD</div>
                <div className='form-div'>
                <form onSubmit={(event) => {
                event.preventDefault()
                let amountInEth = window.web3.utils.toWei(amount1.toString(), 'Ether')
                let minAmountIntEth = window.web3.utils.toWei(minAmount1.toString(), 'Ether')
                console.log(amountInEth)
                console.log(minAmountIntEth)
              }}>
                    <div className='form-text'>Amount(DAI): </div>
                    <input
                    type="number"
                    step="10"
                    min={0}
                    onChange={(i) => amount1 = i.target.value}
                    placeholder="0"
                    required />
                    <hr/>
                    <div className='form-text'>Min Receive(WUSD): </div>
                    <input type="number"
                    step="10"
                    min={0}
                    onChange={(i)=> minAmount1 = i.target.value}
                    placeholder="0"
                    required/>
                <button type="submit" className="button" disabled={!(+props.collateralRatio >= 1000000)}>{+props.collateralRatio >= 1000000? 'MINT' : 'DISABLED'}</button>
                </form>
                </div>
            </div>
            <div className='box box2'>
                <div className='title'>Fractional (DAI & WMF)</div>
                <div className='form-div'>
                <form onSubmit={(event) => {
                event.preventDefault()
                let WMFAmountInEth = window.web3.utils.toWei(amount2wmf.toString(), 'Ether')
                let MDAIAmountInEth = window.web3.utils.toWei(amount2mdai.toString(), 'Ether')
                let minAmountIntEth = window.web3.utils.toWei(minAmount2.toString(), 'Ether')
                console.log(WMFAmountInEth)
                console.log(MDAIAmountInEth)
                console.log(minAmountIntEth)
                }}>
                    <div className='form-text'>Amount(DAI): </div>
                    <input
                    type="number"
                    step="10"
                    min={0}
                    onChange={(i) => amount2mdai = i.target.value}
                    placeholder="0"
                    required />
            
                    <div className='form-text'>Amount(WMF): </div>
                    <input type="number"
                    step="10"
                    min={0}
                    onChange={(i)=> amount2wmf = i.target.value}
                    placeholder="0"
                    required/>
                    <hr/>
                    <div className='form-text'>Min Receive(WUSD): </div>
                    <input type="number"
                    step="10"
                    min={0}
                    onChange={(i)=> minAmount2 = i.target.value}
                    placeholder="0"
                    required/>
                <button type="submit" className="button" disabled={!(1000000 > +props.collateralRatio && +props.collateralRatio > 0)}>{(1000000 > +props.collateralRatio && +props.collateralRatio > 0)? 'MINT' : 'DISABLED'}</button>
                </form>
                </div>
            </div>
            <div className='box box3'>
                <div className='title'>WMF to WUSD</div>
                <div className='form-div'>
                <form onSubmit={(event) => {
                event.preventDefault()
                let amountInEth = window.web3.utils.toWei(amount3.toString(), 'Ether')
                let minAmountIntEth = window.web3.utils.toWei(minAmount3.toString(), 'Ether')
                console.log(amountInEth)
                console.log(minAmountIntEth)
                }}>
                    <div className='form-text'>Amount(WMF): </div>
                    <input
                    type="number"
                    step="10"
                    min={0}
                    onChange={(i) => amount3 = i.target.value}
                    placeholder="0"
                    required />
                    <hr/>
                    <div className='form-text'>Min Receive(WUSD): </div>
                    <input type="number"
                    step="10"
                    min={0}
                    onChange={(i)=> minAmount3 = i.target.value}
                    placeholder="0"
                    required/>
                <button type="submit" className="button" disabled={!(+props.collateralRatio === 0)}>{+props.collateralRatio === 0? 'MINT' : 'DISABLED'}</button>
                </form>
                </div>
            </div>
        </div>
        </>
    ) 
}

export default MintBoxes