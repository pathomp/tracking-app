import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
        <nav className="navbar is-fixed-top is-transparent" aria-label="main navigation">
          <div className="container">
            <div className="navbar-brand">
                <a className="navbar-item" href="">VXXXN</a>
                <div className="navbar-burger">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
            </div>
            <div className="navbar-menu">
                <div className="navbar-start">
                  <Link to="/" className="navbar-item">Home</Link>
                  <Link to="/pages" className="navbar-item">About</Link>
                </div>
                <div className="navbar-end">
                  <div className="navbar-item">
                    <p className="control">
                      <Link to="/login" className="button">
                        <span>Sign in</span>
                      </Link>
                    </p>
                  </div>
                </div>
            </div>
          </div>
        </nav>
    )
  }
}

export default Header