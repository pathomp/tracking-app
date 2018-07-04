import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './MapContainer'
import Search from '../components/MapSearch'
import Footer from './../components/footer';

class Home extends Component {
    render() {
        const style = {
            "backgroundColor": "#ebebe0", //#F5F5DC #F5F5F5  ebebe0 f5f5f0
            padding: "1em",
            paddingBottom: "1.5em"
        }
        return (
             <div>
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
                <div>                    
                    <Footer/>
                </div>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBl0GHG6VgXjjS8AR45DGMCmHt4E-jhgDk',
})(Home)