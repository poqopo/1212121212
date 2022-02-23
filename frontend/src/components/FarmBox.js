import React from 'react'
import './css/FarmBox.css'

const FarmBox = (props) => {
    let amount2wmf = 0;
    let amount2mdai = 0;
    let minAmount2 = 0;
    return(
        <>
        <div className='fbox-group'>
            <div className='fbox fbox2 farmbox'>
                <div className='title'>WMF-WETH</div>
                <div className='farmform-div'>
                    <div className='form-text la'>
                        <div>Staking:</div> <div>0</div>
                        </div>
                    <div className='form-text la'>
                    <div>APR:</div> <div>0</div>
                    </div>
                    <hr id="divider"/>
                    <div className='form-text farm-form'>
                        <form>
                        <div className='label-text'>Earned: </div>
                        <div>1000</div>
                        <button type='submit' className="button2">HARVEST</button>
                        </form>
                    </div> 
                    <div className='form-text farm-form'>
                        <form>
                        <div className='label-text'>Amount: </div>
                        <input
                        type="number"
                        step="10"
                        min={0}
                        max={100000}//여기를 balance값으로 ㅇㅇ
                        onChange={(i) => amount2mdai = i.target.value}
                        placeholder="0"
                        required />
                        <button type='submit' className="button2">STAKE</button>
                        </form>
                    </div>
                    <div className='form-text farm-form'>
                        <form>
                        <div className='label-text'>Amount: </div>
                        <input
                        type="number"
                        step="10"
                        min={0}
                        max={100000}//여기를 balance값으로 ㅇㅇ
                        onChange={(i) => amount2mdai = i.target.value}
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