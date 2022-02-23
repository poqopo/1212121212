import React, { useState } from "react";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';


function Navigation(props){
    return(
    <div className="Navigation">
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/" >WMF</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Main</Nav.Link>
                    <Nav.Link href="/swap">Swap</Nav.Link>
                    <Nav.Link href="/farm">Farm</Nav.Link>
                    <NavDropdown title="Pool">
                        <NavDropdown.Item href="/pool/mint">Mint</NavDropdown.Item>
                        <NavDropdown.Item href="/pool/redeem">Redeem</NavDropdown.Item>
                        <NavDropdown.Item href="/pool/others">Others</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/game">P2E</Nav.Link>
                    <Nav.Link href="/nft">NFT market place</Nav.Link>
                </Nav>
                <div style={{color:'white'}}>WMF : {Number(window.web3.utils.fromWei(props.WMFTokenBalance, 'Ether')).toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} | WUSD : {Number(window.web3.utils.fromWei(props.WUSDTokenBalance, 'Ether')).toFixed(2).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</div>
            </Container>
        </Navbar>
  </div>
    );
}

export default Navigation