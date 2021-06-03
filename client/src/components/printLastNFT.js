import React, {Component} from 'react'

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
            currentCount: null
        };

        //this.handleHashChange = this.handleHashChange.bind(this);
    }

    prepareCountHash = () => {
        const {drizzle, drizzleState} = this.props
        const contract = drizzle.contracts.NFTmint

        //if( ! drizzleState ) return null
        const user = drizzleState.accounts[0]

        const currentCount = contract.methods["totalVNFSupply"].cacheCall( {
            from: user
        })
        
        console.log(currentCount)
        return currentCount
        //this.setState( { currentCount })
    }

    printLast = () => {
        
        const {drizzle, drizzleState} = this.props
        const contract = drizzle.contracts.NFTmint
        const user = drizzleState.accounts[0]
        const { NFTmint } = drizzleState.contracts
        const countHash = this.prepareCountHash()
        //const count = await NFTmint.totalVNFSupply[countHash]
        console.log(countHash)

        const hashes = []
        /*for( let i = count-n; i < count; i++){
            hashes[i] = await contract.methods["tokenURI"].cacheCall(i, {
                from: user
            })
        }*/
        /*console.log( hashes )
        return
        const operas = []
        for( let hash in hashes){
            const ipfsHash = await NFTmint.tokenURI[hash];
            if( ipfsHash && ipfsHash.value){
                fetch('https://ipfs.io/ipfs/' + ipfsHash.value)
                .then(response => response.json())
                .then( (data) => {
                    operas[hash] = data
                })
            } 
            console.log( operas );
        }
        return operas*/
        return (
            <div>

            </div>
        )
    }

    render() {
        return (
            <div>
               asdasdsa
            </div>
        )
    }

}

export default PrintLastNFT