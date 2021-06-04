import React, {Component, useEffect} from 'react'

/**
 * 
 * try to retrieve last (n) NFT metadata and print the infos it into a loop,
 * similar to getNFTmeta handleSearch
 * 
 */

class PrintLastNFT extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalSupply: null
        };

    }

    prepareHash = async (tokenId, user, contract) => {
        const ipfsHash = contract.methods["tokenURI"].cacheCall(tokenId, {
            from: user
        });

        return ipfsHash;
    }

    fetchSupply = async () => {
        const {drizzle, drizzleState} = this.props;
        const contract = drizzle.contracts.NFTmint;
        const user = drizzleState.accounts[0];
        const { NFTmint } = this.props.drizzleState.contracts;
        const totalSupplyTX = await contract.methods["totalSupply"].cacheCall({
            from: user
        });
        const newTotalSupply = await NFTmint.totalSupply[totalSupplyTX];
        console.log(newTotalSupply)
        const supply = newTotalSupply.value 
        this.setState({ totalSupply: newTotalSupply.value })
    }

    handleSearch = async () => {
        const {drizzle, drizzleState} = this.props;
        console.log(drizzle)
        const contract = drizzle.contracts.NFTmint;
        const user = drizzleState.accounts[0];
        const { NFTmint } = this.props.drizzleState.contracts;
        this.fetchSupply()
        console.log(this.state.totalSupply)

        /*const supply = 0
        for( let i = 1; i === supply; i++){
            console.log(i)
            const ipfsHash = await this.prepareHash(i, user, contract)
            console.log(NFTmint)
            const lastipfsHash = await NFTmint.tokenURI[ipfsHash]

            if( lastipfsHash && lastipfsHash.value){
                const result = await fetch('https://ipfs.io/ipfs/' + lastipfsHash.value)
                .then(response => response.json())
                .then( (data) => {
                    return (data)
                })
                console.log(result)
            }
        }*/

    }

    getIPFSImageHash = () => {
        
        const {drizzle, drizzleState} = this.props;
        if( ! this.state.totalSupply ) return null;

        return 'Image IPFS Hash: ' + this.state.imageHash;
    }


    render() {
        
        const {drizzle, drizzleState} = this.props;
        return (
            <div>
                { drizzleState.drizzleStatus.initialized ? this.getIPFSImageHash() : ''}
            </div>
        )
    }

}

export default PrintLastNFT