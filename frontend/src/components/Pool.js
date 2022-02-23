import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import './css/Pool.css'


class Pool extends Component {
  render() {
    let content
    let box = this.props.box
    if (this.props.loading){
      content = <div id="loader">Loading...</div>
    }
    else{
      content = 
      <div id="content" style={{margin:'0px'}}>
        <h1>{this.props.heading}</h1>
        <div className='info_title'>
          <div className='heading'>
            WUSD Price: {this.props.wusdPrice? this.props.wusdPrice : '---' } ($)
          </div>
          <div className='heading'>
            Collateral Ratio: {(+this.props.collateralRatio / 1000000).toFixed(4)}  (Goal: 0.9900)
          </div>
        </div>
          {box}
      </div>
    }
    return (
      <div className='bg'>
        <Container>
          {content}
        </Container>
      </div>
    );
  }
}

export default Pool;