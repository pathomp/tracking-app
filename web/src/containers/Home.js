import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './MapContainer'

class Home extends Component {
    render() {
        return (
            <div>
              <MapContainer google={this.props.google} />
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBl0GHG6VgXjjS8AR45DGMCmHt4E-jhgDk',
})(Home)