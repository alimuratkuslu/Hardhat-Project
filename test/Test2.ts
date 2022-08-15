import hre, { artifacts, ethers } from "hardhat";
import {loadFixture, deployContract} from 'ethereum-waffle';
import {expect} from 'chai';
import { message } from "antd";
import assert, { AssertionError } from "assert";

async function deployFixture() {
    const Test1 = await hre.ethers.getContractFactory("Test2");
    const cond = await Test1.deploy();
    return{cond};
}

describe("Test2", function(){

    it("Should connect kid to investor", async function () {
        const [owner, investor, kid] = await ethers.getSigners();
        const Test = await ethers.getContractFactory("Test2");
        const contract = await Test.deploy();

        contract.addUser(investor.address, "Ali", 0, 1000, true, true);
        contract.addUser(kid.address, "Mehmet", 0, 200000000, false, false);

        contract.addKidToInvestor(investor.address, kid.address);

        expect(await contract.getKidsOfInvestorByIndex(investor.address, 0)).to.equal("Mehmet");
    })

    it("Should send kid 100 ETH", async function () {

        const [owner, investor, kid] = await ethers.getSigners();
        const Test = await ethers.getContractFactory("Test2");
        const contract = await Test.deploy();

        contract.addUser(investor.address, "Ali", 0, 1000, true, true);
        contract.addUser(kid.address, "Mehmet", 0, 200000000, false, false);
        contract.addKidToInvestor(investor.address, kid.address);

        await contract.connect(investor).transfer(kid.address, 100);
        expect(await contract.balanceOf(kid.address)).to.equal(100).to.be.revertedWith("Error during transaction");
    })

    it("Should withdraw 100 ETH from kid", async function () {

        const [owner, investor, kid] = await ethers.getSigners();
        const Test = await ethers.getContractFactory("Test2");
        const contract = await Test.deploy();

        contract.addUser(investor.address, "Ali", 0, 1000, true, true);
        contract.addUser(kid.address, "Veli", 0, 1660465812, false, false);

        contract.addKidToInvestor(investor.address, kid.address);
        await contract.connect(investor).transfer(kid.address, 100);
        contract.withdraw(kid.address);
    
        expect(await contract.balanceOf(kid.address)).to.equal(100).to.be.revertedWith("You can't withdraw yet");        
    })

    it("Should not let kid withdraw ETH", async function () {

        const [owner, investor, kid] = await ethers.getSigners();
        const Test = await ethers.getContractFactory("Test2");
        const contract = await Test.deploy();

        contract.addUser(investor.address, "Ali", 0, 1000, true, true);
        contract.addUser(kid.address, "Mehmet", 0, 2228544221, false, false);

        contract.addKidToInvestor(investor.address, kid.address);
        await contract.connect(investor).transfer(kid.address, 100);

        expect(await contract.getKidsWithdrawStatus(kid.address)).to.equal(false).to.be.revertedWith("You can withdraw");
    })

    it("Should reverse 100 ETH investment", async function () {

        const [owner, investor, kid] = await ethers.getSigners();
        const Test = await ethers.getContractFactory("Test2");
        const contract = await Test.deploy();

        contract.addUser(investor.address, "Ali", 0, 1000, true, true);
        contract.addUser(kid.address, "Veli", 0, 1660465802, false, false);

        contract.addKidToInvestor(investor.address, kid.address);
        await contract.connect(investor).transfer(kid.address, 100);
        contract.availableToWithdraw(kid.address);
        contract.withdraw(kid.address);
        await contract.reverseInvestment(investor.address, kid.address);

        expect(await contract.getBalance(kid.address)).to.equal(0).to.be.revertedWith("Kid has 100 ETH");

    } )
})