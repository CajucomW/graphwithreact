import React, { Component } from 'react';
import './InputArea.css';
import Button from '../Button/Button.js';

class InputArea extends Component {

  // TODO: modify code that would tie info from here to state
  
  render() {
    return (
       <div className="InputArea">
          <input
            className="InputField"
            placeholder="Enter Stock Symbol to Add"
            value={this.props.value}
            onChange={this.props.newSymbolToChange} /><br />
          <Button onClick={this.props.onClickSubmit}>Submit</Button>
        </div>
        
    );
  }
}

export default InputArea;