import React, { useContext, useEffect, useState } from 'react'
import Logo from './img/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { itemContext } from '../Content/ItemContent';
import menu from './img/menu.png'
import cut from './img/cut.png'

const NavBar = () => {
    let item = useContext(itemContext);

    useEffect(() => {
        if (window.innerWidth < 860) {
            const navbar = document.getElementById('mainNavbar')
            navbar.style.display = 'none';
            const sideNavbar = document.getElementById('sideNavbar')
            sideNavbar.style.display = 'flex';
            const menubox = document.getElementById('menubox')
            menubox.style.display = 'block';
            document.getElementById('menu').style.display = 'block';
        } else {
            const navbar = document.getElementById('mainNavbar')
            navbar.style.display = 'flex';
            const sideNavbar = document.getElementById('sideNavbar')
            sideNavbar.style.display = 'none';
            document.getElementById('menu').style.display = 'none';
            const menubox = document.getElementById('menubox')
            menubox.style.display = 'none';
        }
    }, [])

    const [map, setMap] = useState(true)

    const toggleMap = () => { setMap(!map) }

    const menuFunc = () => { item.navOpen(); toggleMap(); item.clickOnScreen();}

    const cutFunc = () => { item.navClose(); toggleMap(); }

    const navFunc = () => { item.navClose(); toggleMap()}

    return (
        <>
            <header>
                <nav className="df">
                    <ul className="df ul">
                        <div className="c-logo">
                            <li className="logoli" onClick={item.clickOnScreen}><Link to='/news-app' className='a'><img src={Logo} alt="logo" className="logo" /></Link></li>
                        </div>
                        <div className="title df">
                            <p>News World</p>
                        </div>
                        <div className="c-li" id='mainNavbar'>
                            <li onClick={item.update}>News Category</li>
                            <Link to={'/world'} onClick={item.clickOnScreen}><li>World</li></Link>
                            <Link to={'/about'} onClick={item.clickOnScreen}><li>About us</li></Link>
                            <Link to={'/contact'} onClick={item.clickOnScreen}><li>Contact us</li></Link>
                        </div>
                        <div className="menu" id="menubox" >
                            <img src={menu} alt="logo" id='menu' style={{ display: map ? 'inline' : 'none' }} className='menuImg' onClick={menuFunc} />
                            <img src={cut} alt="Cut" id='cut' style={{ display: !map ? 'inline' : 'none' }} className='menuImg' onClick={cutFunc} />
                        </div>
                        <div className="sideNavbar" id='sideNavbar' style={{ right: item.navState.style }}>
                            <li onClick={()=>{navFunc();item.update(); }}>News Category</li>
                            <li onClick={navFunc}><NavLink key={'world'} to={'/world'}>World News</NavLink></li>
                            <li onClick={navFunc}><NavLink key={'about'} to={'/about'}>About Us</NavLink></li>
                            <li onClick={navFunc}><NavLink key={'contact'} to={'/contact'}>Contact Us</NavLink></li>
                        </div>
                    </ul>
                </nav>
                <div className="df sideBar" id="sideBar" style={{ left: item.state.style }}>
                    <Link className='link' to="/health"><li onClick={item.update}>Health</li></Link>
                    <Link className='link' to="/business"><li onClick={item.update}>Business</li></Link>
                    <Link className='link' to="/entertainment"><li onClick={item.update}>Entertainment</li></Link>
                    <Link className='link' to="/science"><li onClick={item.update}>Science</li></Link>
                    <Link className='link' to="/sports"><li onClick={item.update}>Sports</li></Link>
                    <Link className='link' to="/technology"><li onClick={item.update}>Technology</li></Link>
                </div>
            </header>
        </>
    )
}

export default NavBar;