import './App.css';
import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import LHome from './Components/LHome';

export default class App extends Component {
  render() {
    return (
      <>
        <BrowserRouter>
          <div className='full-container text-center'>
            <NavBar />
            <Routes>
              <Route exact path='/' element={<Home key={'general'} country={'in'} category={'general'} pageSize={10} header={true} />} />
              <Route exact path='/health' element={<Home key={'health'} country={'in'} category={'health'} pageSize={10} header={false} />} />
              <Route exact path='/entertainment' element={<Home key={'entertainment'} country={'in'} category={'entertainment'} pageSize={10} header={false} />} />
              <Route exact path='/business' element={<Home key={'business'} country={'in'} category={'business'} pageSize={10} header={false} />} />
              <Route exact path='/science' element={<Home key={'science'} country={'in'} category={'science'} pageSize={10} header={false} />} />
              <Route exact path='/sports' element={<Home key={'sports'} country={'in'} category={'sports'} pageSize={10} header={false} />} />
              <Route exact path='/technology' element={<Home key={'technology'} category={'technology'} header={false} />} />
              <Route exact path='/world' element={<LHome key={'world'} category={'world'} pageSize={10} header={false}/>} />
            </Routes>
          </div>
        </BrowserRouter>
      </>
    )
  }
}
