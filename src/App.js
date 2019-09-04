import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    searchTerm: '',
    stockList: [
      {
        symbol: "",
        price: '',
      },
    ],
  };

  componentDidMount = () => {
    fetch("https://financialmodelingprep.com/api/v3/stock/real-time-price")
      .then(response => response.json())
      .then(data => {
        console.log('Did component mount?', data);
        // make a newList Michael's suggestion
        // specify whick symbols I want from the stockList Michael's suggestion
        // push the items in the newList
        let newList = [];
        for (let item of data.stockList) {
          if (
            // item.symbol === "CMG"
            //     || item.symbol === "MCD"
        //         || item.symbol === "WEN"
        //         || item.symbol === "PEP"|| 
                item.symbol === "COKE") {
              newList.push(item);
          }
        }
// make newList become stockList Michael's suggestion
        this.setState({
          stockList: newList,
        });
        console.log('this.state.stockList', this.state.stockList);
      });
  }

  newOnSearchTermChange = (ev) => {
    let value = ev.target.value;
    console.log('is this working?');
    this.setState({
       searchTerm: value,
    });
    console.log('is setState working?', this.state.searchTerm);
  }

  onSubmit = () => {
    let listPlusInput = this.state.stockList;
    console.log('is the button working?', this.state.searchTerm);
    fetch('https://financialmodelingprep.com/api/v3/stock/real-time-price/' + this.state.searchTerm)
        .then(response => response.json())
        .then(data => {
          listPlusInput.push(data)
          console.log('this is the data', data);
          this.setState({
            stockList: listPlusInput,
            searchTerm: '',
          });
          // if (this.state.stockList > 5) {
          //   this.state.stockList.shift();
          //   console.log('stockList after onSubmit', this.state.stockList);
          //   }
        })

        
  }

  removeStock = () => {
    console.log('Removing', this.state.searchTerm);
    // TODO: state.stockList returns an ARRAY. To remove items in the ARRAY,
    // I need to specify which on to delete. Somehow, I need to connect the ARRAY w/ specific SYMBOLs.
    // Look into 'removeChild' to remove elements
    // Another option in using the .filtered method to remove items in the ARRAY
    // Quidditch Challenge would work
  }

  render() {
    return (
      <div className="App">
        <h1 className="MainTitle">Stock Market Prices</h1>
        <div className="MainContentBorder">
          {
            this.state.stockList.map(data => (
              <div className="BarsInGraph" style={{height: (data.price / 30) + "%"}}>
                <h2 className="BarNamePosition">{data.symbol}<br /> {data.price}</h2>
                </div>
                ))
            }
        </div>
        <input
            placeholder="Enter Stock Symbol to Add or Remove"
            className="InputField"
            value={this.state.searchTerm}
            onChange={this.newOnSearchTermChange} /><br />
        <button className="SubmitStyle" onClick={() => this.onSubmit()}>Submit</button><br />
        <button className="RemoveStyle" onClick={() => this.removeStock()}>Remove</button>

          
      </div>
    );
  }
}

export default App;