import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Home extends Component {
    static defaultProps = {
        center: {
            lat: 13.6416148,
            lng: 100.4340369
        },
        zoom: 11
    };
    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '50vh', width: '100%' }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCOKJainn0MZXoPTuwK6SUzqK4aJqPwUA0" }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}>
                <AnyReactComponent
                  lat={13.6416148}
                  lng={100.4340369}
                  text={'PIKAGU'}
                />
              </GoogleMapReact>
            </div>
        );
    }
}

export default Home