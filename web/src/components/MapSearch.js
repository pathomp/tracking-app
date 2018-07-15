import React, { Component } from 'react'
import ObjectInfo from '../components/ObjectInfo'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import { Dropdown,Button, Icon } from 'semantic-ui-react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import {formatDate, parseDate} from 'react-day-picker/moment'
import 'moment/locale/it'
import HistoryInfo from './HistoryInfo'

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
        })
    }

    handleDayChange = (selectedDays) => {
        this.setState({selectedDays})

    }

    selectCar = (e,data) => {
        this.setState({ value: data.value })
    }

    render() {
        const style = {
            display: "block",
            width: "100%",
            height: "20vh",
            "overflowY": "auto"
        }

        const cursor = {
            cursor: "pointer"
        }

        const styleTab = {
            // "position": "fixed",
            minWidth: "22.5%", 
            minHeight: "75%"
        }

        let day = { style:
            {   
                width: "100%" , 
                height: 35 ,
                color: "rgb(32, 156, 238)",
                padding: ".5em 1em",
                "textAlign": "center",
                "fontSize": "1em" ,
                "borderColor": "rgb(32, 156, 238)",
                "border": "1px solid" ,
                "borderRadius": "2px"
            }
        }

        let listItems = this.state.objects.filter(
            (item) => {
                return item.name.toString().toLowerCase().indexOf(this.state.items.toLowerCase()) !== -1
            }
        )

        const option = this.state.objects.map((item,i) =>{
            return {key:i, value:item.IMEI , text:item.name}            
        })
        return (       
            <div>
                <Tabs defaultIndex={0} onSelect={tabindex => this.setState({tabindex})} >
                    <TabList className="ui two mini item menu" style={cursor}>
                        <Tab className={this.state.tabindex.valueOf(1)? "item":"active item"}><p className="ui tiny header">Object</p></Tab>
                        <Tab className={this.state.tabindex.valueOf(1)? "active item":"item"}><p className="ui tiny header">History</p></Tab>                        
                    </TabList>
                    <TabPanel>
                        <div className="ui segment" style={styleTab}>
                            <div className="right menu ">
                                <div className="ui small fluid icon input focus">
                                    <input value={this.state.items}
                                        type="text" onChange={this.filterList.bind(this)} 
                                        placeholder="Search...."/>
                                    <i className="search link icon"></i>
                                </div>
                            </div>
                            {/* <br/>        */}
                            {/* <div> */}
                                <table className="ui small selectable unstackable table" style={{width: "100%",fontSize: ".8rem"}}>
                                    <thead style={{display:"block"}}>
                                        <tr className="center aligned">
                                            <th style={{width: "5em"}}>Type</th>
                                            <th style={{width: "11em"}}>Name</th>
                                            <th style={{width: "10em"}}>Speed</th>
                                            {/* <th>S</th>
                                            <th>S</th> */}
                                        </tr>
                                    </thead>                              
                                    <tbody style={style}>                                
                                        {
                                            listItems.map((item, i) => {
                                                return (
                                                    <tr key={i} className={this.state.tableIndex===i? "center aligned active":"center aligned"} style={cursor}>
                                                        <td style={{width: "5em"}}><p onClick={() => this.sendData(item.name,item.object_data.speed,item.IMEI,i)}><i className="truck icon"></i></p></td>
                                                        <td style={{width: "11em"}}><p onClick={() => this.sendData(item.name,item.object_data.speed,item.IMEI,i)}>{item.name}</p></td>
                                                        <td style={{width: "10em"}}><p onClick={() => this.sendData(item.name,item.object_data.speed,item.IMEI,i)}>{item.object_data.speed}</p></td>                                                                                              
                                                        {/* <td>1</td>
                                                        <td>2</td> */}
                                                    </tr>                                                                     
                                                )
                                            })
                                        }                                    
                                    </tbody>
                                </table>
                        {/* </div> */}
                        <ObjectInfo name={this.state.dname} imei={this.state.imei} speed={this.state.dspeed}  />
                        {/* <MapContainer imei={this.state.imei} google={this.props.google} /> */}
                    </div>
                    </TabPanel> 

                    <TabPanel>   
                        <div className="ui segment" style={styleTab}>
                            <div className="ui two column centered grid">
                                <div className="column">
                                    <Dropdown                                       
                                        onChange={this.selectCar}
                                        placeholder='Select Car' 
                                        fluid selection search
                                        options={option}                                        
                                    />
                                </div>
                                <div className="column">
                                    <DayPickerInput inputProps={day}
                                        format="D/M/YYYY"
                                        formatDate={formatDate}
                                        parseDate={parseDate}
                                        placeholder="DD/MM/YYYY"                        
                                        onDayChange={this.handleDayChange}
                                        dayPickerProps={{
                                            todayButton: 'Today',
                                        }}
                                    />
                                </div>
                            </div><br/>
                            <Button icon labelPosition='left' secondary size='mini'>
                                <Icon name='line graph' />Graph
                            </Button>                     
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
}
export default MapSearch

