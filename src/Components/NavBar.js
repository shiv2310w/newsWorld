import React, { Component } from 'react'
import Logo from './logo.png'
import { Link } from 'react-router-dom'
export default class NavBar extends Component {
    constructor() {
        super()
        this.state = {
            style: '-20rem'
        }
    }

    // Slide Bar
    sideOut = () => {
        if (this.state.style === '0rem') {
            this.setState({ style: '-20rem' })
        } else {
            this.setState({ style: '0rem' })
        }
    }

    removeBar = () => {
        if (this.state.style === '0rem') {
            this.setState({ style: '-20rem' })
        }
    }

    render() {
        return (
            <>
                <header>
                    <nav className="df">
                        <ul className="df">
                            <div className="c-logo">
                                <li className="logoli"><Link to='/'><img src={Logo} alt="logo" className="logo" /></Link></li>
                            </div>
                            <div className="title df">
                                <p>News World</p>
                            </div>
                            <div className="c-li">
                                <li onClick={this.sideOut}>News Category</li>
                                <Link to={'/world'}><li>World</li></Link>
                                <li>About us</li>
                            </div>
                        </ul>
                    </nav>
                    <div className="sideBar df" id="sideBar" style={{ left: this.state.style }}>
                        <Link className='link' to="/health"><li onClick={this.sideOut}>Health</li></Link>
                        <Link className='link' to="/business"><li onClick={this.sideOut}>Business</li></Link>
                        <Link className='link' to="/entertainment"><li onClick={this.sideOut}>Entertainment</li></Link>
                        <Link className='link' to="/science"><li onClick={this.sideOut}>Science</li></Link>
                        <Link className='link' to="/sports"><li onClick={this.sideOut}>Sports</li></Link>
                        <Link className='link' to="/technology"><li onClick={this.sideOut}>Technology</li></Link>
                    </div>
                </header>
            </>
        )
    }
}