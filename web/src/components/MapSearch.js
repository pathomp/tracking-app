import React, { Component } from 'react'
import ObjectInfo from '../components/ObjectInfo'
import MapContainer from '../containers/MapContainer'
import { GoogleApiWrapper } from 'google-maps-react'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import {formatDate, parseDate} from 'react-day-picker/moment'
import 'moment/locale/it'
import HistoryInfo from './HistoryInfo';

class MapSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            objects: [],
            items: "",
            dname : props.dname,
            imei : props.imei,
            dspeed : props.dspeed,
            tabindex: 0,
            selectedDays : new Date()
        }
        this.sendData = this.sendData.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/v1/objects') //http://10.195.2.131:3222/objedts --- http://localhost:5000/api/v1/objects
            .then((response) => response.json())
            .then(json => {
                this.setState({ objects: json })
            });
    }

    filterList = (e) => {
        this.setState({ items: e.target.value })
    }

    sendData = (name,speed,imei) => {
        this.setState({
            dname : name,
            imei : imei,
            dspeed : speed
        });   
    }

    handleDayChange = (selectedDays) => {
        this.setState({selectedDays})
    }

    render() {
        const style = {
            width: "100%",
            height: "30vh", //194px
            "overflowY": "scroll"
        }

        const cursor = {
            cursor: "pointer"
        }

        let day = { style:
            {   
                width: "100%" , 
                height: 36 ,
                color: "rgb(32, 156, 238)",
                padding: ".5em 1em",
                "textAlign": "center",
                "fontSize": "1em" ,
                "borderColor": "rgb(32, 156, 238)",
                "border": "1px solid" ,
                "borderRadius": "2px",
                className: 'form-control'
            }
        }  

        let listItems = this.state.objects.filter(
            (item) => {
                return item.name.toString().toLowerCase().indexOf(this.state.items.toLowerCase()) !== -1
            }
        )
        return (       
            <div>
                <Tabs defaultIndex={0} onSelect={tabindex => this.setState({tabindex})}>
                    <TabList className="ui two tiny item menu" style={cursor}>
                        <Tab className={this.state.tabindex.valueOf(1)? "item":"active item"}><a className="ui tiny blue header">Object</a></Tab>
                        <Tab className={this.state.tabindex.valueOf(1)? "active item":"item"}><a className="ui tiny blue header">History</a></Tab>                        
                    </TabList>
                    <TabPanel>
                        <div className="ui segment">
                            <div className="right menu ">
                                <div className="ui fluid icon input focus">
                                    <input value={this.state.items}
                                        type="text" onChange={this.filterList.bind(this)} 
                                        placeholder="Search...."/>
                                    <i className="search link icon"></i>
                                </div>
                            </div>
                            <br/>       
                            <div style={style}>
                            <table className="ui table">
                                <thead>
                                    <tr className="center aligned">
                                        <th></th>
                                        <th>Name</th>
                                        <th>Speed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listItems.map((item, i) => {
                                        return (
                                            <tr key={i} className="center aligned">
                                                <td><i className="truck icon"></i></td>
                                                <td><a onClick={() => this.sendData(item.name,item.object_data.speed,item.IMEI)}>{item.name}</a></td>
                                                <td>{item.object_data.speed}</td>                                                                                              
                                            </tr>                                                                       
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <ObjectInfo name={this.state.dname} imei={this.state.imei} speed={this.state.dspeed}  />
                        <MapContainer imei={this.state.imei} google={this.props.google} />
                    </div>
                    </TabPanel> 

                    <TabPanel>   
                        <div className="ui segment">
                            <div className="ui two column centered grid">
                                    <div className="column">
                                        <DayPickerInput inputProps={day}
                                        format="D/M/YYYY"
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        placeholder="DD/MM/YYYY"                               
                                        onDayChange={this.handleDayChange}
                                        />
                                    </div>
                            </div>
                            <HistoryInfo date={this.state.selectedDays}/> 
                        </div>                      
                    </TabPanel>
                </Tabs>
            </div>         
        )
    }
}
MapSearch.defaultProps = {
    dname : null,
    imei : null,
    dspeed : null   
};
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBl0GHG6VgXjjS8AR45DGMCmHt4E-jhgDk',
})(MapSearch)