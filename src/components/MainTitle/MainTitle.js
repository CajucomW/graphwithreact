import React, { Component } from 'react';
import './MainTitle.css';

class MainTitle extends Component {
  render() {
    return (
        <h1 className="MainTitle">
            {this.props.text}
            </h1>
    );
  }
}

export default MainTitle;

        