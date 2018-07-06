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
            value: props.value,
            selectedDays : props.selectedDays,
            tableIndex: null
        }
        this.sendData = this.sendData.bind(this)
        this.selectCar = this.selectCar.bind(this)
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

    sendData = (name,speed,imei,i) => {
        this.setState({
            dname : name,
            imei : imei,
            dspeed : speed,
            tableIndex : i
        });   
        console.log(this.state.tableIndex)
    }

    handleDayChange = (selectedDays) => {
        this.setState({selectedDays})

    }

    selectCar = (e) => {
        this.setState({ value: e.target.value })
    }

    render() {
        const style = {
            width: "100%",
            height: "30vh",
            "overflowY": "auto"
        }
                
        const cursor = {
            cursor: "pointer"
        }

        let day = { style:
            {   
                width: "100%" , 
                height: 35 , //36
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
                            <table className="ui small selectable table">
                                <thead>
                                    <tr className="center aligned">
                                        <th></th>
                                        <th>Name</th>
                                        <th>Speed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listItems.map((item, i) => {
                                            return (
                                                <tr key={i} className={this.state.tableIndex==i? "center aligned active":"center aligned"} style={cursor}>
                                                    <td><a onClick={() => this.sendData(item.name,item.object_data.speed,item.IMEI,i)}><i className="truck icon"></i></a></td>
                                                    <td><a onClick={() => this.sendData(item.name,item.object_data.speed,item.IMEI,i)}>{item.name}</a></td>
                                                    <td><a onClick={() => this.sendData(item.name,item.object_data.speed,item.IMEI,i)}>{item.object_data.speed}</a></td>                                                                                              
                                                </tr>                                                                       
                                            )
                                        })
                                    }
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
                                <div className="row">
                                <div className="column">
                                        <select className="ui fluid search dropdown" onChange={this.selectCar}>
                                            <option value={null}>Select Car</option>
                                            {
                                                listItems.map((item) => {
                                                    return(
                                                        <option value={item.IMEI}>{item.name}</option>                                                    
                                                    )
                                                })
                                            }                                  
                                        </select>
                                    </div>
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
                            </div>
                            <HistoryInfo date={this.state.selectedDays} name={this.state.value}/> 
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
    dspeed : null,
    value: null,
    selectedDays: null
};
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBl0GHG6VgXjjS8AR45DGMCmHt4E-jhgDk',
})(MapSearch)

