import hre, { artifacts, ethers } from "hardhat";
import {loadFixture, deployContract} from 'ethereum-waffle';
import {expect} from 'chai';
import { message } from "antd";
import assert, { AssertionError } from "assert";

async function deployFixture() {
    const Test1 = await hre.ethers.getContractFactory("Test1");
    const cond = await Test1.deploy();
    return{cond};
}


describe("Test1", function(){

    it("", async function () {
        const [owner, investor, kid] = await ethers.getSigners();
        const Test = await ethers.getContractFactory("Test1");
        const contract = await Test.deploy();

        
        
    })

    it("Should add kid to investor", async function () {
    })
})