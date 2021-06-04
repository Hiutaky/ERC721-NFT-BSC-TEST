import React, { Component } from "react";

class UserNFT extends Component {
    state = {
        balanceOf: null
    };

    componentDidMount() {
        const {drizzle, drizzleState} = this.props;
        const contract = drizzle.contracts.NFTmint;
        const user = drizzleState.accounts[0];

        const balanceOf = contract.methods["balanceOf"].cacheCall(user, {
            from: user
        });

        this.setState( { balanceOf });
    }

    render() {
        const { drizzleState } = this.props;
        const { NFTmint } = this.props.drizzleState.contracts;
        const user = drizzleState.accounts[0];
        
        const balanceOf = NFTmint.balanceOf[this.state.balanceOf];
        
        return <div className="userInfo">Contract Address: {NFTmint.address} Current user: <b>{ user }</b> NFT count: { balanceOf && balanceOf.value }</div>
    }
}

export default UserNFT;