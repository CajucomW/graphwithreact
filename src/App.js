import React, { Component } from 'react';
import './App.css';

import MainTitle from './components/MainTitle/MainTitle.js';
import MainContentBorder from './components/MainContentBorder/MainContentBorder';
import InputArea from './components/InputArea/InputArea';
import Button from './components/Button/Button';


class App extends Component {
  state = {
    symbolToSearch: '',
    stockList: [
      {
        symbol: '',
        price: '',
      },
    ],
    stocksToDisplay: ["CMG", "MCD", "WEN", "PEP", "COKE"]
    // add to this list when adding/subtracting stock
  };

  componentDidMount = () => {
    fetch("https://financialmodelingprep.com/api/v3/stock/real-time-price/")
      .then(response => response.json())
      .then(data => {
        
        let startingList = [];
        for (let item of data.stockList) {
          if (this.state.stocksToDisplay.includes(item.symbol)) {
              startingList.push(item);
          }
        }
// make startingList become stockList Michael's suggestion
        this.setState({
          stockList: startingList,
        });
      });
  }

  newSymbolToChange = (ev) => {
    let value = ev.target.value;
    this.setState({
       symbolToSearch: value,
    });
  }

  onSubmit = () => {
    let listPlusInput = this.state.stockList;
    fetch('https://financialmodelingprep.com/api/v3/stock/real-time-price/' + this.state.symbolToSearch)
        .then(response => response.json())
        .then(data => {
          listPlusInput.push(data)
          this.setState({
            stockList: listPlusInput,
            symbolToSearch: '',
          });
        })
      
  }

  removeStock = () => {
    // TODO: state.stockList returns an ARRAY. To remove items in the ARRAY,
    // I need to specify which on to delete. Somehow, I need to connect the ARRAY w/ specific SYMBOLs.
    // Look into 'removeChild' to remove elements
    // Another option in using the .filtered method to remove items in the ARRAY
    // Quidditch Challenge would work
  }

  render() {
    return (
      <div className="App">
        <MainTitle 
          text="Stock Market Prices" />

        <MainContentBorder 
          stockList={this.state.stockList} />

        <InputArea 
          value={this.state.symbolToSearch}
          newSymbolToChange={this.newSymbolToChange}
          onClickSubmit={this.onSubmit}
        // removeStock={this.state.removeStock} 
        />

        <Button
          text="Submit"
          selected={this.onSubmit} />
          
      </div>
    );
  }
}

export default App;