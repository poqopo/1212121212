import dice_rolling from '../images/dice_rolling.gif';
import React, { Component } from 'react';
import eth from '../images/eth.png';
import { Container } from 'react-bootstrap';
class GameLoading extends Component {

  render() {
    return (
      <div className='bg'>
      <Container>
      <div className="container-fluid mt col-m-4" style={{ maxWidth: '550px' }}>
        <div className="col-sm">
          <main role="main" className="col-lg-12 text-monospace text-center text-white">
            <div className="content mr-auto ml-auto">
              <div id="content" className="mt-3">
                <div className="card mb-4 bg-dark">
                  <div className="card-body">
                    <div>
                      <a
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                        <img src={dice_rolling} width="225" alt="logo" />
                      </a>
                    </div>
                    &nbsp;
                    <p></p>
                    <div className="input-group mb-4">
                        <input
                          id="disabledInput"
                          type="text"
                          className="form-control form-control-md"
                          placeholder="rolling..."
                          disabled
                        />
                        <div className="input-group-append">
                          <div className="input-group-text">
                            <img src={eth} height="20" alt=""/>&nbsp;<b>WMF</b>
                          </div>
                        </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-secondary btn-lg"
                      onClick={(event) => {
                      }}>
                        Low
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      type="submit"
                      className="btn btn-secondary btn-lg"
                      onClick={(event) => {
                      }}>
                        High
                    </button>
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

export default GameLoading;