import React from 'react'
import './css/FarmBox.css'

const FarmBox = (props) => {
    console.log(props.farmAmount)
    let PairTokenBalance = Number(window.web3.utils.fromWei(props.PairTokenBalance, 'Ether')).toFixed(2)
    let farmAmountInEth = Number(window.web3.utils.fromWei(props.farmAmount, 'Ether')).toFixed(2)
    let farmRewardDebtInEth = Number(window.web3.utils.fromWei(props.farmRewardDebt, 'Ether')).toFixed(2)

    let withdrawAmount = 0;
    let stakeAmount = 0;
    return(
        <>
        <div className='fbox-group'>
            <div className='fbox fbox2 farmbox'>
                <div className='title'>WMF-WETH PAIR</div>
                <div className='farmform-div'>
                    <div className='form-text la'>
                        <div>Staking:</div> <div>{farmAmountInEth}</div>
                        </div>
                    <div className='form-text la'>
                    <div>APR:</div> <div>{(((+props.farmWMFPerSecond*3600*24* +props.WMFTokenPrice)/(+props.farmLPSupply*30000000))*36500).toFixed(2)} %</div>
                    </div>
                    <hr id="divider"/>
                    <div className='form-text farm-form'>
                        <form onSubmit={(event) => {
                            event.preventDefault()
                            props.farmHarvest()
                        }}>
                        <div className='label-text'>Earned: </div>
                        <div>{farmRewardDebtInEth}</div>
                        <button type='submit' className="button2">HARVEST</button>
                        </form>
                    </div> 
                    <div className='form-text farm-form'>
                        <form onSubmit={(event) => {
                            event.preventDefault()
                            let amountInEth = window.web3.utils.toWei(stakeAmount.toString(), 'Ether')
                            props.farmWDeposit(amountInEth)
                        }}>
                        <div className='label-text'>Amount: </div>
                        <input
                        type="number"
                        step="10"
                        min={0}
                        max={PairTokenBalance}
                        onChange={(i) => stakeAmount = i.target.value}
                        placeholder="0"
                        required />
                        <button type='submit' className="button2">STAKE</button>
                        </form>
                    </div>
                    <div className='form-text farm-form'>
                        <form onSubmit={(event) => {
                            event.preventDefault()
                            let amountInEth = window.web3.utils.toWei(withdrawAmount.toString(), 'Ether')
                            props.farmWithdraw(amountInEth)
                        }}>
                        <div className='label-text'>Amount: </div>
                        <input
                        type="number"
                        step="10"
                        min={0}
                        max={farmAmountInEth}
                        onChange={(i) => withdrawAmount = i.target.value}
                        placeholder="0"
                        required />
                        <button type='submit' className="button2">WITHDRAW</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    ) 
}

export default FarmBox