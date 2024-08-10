import './App.css';
import React, { Component } from 'react'
import NavBar from './Components/NavBar';
import Home from './Components/Home';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import LHome from './Components/LHome';
import LoadingBar from 'react-top-loading-bar'
import About from './Components/About';
import Contact from './Components/Contact';
import ItemState from './Content/ItemContent';

export default class App extends Component {
  apikey = "241a4419070d48e28ad72168354095aa"
  newsdatapi = "pub_368561fcb5a6ee1fa488588ba438a2882bcb3"
  constructor() {
    super();
    this.state = {
      isActive: false
    }
  }
  state = {
    progress: 0,
  }

  setProgress = (p) => {
    this.setState({ progress: p })
  }

  toggleIsActive = () => {
    this.setState({ isActive: !this.state.isActive });
  }

  render() {
    return (
      <>
        <ItemState>
          <BrowserRouter>
            <div className='full-container text-center'>
              <NavBar />

              <LoadingBar
                color='#cb0606'
                progress={this.state.progress}
                height={2}
              />
              <Routes>
                <Route exact path='/' element={<Home setProgress={this.setProgress} apikey={this.apikey} key={'general'} country={'in'} category={'general'} pageSize={10} header={true} />} />
                <Route exact path='/health' element={<Home setProgress={this.setProgress} apikey={this.apikey} key={'health'} country={'in'} category={'health'} pageSize={10} header={false} />} />
                <Route exact path='/entertainment' element={<Home setProgress={this.setProgress} apikey={this.apikey} key={'entertainment'} country={'in'} category={'entertainment'} pageSize={10} header={false} />} />
                <Route exact path='/business' element={<Home setProgress={this.setProgress} apikey={this.apikey} key={'business'} country={'in'} category={'business'} pageSize={10} header={false} />} />
                <Route exact path='/science' element={<Home setProgress={this.setProgress} apikey={this.apikey} key={'science'} country={'in'} category={'science'} pageSize={10} header={false} />} />
                <Route exact path='/sports' element={<Home setProgress={this.setProgress} apikey={this.apikey} key={'sports'} country={'in'} category={'sports'} pageSize={10} header={false} />} />
                <Route exact path='/technology' element={<Home setProgress={this.setProgress} apikey={this.apikey} key={'technology'} category={'technology'} header={false} />} />
                <Route exact path='/world' element={<LHome setProgress={this.setProgress} apikey={this.newsdatapi} key={'world'} category={'world'} pageSize={10} header={false} />} />
                <Route exact path='/about' element={<About />} />
                <Route exact path='/contact' element={<Contact />} />
              </Routes>
            </div>
          </BrowserRouter>
        </ItemState>
      </>
    )
  }
}
