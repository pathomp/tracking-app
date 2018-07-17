import React, { Component } from 'react'
import marker from './icons_gps2.png'

let Icon = './mapIcon.svg'


export const SimpleMarker = ({ text }) => (
    // <div style={{
    //     backgroundColor: '#00b92a',
    //     padding: '10px 10px',
    //     display: 'inline-flex',
    //     textAlign: 'center',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderRadius: '50%',
    //     transform: 'translate(-50%, -50%)'
    //   }}>
    //     {text}
    //   </div>
    <div style={{
      // backgroundColor: '#00b92a',
      // padding: '10px 10px',
      display: 'block',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)'
    }}>
      {text}
      <img src={marker} style={{display:'block',backgroundColor:'#00b92a'}} height="25" width="25"/>
    </div>
)

export default SimpleMarker