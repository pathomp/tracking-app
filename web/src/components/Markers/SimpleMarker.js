import React, { Component } from 'react'

let Icon = './mapIcon.svg'


export const SimpleMarker = ({ text }) => (
    <div style={{
        backgroundColor: '#00b92a',
        padding: '10px 10px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        transform: 'translate(-50%, -50%)'
      }}>
        {text}
      </div>
)

export default SimpleMarker