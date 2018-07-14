import React, { Component } from 'react'
// import { GoogleApiWrapper } from 'google-maps-react'
// import MapContainer from './MapContainer'
// import Search from '../components/MapSearch'
import Footer from './../components/footer';
import Map from '../components/Map/Map';

class Home extends Component {
    constructor(){
        super()
    }
    render() {
        const style = {
            "backgroundColor": "#ebebe0", //#F5F5DC #F5F5F5  ebebe0 f5f5f0
            padding: "1em",
            paddingBottom: "1.5em",
            "position": "fixed", 
            "left": "0",
            minWidth: "100%",
            minHeight: "90%"
        }
        const footer = {
            "position": "fixed",
            "left": 0,
            "bottom": 0,
            "width": "100%",
            "color": "white"
        }
        const layout = {
            "display": "flex",
            "minHeight": "90vh",
            "flexDirection": "column",
            "margin": "0 1px 0 1px",
            "width": "100vw"
        }
        return (
             <div>
                <div className="ui grid">
                    <div className="row" style={style}>
                        <div className="four wide column">
                            {/* <Search onFilter={this.onFilter} /> */}
                        </div>
                        <div className="twelve wide column">
                            <div style={{ height: '100vh', width: '100%' }}>
                                <Map />
                            </div>
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

export default Home