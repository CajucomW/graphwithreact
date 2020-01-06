import React, { Component } from 'react';
import './Button.css';

class Button extends Component {  
  render() {
    return (
        // <div className="Button" onClick={this.props.onClick}>
        //     <button>{this.props.children}</button>
        // </div>
        // lines 7 to 9 were written in situation when Button
        // component was in the InputArea component
        
        <div 
          onClick={this.props.selected}
          className="Button">
            <button>{this.props.text}</button>
          </div>
          // this div was "re-written" to have the Button component added
          // to App.js instead of being inside the InputArea component
        
    );
  }
}

export default Button;