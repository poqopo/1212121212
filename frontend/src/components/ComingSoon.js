import React from 'react'

const ComingSoon = () => {
    return(
        <div style={{
            display:'flex',
            flexDirection:'column',
            height:'100vh',
            width:'100%',
            justifyContent:'center',
            alignItems:'center',
            fontSize:'3rem',
            background:'linear-gradient(to bottom right, #ffffff, #f6fffe)'
        }}>
           Coming Soon!
            <div style={{
                fontSize:'1.2rem',  
                marginTop: '20px'
            }}>- We Made Future -</div>
        </div>
    ) 
}

export default ComingSoon