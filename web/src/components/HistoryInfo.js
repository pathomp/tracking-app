import React, { Component } from 'react'

export default class HistoryInfo extends Component {
    constructor(props){
        super()
        this.state ={
            date : props.date,
            data : []
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
        this.state.date = props.date
    }

    render() {
        const style = {
            width: "100%",
            height: "53vh", //304pxs
            "overflowY": "scroll"
        }         
        return (            
            <div className="four wide column">
                <div/>
                <h2 className="ui teal header"><strong>Information</strong></h2>
                <div style={style} >
                    <table className="ui celled padded table">
                        <thead>
                            <tr>
                                <th>วันที่</th>
                                <th>Speed</th>
                            </tr>
                        </thead>                                    
                        <tbody>
                            {this.state.data
                                .sort((a,b)=>a.ts>b.ts)                        
                                .map((data, i) => {
                                    const dataDB = new Date(data.ts)
                                    const dateState = new Date(this.state.date)
                                    
                                    if(dataDB.getDate()  === dateState.getDate()){
                                        return (
                                            <tr key={i}>
                                                <td>{dataDB.getDate()}{"/"}{dataDB.getMonth()+1}{"/"}{dataDB.getFullYear()}</td>
                                                <td>{data.speed}</td>                                                                             
                                            </tr>                                                                       
                                        )
                                    }else{
                                        return (
                                            <tr key={i}>
                                                <td>{dataDB.getDate()}{"/"}{dataDB.getMonth()+1}{"/"}{dataDB.getFullYear()}</td>
                                                <td>{data.speed}</td>                                                                             
                                            </tr>                                                                       
                                        )
                                    }                         
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
