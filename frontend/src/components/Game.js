import React, { Component } from 'react';
import dice from '../images/dice.webp';
import eth from '../images/eth.png';
import { Container } from 'react-bootstrap'
import './css/Game.css'
class Game extends Component {

  render() {
    return (
      <div className='bg'>
        <Container>
      <div className="container-fluid mt-1 col-m-4" style={{ maxWidth: '550px' }}>
        <div className="col-sm ">
          <main role="main" className="col-lg-12 text-monospace text-center text-white">
            <div className="content mr-auto ml-auto">
              <div id="content" className="mt-1" >
                <div className="card mb-4 bg-dark">
                  <div className="card-body" style={{backgroundColor :'#0CADA7'}} >
                    <div>
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img src={dice} width="225" alt="logo" />
                      </a>
                    </div>
                    &nbsp;
                    <p></p>
                    <div className="input-group mb-4">
                      <input
                        type="number"
                        step="0.01"
                        className="form-control form-control-md"
                        placeholder="bet amount..."
                        onChange={(e) => this.props.onChange(e.target.value)}
                        required
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <img src={eth} height="20" alt=""/>&nbsp;<b>WMF</b>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-danger btn-lg"
                      onClick={(event) => {
                        event.preventDefault()
                        var reg = new RegExp("^[0-9]*.?[0-9]+$")    

                        if(reg.test(this.props.amount)){
                          const amount = (this.props.amount).toString()
                          this.props.makeBet(0, this.props.web3.utils.toWei(amount) )
                        } else {
                          window.alert('Please type positive interger or float numbers')
                        }
                      }}>
                        Low
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      type="submit"
                      className="btn btn-success btn-lg"
                      onClick={(event) => {
                        event.preventDefault()
                        //start with digit, digit+dot* or single dot*, end with digit.
                        var reg = new RegExp("^[0-9]*.?[0-9]+$")
                        var minBet = Number(this.props.web3.utils.fromWei((this.props.minBet).toString())).toFixed(5)
                        
                        if(reg.test(this.props.amount) && this.props.amount>=minBet){
                          const amount = (this.props.amount).toString()
                          this.props.makeBet(1, this.props.web3.utils.toWei(amount))
                        } else {
                          window.alert('Please make sure that:\n*You typed positive interger or float number\n* Typed value is >= than MinBet (not all ETH decimals visible)\n* You are using Rinkeby network')
                        }
                      }}>
                        High
                    </button>
                  </div>
                  <div style={{backgroundColor :'#0CADA7'}}>
                    {!this.props.balance ? <div id="loader" className="spinner-border float-right" role="status"></div> :
                      <div className="float-right" style={{ width: '220px' }}>
                        <div className="float-left" style={{ height: '17px'}}>
                          <b>MaxBet&nbsp;</b>
                        </div>
                        <div className="float-right" style={{ height: '17px' }}>
                          {Number(this.props.web3.utils.fromWei((this.props.maxBet).toString())).toFixed(5)} <b>WMF&nbsp;</b>
                        </div>                      
                        <br></br>
                        <div className="float-left" style={{ height: '17px' }}>
                          <b>MinBet</b>&nbsp;
                        </div>
                        <div className="float-right" style={{ height: '17px' }}>
                          {Number(this.props.web3.utils.fromWei((this.props.minBet).toString())).toFixed(5)} <b>WMF&nbsp;</b>
                        </div>
                        <br></br>
                        <div className="float-left">
                          <b>Balance&nbsp;</b>
                        </div>
                        <div className="float-right">
                          {Number(this.props.web3.utils.fromWei((this.props.balance).toString())).toFixed(5)} <b>WMF&nbsp;</b>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      </Container>
      </div>
    );
  }
}

export default Game;