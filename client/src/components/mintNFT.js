import React, {Component} from 'react';
import ipfs from '../ipfs';
const { create } = require('ipfs-http-client')


class MintNFT extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stackId: null,
            NFTHash:null,
            imageHash: null,
            address: this.props.drizzleState.accounts[0],//default address = current user address
            title: '',
            description: '',
            position: '',
            age: '',
            buffer:'',
            isNFTMinted: false
        };

        this.MintNFT = this.MintNFT.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
    }


    handleKeydown = e => {
        if (e.keyCode === 13 ){
            this.MintNFT(e.target.value);
        }
    }

    handleChange = e => {
        const arg = e.target.name;
        const value = e.target.value;
        this.setState( { [arg]: value } )
    }

    handleAddressChange = e => {
        const value = e.target.value;
        if( this.state.address !== value )
            this.setState( { value } )
    }

    /** CAPTURE FILE E BUFFER */

    captureFile = (event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
    };

    convertToBuffer = async(reader) => {
      //file is converted to a buffer to prepare for uploading to IPFS
        const buffer = await Buffer.from(reader.result);
      //set this buffer -using es6 syntax
        this.setState({buffer});
    };


    MintNFT = async(event) => {
        event.preventDefault();
        const {drizzle, drizzleState } = this.props;
        const contract = drizzle.contracts.NFTmint;
        const userAddress = drizzleState.accounts[0];
        const { address } = this.state;
        const state = this.state;

        const path = async () => { 
            const { path } = await ipfs.add(state.buffer)//load image an retrieve the hashid
            return path
        }

        this.setState({
            imageLoad: true
        })

        const imageHash = await path();
        state.imageHash = imageHash

        const metaDataJSON = JSON.stringify( state )

        const jsonPath = async () => { 
            const { path } = await ipfs.add( metaDataJSON )//load image an retrieve the hashid
            return path
        }

        const NFTHash = await jsonPath()

        this.setState( { NFTHash } )

        
        const stackId = contract.methods["mintOpera"].cacheSend(address, NFTHash, { //mint a new nft and assign as metauri the ipfs hashid
            from: userAddress
        });

        this.setState({
            isNFTMinted: true
        })

        this.setState({stackId});
        /*await ipfs.add(metaData, (err, ipfsHash) => {
            console.log(err,ipfsHash);
            this.setState( { ipfsHash: ipfsHash[0].hash } )
        })*/
    }

    getTxStatus = () => {
        const { transactions, transactionStack } = this.props.drizzleState;
        const txHash = transactionStack[this.state.stackId];

        if( ! txHash ) return null;

        return `NFT Mint Status: ${transactions[txHash] && transactions[txHash].status === 'success' ? 'Minted' : 'Loading'}`;
    }

    getIPFSImageHash = () => {
        if( !this.state.imageHash ) return null;

        return 'Image IPFS Hash: ' + this.state.imageHash;
    }

    getIPFSMetadataHash = () => {
        if( !this.state.NFTHash ) return null;

        return 'NFT IPFS Hash: ' + this.state.NFTHash;
    }

    render() {
        return (
            <div className="column">
                <form onSubmit={this.MintNFT} className="mintForm">
                <h2>Mint a NEW Opera</h2>
                    <label>
                        Mint to Address:
                        <input type="text" name="address" value={this.state.address} onChange={this.handleAddressChange} required />
                    </label>
                    <label>
                        Title:
                        <input type="text" name="title" onChange={this.handleChange} required/>
                    </label>
                    <label>
                        Description:
                        <input type="text" name="description" onChange={this.handleChange} required/>
                    </label>
                    <label>
                        Position:
                        <input type="text" name="position" onChange={this.handleChange} required/>
                    </label>
                    <label>
                        Image ( URL jpeg, jpg, png ):
                        <input type="file" name="image" onChange={this.captureFile} required/>
                    </label>
                    <label>
                        Age ( Select a range ):
                        <select name="age" onChange={this.handleChange} required>
                            <option value="0">0 - 99 ( I )</option>
                            <option value="100">100 - 199 ( II )</option>
                            <option value="200">200 - 299 ( III )</option>
                            <option value="300">300 - 399 ( IV )</option>
                            <option value="400">400 - 499 ( V )</option>
                            <option value="500">500 - 599 ( VI )</option>
                            <option value="600">600 - 699 ( VII )</option>
                            <option value="700">700 - 799 ( VIII )</option>
                            <option value="800">800 - 899 ( IX )</option>
                            <option value="900">900 - 999 ( X )</option>
                        </select>
                    </label>
                    <input className="submitButton" type="submit" value="Mint NFT" />
                    <div> { this.getIPFSImageHash() } </div>
                    <div> { this.getIPFSMetadataHash () } </div>
                    <div> { this.getTxStatus() } </div>
                </form>
            </div>
        )
    }
}

export default MintNFT;