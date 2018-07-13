import React, { Component } from 'react'
import EditObject from './editObject'
import AddObject from './addObject'
import DeleteObject from './deleteObject'
export default class settings extends Component {
    constructor(props){
        super(props)
        this.state = {
            objects : [],
            open: props.open,
            addObject: props.addObject,
            delete:props.delete
        }
    }
    
    componentDidMount() {
        fetch('http://localhost:5000/api/v1/objects')
            .then((response) => response.json())
            .then(json => {
                this.setState({ objects: json })
            });
    }

    render() {
        const style = {
            display: "block",
            width: "100%",
            height: "65vh",
            "overflow": "auto"
        }
        return(
            <div><br/><br/>
                <div className="ui column centered grid">
                    <div >
                        <table className="ui inverted small table">
                            <thead style={{display:"block"}}>
                                    <tr>
                                        <th style={{width: "40em"}}>
                                            <h3>Object  Setting</h3>
                                        </th>
                                        <th className="right aligned" style={{width: "20em"}}>
                                            <button className="ui inverted black button" onClick={() => this.setState({addObject:true})}>
                                                <i className="plus icon" title="Add Object"/>
                                                Add Object
                                            </button>
                                        </th>
                                    </tr>
                            </thead>
                        </table>
                        <table className="ui small table" style={{width: "100%"}}>                            
                            <thead style={{display:"block"}} className="ui inverted table">
                                <tr className="center aligned">
                                    <th style={{width: "10em"}}>Name</th>
                                    <th style={{width: "10em"}}>IMEI</th>
                                    <th style={{width: "5em"}}>Active</th>
                                    <th style={{width: "15em"}}>Expires date</th>
                                    <th style={{width: "20em"}}>Menu</th>
                                </tr>
                            </thead>
                            <tbody style={style} className="ui striped table">
                                {
                                    this.state.objects.map((object,i) => {
                                        return(                                            
                                            <tr key={i} className="center aligned collapsing">
                                                <td style={{width: "10em"}}>{object.name}</td>
                                                <td style={{width: "10em"}}>{object.IMEI}</td>
                                                <td style={{width: "5em"}}><i className="icon exclamation"/></td>                                                
                                                <td style={{width: "15em"}}>-</td>
                                                <td style={{width: "5em",cursor: "pointer"}}>
                                                    <i className="icon pencil alternate" title="Edit" onClick={() => this.setState({open:true})}/>
                                                </td>
                                                <td style={{width: "5em",cursor: "pointer"}}>
                                                    <i className="icon clone" title="Duplicate" />
                                                </td>
                                                <td style={{width: "5em",cursor: "pointer"}}> 
                                                    <i className="icon eraser" title="Clear History" />
                                                </td>
                                                <td style={{width: "5em",cursor: "pointer"}}>
                                                    <i className="icon trash alternate" title="Delete" onClick={() => this.setState({delete:true})}/>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }                                                                
                            </tbody>
                        </table>                        
                    </div>
                    <EditObject open={this.state.open}/>
                    <AddObject addObject={this.state.addObject}/>
                    <DeleteObject delete={this.state.delete}/>
                </div>                
            </div>
        )
    }
}
settings.defaultProps = {
    open: false,
    addObject: false,
    delete:false
};
