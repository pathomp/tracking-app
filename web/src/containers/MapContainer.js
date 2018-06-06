import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export default class MapContainer extends Component {

    state = {
      locations: []
    }
  
    componentDidMount() {
    
      fetch('http://localhost:5000/api/v1/data')
        .then((response) => response.json())
        .then(json => {
            this.setState({locations:json})
            this.loadMap();
        });
    }
  
    loadMap() {
      if (this.props && this.props.google) { 
        const {google} = this.props; 
        const maps = google.maps; 
  
        const mapRef = this.refs.map; 
        const node = ReactDOM.findDOMNode(mapRef); 
  
        const mapConfig = Object.assign({}, {
          center: {lat: 13.736717, lng: 100.523186}, 
          zoom: 11, 
          mapTypeId: 'roadmap' 
        })
  
        this.map = new maps.Map(node, mapConfig); 

        this.state.locations.forEach( location => { 
          new google.maps.Marker({ 
            position: {lat: location.geometry.coordinates[1], lng: location.geometry.coordinates[0]}, 
            map: this.map, 
        //     title: location.name // the title of the marker is set to the name of the location
          });
        })
  
      }
    }
  
    render() {
      const style = { 
        width: '90vw', 
        height: '55vh' 
      }
  
      return ( 
        <div ref="map" style={style}>
          loading map...
        </div>
      )
    }
  }