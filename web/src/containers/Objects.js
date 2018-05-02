import React, { Component } from 'react'

export default class PagesContainer extends Component {

  state = {
    objects: []
  }

  shouldComponentUpdate(_nextProps, nextState){
      return this.state.objects !== nextState.objects;
  }

  onReloadPages = () => {
    fetch('http://localhost:8080/api/v1/objects')
        .then((response) => response.json())
        .then((objects) => this.setState({ objects }))
  }

  componentDidMount(){
    this.onReloadPages()
  }

  render() {

    return (
        <table className='table'>
        <thead>
            <tr>
              <th>name</th>
              <th>IMEI</th>
              <th>status</th>
              <th>createdAt</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.objects.map((object) => (
                <tr key={object.name}>
                  <th>{object.name}</th>
                  <td>{object.IMEI}</td>
                  <td>{object.ts}</td>
                  <td>
                    <a href='javascript:void(0)'>Show</a>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )
  }
}