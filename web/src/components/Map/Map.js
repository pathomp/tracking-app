import React, { Component } from 'react'
import axios from 'axios'
import GoogleMapReact from 'google-map-react'
import SimpleMarker from '../Markers/SimpleMarker'

const bangkokCoords = { lat: 13.736717, lng: 100.523186 };

export default class Map extends Component {
    constructor(props){
        super()
        this.state = {
            latLongs: []
        }
        // this.getMarker = this.getMarker.bind(this)
    }

    // componentDidMount() {
    //     this.timer = setInterval(this.getMarker, 30000);
    //     this.getMarker();
    // }

    componentWillReceiveProps(props){
        this.setState({latLongs:props.objects})
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }


    // getMarker = () => {
    //     // http://localhost:5000/api/v1/objects
    //     axios.get('http://192.168.99.100:8080/objects')
    //         .then(response =>{
    //             this.setState({
    //                 latLongs: response.data
    //             })
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }

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
                <SimpleMarker key={place.imei} text={place.object_data.speed} lat={place.object_data.geometry.coordinates[1]} lng={place.object_data.geometry.coordinates[0]}/>
            ))}
            </GoogleMapReact>
        )
    }
}