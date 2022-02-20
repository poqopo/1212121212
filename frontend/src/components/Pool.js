import React, { Component } from 'react'
import './css/Pool.css'


class Pool extends Component {
  render() {
    let content
    let box = this.props.box
    if (this.props.loading){
      content = <p id="loader" className="text-center">Loading...</p>
    }else{
      content = 
      <div id="content" className="mt-3">
        <h1>Minting</h1>
        <div className='info_title'>
          <div className='heading'>
            WUSD Price:
          </div>
          <div className='heading'>
            Collateral Ratio:  (goal: )
          </div>
        </div>
          {box}
      </div>
    }
    return (
      <>
        {content}
      </>
    );
  }
}

export default Pool;