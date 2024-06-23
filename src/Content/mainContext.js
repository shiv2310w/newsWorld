import React, { Component } from "react"

const itemContext = React.createContext({ style: '-20rem' })

class ItemState extends Component {
  constructor(props) {
    super(props);
    this.state = {
      style: '-20rem'
    }
  }

  update = () => {
    this.state.style === '-20rem' ? this.setState({ style: '0rem' }) : this.setState({ style: '-20rem' });
  }

  clickOnScreen = () => {
    if (this.state.style === '0rem') { this.setState({ style: '-20rem' }); }
  }
  render() {
    return (
      <itemContext.Provider value={{ update: this.update, clickOnScreen: this.clickOnScreen }}>
        {this.props.children}
      </itemContext.Provider>
    )
  }
}

export {ItemState,itemContext};