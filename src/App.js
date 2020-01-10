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
        // console.log("current list", this.state.stockList)
      });
  }

  newSymbolToChange = (ev) => {
    let upper = ev.target.value;
    let value = upper.toUpperCase();
    // use .toUpperCase to automatically set string in uppercase to match API text

    this.setState({
       symbolToSearch: value,
    });
  }

  addValue = () => {
    let listPlusInput = this.state.stockList;
    fetch('https://financialmodelingprep.com/api/v3/stock/real-time-price/' + this.state.symbolToSearch)
        .then(response => response.json())
        .then(data => {
          listPlusInput.push(data)
          this.setState({
            stockList: listPlusInput,
            symbolToSearch: '',
          });
        });
    console.log("current list", this.state.stockList)
  }

  removeValue = () => {
    let currentList = this.state.stockList;
    let removeThis = this.state.symbolToSearch;

    for (let item of currentList) {
      if (item.symbol === removeThis) {
      // if the item symbol is equal to 'removeThis'

        let removeThisNumber = currentList.indexOf(item);
        // then assign that item to 'removeThisNumber'
        // .indexOf looks in the array for the specific item and 
          // tells us it's position/number

        currentList.splice(removeThisNumber, 1);
        // .splice either ADDs or REMOVEs an item from the array
        // the .splice method rearranges the original array
        }
      }
      this.setState({
        stockList: currentList,
        symbolToSearch: '',
      });
      console.log("current list", this.state.stockList);
    }


  render() {
    return (
      <div className="App">
        <MainTitle 
          text="Stock Market Prices" />

        <MainContentBorder 
          stockList={this.state.stockList} />

        <InputArea 
          placeholder="Enter Stock Symbol to Add or Remove"
          value={this.state.symbolToSearch}
          newSymbolToChange={this.newSymbolToChange}
        />

        <Button
          text="Add"
          selected={this.addValue} />

        <br />

        <Button
          text="Remove"
          selected={this.removeValue} />
          
      </div>
    );
  }
}

export default App;