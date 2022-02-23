import React from 'react'
import './css/OtherBoxes.css'

const OtherBoxes = (props) => {
    //props will be collateral ratio
    console.log(+props.collateralRatio)
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
                    <div className='form-text'>Min Receive(WMF): </div>
                    <input type="number"
                    step="10"
                    min={0}
                    onChange={(i)=> minAmount1 = i.target.value}
                    placeholder="0"
                    required/>
                <button type="submit" className="button" style={{fontSize:'1.2rem'}}>RECOLLATERALIZE</button>
                </form>
                </div>
            </div>
            <div className='box box3'>
                <div className='title'>Buyback</div>
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
                    <div className='form-text'>Min Receive(DAI): </div>
                    <input type="number"
                    step="10"
                    min={0}
                    onChange={(i)=> minAmount3 = i.target.value}
                    placeholder="0"
                    required/>
                <button type="submit" className="button" >BUYBACK</button>
                </form>
                </div>
            </div>
        </div>
    ) 
}

export default OtherBoxes