import React, { Component } from 'react'
import loading from './img/Loading.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div>
        <img src={loading} alt="" />
      </div>
    )
  }
}
