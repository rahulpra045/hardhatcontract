const { inputToConfig } = require("@ethereum-waffle/compiler");
const {expect} = require("chai");


describe("Token contract", function () {

    let Token;
    let hardhatToken;
    let owner;
    let add1;
    let add2;
    let adds;

    //mocha framework hooks

    beforeEach(async function(){
        Token = await ethers.getContractFactory("Token");
        [owner,add1,add2,...adds] = await ethers.getSigners();
        hardhatToken = await Token.deploy();
    });
    describe("Deployment", function () {
        it("Should set the right owner", async function(){
          expect(await hardhatToken.owner()).to.equal(owner.address);
        });

        it("Should assig the total supply of tokens to the owner", async function(){
            const ownerBalance = await hardhatToken.balanceOf(owner.address);
            expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
          });
    });

    describe("Transactions", function(){
        it("Should transfer token between accounts", async function(){
            //owner to add1 account
            await hardhatToken.transfer(add1.address,5);
            const add1Balance = await hardhatToken.balanceOf(add1.address);
            expect(add1Balance).to.equal(5);

            await hardhatToken.connect(add1).transfer(add2.address,5);
            const add2Balance = await hardhatToken.balanceOf(add2.address);
            expect(add2Balance).to.equal(5);
        });

        it("Should fail if sender does not have enough tokens", async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await expect(hardhatToken.connect(add1).transfer(owner.address,1)).to.be.revertedWith("Not enough tokens");

            expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
        
        });

        it("Should  update balances after transactions", async function(){
            const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
            await hardhatToken.transfer(add1.address,5);
            await hardhatToken.transfer(add2.address,10);

            const finalOwnerBalance = await hardhatToken.balanceOf(owner.address);
            expect(finalOwnerBalance).to.equal(initialOwnerBalance-15);

            const add1Balance = await hardhatToken.balanceOf(add1.address);
            expect(add1Balance).to.equal(5);
            const add2Balance = await hardhatToken.balanceOf(add2.address);
            expect(add2Balance).to.equal(10);

        })
    });
});

//library document-----https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbm5VM0pWMkpYY1AtMHNJLXBuYVhsRVJ0LUNmZ3xBQ3Jtc0ttS3BoQUg1ZGkyMFVocnZWMThTeVNjN054VTBheUI5VDd0Rm1YcklDdVN0RXJXMEJFVWlJMFU2MDVOci1aVHhxSVd6Y2JZVUlYUnVHU3ZxcG90VnJsV3hjN2UySXJxc0FTMlBSRU10MGZka3hwZ0d0UQ&q=https%3A%2F%2Fethereum-waffle.readthedocs.io%2Fen%2Flatest%2Fmatchers.html&v=ptoGq1J36KQ 

    // it("Deployment should assign the total supply of tokens to the owner",async function(){

    //     const [owner] = await ethers.getSigners();
    //     // console.log("Signers object:",owner);
    //     const Token = await ethers.getContractFactory("Token");  // creating instances

    //     const hardhatToken = await Token.deploy();  //deploy contract

    //     const ownerBalance = await hardhatToken.balanceOf(owner.address); // get to know balance of owner = 10000
    //     // console.log("owner address: ",owner.address);

    //     expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); // total supply = 10000
    // }); // to test each function which we want to ...individually

    // it("Should transfer tokens between accounts",async function(){

    //     const [owner,add1,add2] = await ethers.getSigners();
       
    //     const Token = await ethers.getContractFactory("Token");  // creating instances

    //     const hardhatToken = await Token.deploy();  //deploy contract

    //     //transfer 10 tokens from owner to add1

    //     await hardhatToken.transfer(add1.address,10);
    //     expect(await hardhatToken.balanceOf(add1.address)).to.equal(10); 

    //     //transfer 5 tokens from  add1 to add2
    //     await hardhatToken.connect(add1).transfer(add2.address,5);
    //     expect(await hardhatToken.balanceOf(add2.address)).to.equal(5); 

        
    // });
