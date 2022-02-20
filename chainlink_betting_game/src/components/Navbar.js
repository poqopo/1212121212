import React, { Component } from 'react';
import dice_logo from '../logos/dice_logo.png';

class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow text-monospace">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          target="_blank"
          //home으로 리 다이렉 해주게 바꿀까?
          rel="noopener noreferrer"
        >
        <img src={dice_logo} height="32" alt="logo" />
          WMF GAME
        </a>
        {!this.props.account ? <div id="loader" className="spinner-border text-light" role="status"></div> :
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            <a
              className="text-white"
              href={"https://rinkeby.etherscan.io/address/" + this.props.account}
              target="_blank"
              rel="noopener noreferrer"
            >
              YOUR ACCOUNT:{(this.props.account)}
            </a>&nbsp;
          </li>
        }
      </nav>
    );
  }
}

export default Navbar;