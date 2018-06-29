import React, { Component } from 'react'
import GoogleMap from 'google-map-react'

import Layout from '../components/Layout'

export default class extends Component {
    static getInitialProps () {
        return {
            photos: new Array(15).fill(0).map((v,k) => k +1 )
        }
    }

    constructor (props) {
        super(props)
    }

    render () {
        return(
            <div>Hello</div>
            // <Layout>
            //     <div style={{ height:'100vh', width:'100%'}}>
            //         <GoogleMap
            //             bootstrapURLKeys={{ key: 'AIzaSyDUoisoK4bb7CIPNSm2m83WyrUfUkIU1Cg' }}
            //             defaultCenter={{lat: 13.736717, lng: 100.523186}}
            //             defaultZoom={11}>          
            //         </GoogleMap>
            //     </div>
            // </Layout>
        )
    }
}