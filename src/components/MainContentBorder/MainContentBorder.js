import React, { Component } from 'react';
import './MainContentBorder.css';


class MainContentBorder extends Component {

  // TODO: modify code that would tie info from here to state using props

  render() {
    return (
        <div className="MainContentBorder">
          {
            this.props.stockList.map(data => (
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