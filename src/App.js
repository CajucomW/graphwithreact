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
    let value = ev.target.value;
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
        // console.log("current list", this.state.stockList)
  }

  removeValue = () => {
    let currentList = this.state.stockList;
    let removeThis = this.state.symbolToSearch;
    console.log("symbol entered", removeThis);

    for (let item of currentList) {
      console.log(item.symbol);
      if (item.symbol === removeThis) {
        console.log("MATCH!", item.symbol);
        let removeThisNumber = currentList.indexOf(item);
        console.log("This is the index number:", removeThisNumber);
        currentList.splice(removeThisNumber, 1);
      } else {
        console.log("no match!");
      }
      // let index = currentList.indexOf(removeThis);
    }
    console.log("current list", currentList);

    
    


  }


    // let itemPosition = listPlusInput.indexOf(removeThis);
    // console.log('item position?', itemPosition);

    // let filtered = listPlusInput.filter(
    //   item => item !== removeThis
    //   );
    //   console.log("filtered list", filtered);

    // let filtered = listPlusInput.filter(function(item) {
    //   return item !== removeThis
    //   })
    // console.log("filtered list", filtered);
  // }

  // removeStock = () => {
  //   let currentList = this.state.stockList;

    // TODO: state.stockList returns an ARRAY. To remove items in the ARRAY,
    // I need to specify which on to delete. Somehow, I need to connect the ARRAY w/ specific SYMBOLs.
    // Look into 'removeChild' to remove elements
    // Another option in using the .filtered method to remove items in the ARRAY
    // Quidditch Challenge would work

    // How about making a list of current stock in the graph (stockList), then redefining it by removing
    // whatever was entered in the input field?
  // }

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
          // onClickSubmit={this.addValue}
          // removeStock={this.state.removeStock} 
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