import React, { Component } from 'react';
import './MainContentBorder.css';

class MainContentBorder extends Component {
  render() {
    console.log('MainContentBorder rendering');
    return (
        <div className="MainContentBorder">
          {
            this.state.stockList.map(data => (
              <div className="BarsInGraph" style={{height: (data.price / 30) + "%"}}>
                <h2 className="BarNamePosition">{data.symbol}<br /> {data.price}</h2>
                </div>
                ))
            }
        </div>
    );
  }
}

export default MainContentBorder;