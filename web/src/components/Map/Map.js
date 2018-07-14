import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react'
import SimpleMarker from '../Markers/SimpleMarker'
import { bangkokCoords, generateMarkers } from '../../data/fakeData'

export default class DonationMap extends Component {
    constructor(props){
        super()
        this.state = {
            latLongs: []
        }
        this.updateMarker = this.updateMarker.bind(this)
    }

    componentDidMount() {
        let timer = setInterval(this.updateMarker, 10000);
        this.updateMarker()
    }

    updateMarker() {
        const random = Math.floor(Math.random() * 10)  + 1
        this.setState({
            latLongs: generateMarkers(random)
        })
    }

    render() {
        return (
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: 'AIzaSyBl0GHG6VgXjjS8AR45DGMCmHt4E-jhgDk'
                }}
                defaultCenter={bangkokCoords}
                defaultZoom={6}
            >
            {this.state.latLongs.map(place => (
                <SimpleMarker key={place.id} text={place.id} lat={place.lat} lng={place.lng}/>
            ))}
            </GoogleMapReact>
        )
    }
}