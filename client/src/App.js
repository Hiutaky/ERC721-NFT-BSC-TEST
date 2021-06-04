import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import UserNFT from './components/userNFT';
import MintNFT from './components/mintNFT';
import GetNFTMeta from './components/getNFTmeta';
import PrintLastNFT from './components/printLastNFT';


class App extends Component {
  state = { 
    loading: true, 
    drizzleState: null
  };

  componentDidMount() {
    const { drizzle } = this.props;

    // subscribe to changes in the store
    this.unsubscribe = drizzle.store.subscribe(() => {

      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        this.setState({ loading: false, drizzleState });
      }
    });

  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    if (this.state.loading) return "Loading Venafrum NFT...";
    return (
      <div className="App">
        <div className="header">
          <UserNFT
            drizzle={this.props.drizzle} 
            drizzleState={this.state.drizzleState}
          />
        </div>
        <div className="main">
          <MintNFT
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />
          <GetNFTMeta
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
          />
        </div>
        <div className="loop"> 
            <PrintLastNFT 
            drizzle={this.props.drizzle}
            drizzleState={this.state.drizzleState}
            />
        </div>

      </div>
    );
  }
}

export default App;