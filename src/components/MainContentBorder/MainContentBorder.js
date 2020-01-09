import React, { Component } from 'react';
import './MainContentBorder.css';


class MainContentBorder extends Component {

  // TODO: modify code that would tie info from here to state using props

  render() {
    return (
        <div className="MainContentBorder">
          {
            this.props.stockList.map(data => (
              <div className="BarsInGraph"
              style={{height: (data.price / 30) + "%"}}>
                {/* Add style in-code so height matches data provided */}
                  {/* by API. */}

                {/* Default height is 1% */}

                {/* Height = price / 30, then "%" is added to CSS can read */}

                <h2 className="BarNamePosition">
                  {data.symbol}<br /> 
                  {data.price}
                  </h2>
                  
                </div>
                ))
            }
        </div>
    );
  }
}

export default MainContentBorder;