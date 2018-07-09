import React, { Component } from 'react'

export default class HistoryInfo extends Component {
    constructor(props){
        super()
        this.state ={
            date : props.date,
            data : [],
            name : props.name
        }
    }

    componentDidMount = () => {
        return new Promise((resolve, reject) => {
            fetch('http://localhost:5000/api/v1/data' ,(error, avatar) => {
                if(error) reject(error)
                else resolve(avatar)
              })
                .then((response) => response.json())
                .then(json => {
                    this.setState({ data: json })
                });
        })
    }

    componentWillReceiveProps = (props) =>{
        this.setState({date:props.date})
        this.setState({name:props.name})

    }

    render() {
        const style = {
            width: "100%",
            height: "40vh",
            "overflowY": "scroll",
            fontSize: ".9rem"
        }       
        return (            
            <div className="four wide column"><br/>
                <h3 className="ui teal header"><strong>Information</strong></h3>
                <div style={style} >
                    <table className="ui small celled table">
                        <thead>
                            <tr className="center aligned">
                                <th>Date</th>
                                <th>Speed</th>
                            </tr>
                        </thead>                                    
                        <tbody>                    
                            {this.state.data
                                .sort((a,b)=>a.ts>b.ts)
                                .map((data,i) => {
                                    const dataDB = new Date(data.ts)
                                    if(this.state.date === null){
                                        if(this.state.name === data.IMEI){
                                            return (
                                                <tr key={i} className="center aligned">
                                                    <td>{dataDB.getDate()}{"/"}{dataDB.getMonth()+1}{"/"}{dataDB.getFullYear()}</td>
                                                    <td>{data.speed}</td>
                                                </tr>
                                            )
                                        }
                                    }else{
                                        const dateState = new Date(this.state.date)
                                        if(this.state.name === data.IMEI || this.state.name === null){
                                            if(this.state.name === data.IMEI && (dataDB.getDate()  === dateState.getDate() && dateState.getMonth()+1 === dataDB.getMonth()+1)){
                                                return (
                                                    <tr key={i} className="center aligned">
                                                        <td>{dataDB.getDate()}{"/"}{dataDB.getMonth()+1}{"/"}{dataDB.getFullYear()}</td>
                                                        <td>{data.speed}</td>
                                                    </tr>
                                                )
                                            }else if(this.state.name === null && dataDB.getDate()  === dateState.getDate() && dateState.getMonth()+1 === dataDB.getMonth()+1){
                                                return (
                                                    <tr key={i} className="center aligned">
                                                        <td>{dataDB.getDate()}{"/"}{dataDB.getMonth()+1}{"/"}{dataDB.getFullYear()}</td>
                                                        <td>{data.speed}</td>
                                                    </tr>
                                                )
                                            }
                                        }
                                    }
                                    return null
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
