import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './MapContainer'
import Search from '../components/MapSearch'
import Footer from './../components/footer'

class Home extends Component {
    render() {        
        const box = {
            marginTop: "2rem"
        }
        const style = {
            "backgroundColor": "#ebebe0", //#F5F5DC #F5F5F5  ebebe0 f5f5f0
            padding: "1em",
            paddingBottom: "1.5em",
            // "position": "fixed", 
            "left": "0",
            minWidth: "100%",
            minHeight: "89%"
        }
        const footer = {
            "position": "fixed",
            "left": 0,
            "bottom": 0,
            "width": "100%",
            "color": "black"
        }
        return (
             <div style={box}>
                <div className="ui grid">
                    <div className="row" style={style}>
                        <div className="four wide column">
                            <Search onFilter={this.onFilter} />
                        </div>
                        <div className="twelve wide column">
                            <MapContainer google={this.props.google} />
                        </div>
                    </div>                
                </div>
                <div style={footer}>                    
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBl0GHG6VgXjjS8AR45DGMCmHt4E-jhgDk',
})(Home)