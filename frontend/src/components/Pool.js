import React, { Component } from 'react'
import './css/Main.css'


class Pool extends Component {
  render() {
    return (
      <div id="content" className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">MockDai Balance</th>
              <th scope="col">WUSD Balance</th>
              <th scope="col">WMF Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td>{window.web3.utils.fromWei(this.props.WUSDTokenBalance, 'WUSD')} WUSD</td>
              <td>{window.web3.utils.fromWei(this.props.WMFTokenBalance, 'WMF')} DAPP</td> */}
              <td>{window.web3.utils.fromWei(this.props.MockDaiTokenBalance, 'Ether')} MockDai</td>
              <td>{window.web3.utils.fromWei(this.props.WUSDTokenBalance, 'Ether')} WUSD</td>
              <td>{window.web3.utils.fromWei(this.props.WMFTokenBalance, 'Ether')} WMF</td>
            </tr>
          </tbody>
        </table>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let amount
                amount = this.input.value.toString()
                // amount = window.web3.utils.toWei(amount, 'Ether')
                console.log(amount)
                // this.props.mintAlgorithmicWUSD(amount)
              }}>
              <div>
                <label className="float-left"><b>Stake Tokens</b></label>
                <div className="float-right text-muted">
                  Balance: {window.web3.utils.fromWei(this.props.WUSDTokenBalance, 'Ether')}
                </div>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="0"
                  required />
               
              </div>
              <button type="submit" className="test">Console log text</button>
            </form>
            
              <a href="/" className="button">asdf</a>
          </div>
        </div>

      </div>
    );
  }
}

export default Pool;