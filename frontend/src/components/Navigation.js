import React from "react";
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import logo from '../images/Symbol_Circle.png'


function Navigation(props){
    let wmfBalance = props.WMFTokenBalance === '-'? '----': Number(window.web3.utils.fromWei(props.WMFTokenBalance, 'Ether')).toFixed(0).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    let wusdBalance = props.WUSDTokenBalance === '-'? '----': Number(window.web3.utils.fromWei(props.WUSDTokenBalance, 'Ether')).toFixed(0).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    return(
    <div className="Navigation">
        <Navbar bg="dark" variant="dark" style={{boxShadow:'0px 1px 6px 3px #252525a6'}}>
            <Container>
                <Navbar.Brand style={{display:'flex', alignItems:'center', fontFamily:'WMF'}} href="/" ><img style={{width:'28px',height:'28px',marginRight:'8px'}} src={logo}></img> WMF</Navbar.Brand>
                <Nav className="me-auto"    >
                    <Nav.Link href="/" active={window.location.pathname === '/'}>Main</Nav.Link>
                    <Nav.Link href="/swap" active={window.location.pathname.includes('/swap')}>Swap</Nav.Link>
                    <Nav.Link href="/farm" active={window.location.pathname.includes('/farm')}>Farm</Nav.Link>
                    <NavDropdown title="Pool" active={window.location.pathname.includes('/pool')}>
                        <NavDropdown.Item href="/pool/mint">Mint</NavDropdown.Item>
                        <NavDropdown.Item href="/pool/redeem">Redeem</NavDropdown.Item>
                        <NavDropdown.Item href="/pool/others">Others</NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="/game" active={window.location.pathname.includes('/game')}>P2E</Nav.Link>
                    <Nav.Link href="/nft" active={window.location.pathname.includes('/nft')}>NFT Marketplace</Nav.Link>
                </Nav>
                <div style={{color:'white'}}> {props.loading? '---':`WMF : ${wmfBalance} | WUSD : ${wusdBalance}`}</div>
            </Container>
        </Navbar>
  </div>
    );
}

export default Navigation