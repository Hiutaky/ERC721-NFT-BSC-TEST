const NFTmint = artifacts.require("./NFTmint.sol"); //importing smartcontract file

contract("NFTmint", accounts => {
    it("should create a new nft", async() => {
        const VNF = await NFTmint.deployed();

        const opera = await VNF.mintOpera(accounts[0], "https://metadata.it/file.js");
        console.log(opera);
        /*const owner = await NFTmint.ownerOf();
        WebAuthnAssertion.equal()*/
    });
});