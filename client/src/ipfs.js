//using the infura.io node, otherwise ipfs requires you to run a daemon on your own computer/server. See IPFS.io docs
const { create } = require('ipfs-http-client')
const ipfs = new create( new URL('https://ipfs.infura.io:5001') );

//run with local daemon
// const ipfsApi = require('ipfs-api');
// const ipfs = new ipfsApi('localhost', '5001', {protocol: 'http'});

export default ipfs; 