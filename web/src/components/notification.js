import React ,{ Component } from 'react'
import NotificationSystem from 'react-notification-system'


export default class notification extends Component{
    constructor(){
        super()
        this.state = {
            name : "NameNaJa",
            IMEI : "1111111",
            lat : "0",
            lng : "0",
            speed : 0,
            Time : "0-0-0000"
        }
        this.notification = null        
    }

    componentDidMount = () => {
        this.notification = this.refs.notification
        this.addNotification()
        // fetch('',{
        //     method: 'GET',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //     //   username:this.state.username
        //   })
        // })
        // .then((response) => {response.json()})
        // .then(json => {
        //     // this.setState({locations:json})
        //     this.addNotification()
        // })
    }

    addNotification = (e) => {
        // e.preventDefault()
        this.notification.addNotification({
            title:'Warning',
            message:[   'Name : ', this.state.IMEI,<br/> ,
                        'IMEI : ', this.state.IMEI,<br/> ,
                        'Lat Lng : ', this.state.lat," , " ,this.state.lng,<br/> ,
                        'Speed : ', this.state.speed,<br/>,
                        'Time : ',this.state.Time
                    ],    
            level:'warning',
            position: 'br'
        })
    }

    render(){
        return(
            <div>
                <button onClick={this.addNotification}>Add</button>
                <NotificationSystem ref="notification"/>
            </div>
        )
    }
}

