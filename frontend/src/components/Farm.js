import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import './css/Farm.css'


class Farm extends Component {
  render() {
    let content
    let box = this.props.box
    if (this.props.loading){
      content =  <div style={{
        display:'flex',
        flexDirection:'column',
        height:'100vh',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        fontSize:'3rem',
        color:'#fff'
    }}>
       Loading...
        <div style={{
            fontSize:'1.2rem',  
            marginTop: '20px'
        }}> Fetching Blockchain Data...</div>
    </div>
    }
    else{
      content = 
      <div id="content" style={{margin:'0px'}}>
        <h1>{this.props.heading}</h1>
        <div style={{height:'10px'}}></div>
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

export default Farm;