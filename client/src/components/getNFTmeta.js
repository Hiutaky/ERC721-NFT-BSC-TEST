import React, {Component, useState, useEffect } from 'react';

class GetNFTMeta extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: this.props.drizzleState.accounts[0],
            tokenId: null,
            ipfsHash: null,
            imageHash: null,
            age: null,
            description: '',
            imageHash: '',
            position: '',
            title: null
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.handleHashChange = this.handleHashChange.bind(this);
    }

    handleChange = e => {
        const value = e.target.value;

        this.setState( { tokenId: value });
        console.log( this.state.tokenId );
    }

    prepareHash = async (tokenId, user, contract) => {
        const ipfsHash = contract.methods["tokenURI"].cacheCall(tokenId, {
            from: user
        });

        return ipfsHash;
    }

    handleSearch = async event => {
        event.preventDefault();
        const {drizzle, drizzleState} = this.props;
        const contract = drizzle.contracts.NFTmint;
        const user = drizzleState.accounts[0];
        const tokenId = this.state.tokenId;
        const { NFTmint } = drizzleState.contracts;
        console.log(tokenId);

        const ipfsHash = await this.prepareHash(tokenId, user, contract);

        console.log(ipfsHash)
        this.setState( { ipfsHash });
        
        const lastipfsHash = await NFTmint.tokenURI[this.state.ipfsHash];

        if( lastipfsHash && lastipfsHash.value){
            fetch('https://ipfs.io/ipfs/' + lastipfsHash.value)
            .then(response => response.json())
            .then( (data) => {
                this.setState( data )
            })
        }

    }

    printResult = () => {
        if( ! this.state.ipfsHash || ! this.state.title) return null;

        return(
        <div className="itemContainer">
            <div>IPFS Hash: {this.state.ipfsHash} </div>
            <div>Name: {this.state.title}</div>
            <div>Description: {this.state.description}</div>
            <div>Position: {this.state.position}</div>
            <div>Age: {this.state.age}</div>
            <div>Image: <img className="nft-image" src={this.state.imageHash ? 'https://ipfs.io/ipfs/' + this.state.imageHash : ''}></img></div>
        </div>
        )
            
    }



    render () {
        const { drizzleState } = this.props;
        const { NFTmint } = drizzleState.contracts;
        const user = drizzleState.accounts[0];
        
        const ipfsHash = NFTmint.tokenURI[this.state.ipfsHash];
        

        //return <div>Current Token: { this.state.tokenId } MetaValue: { metaValue && metaValue.value }</div>
        return (
            <div className="column">
                <h2>Search Opera by tokenId</h2>
                <form onSubmit={this.handleSearch} className="searchMeta">
                    <label>
                        Search by Token ID:
                        <input type="text" name="tokenId" onChange={this.handleChange} />
                    </label>
                    <input type="submit" className="submitButton" value="Search NFT Meta" />
                </form>
                { this.printResult() }
            </div>
        )
    }



}

export default GetNFTMeta;