import 'antd/dist/antd.css';
import { Breadcrumb, Layout, Menu, Row, Input, Col, Button, notification, message } from 'antd'; 
import { useState } from 'react';
import {ethers} from 'ethers';
import { TEST_ABI, TEST_ADDRESS } from './constants/Test1';
import { Link, Route, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import DepositETH from './components/depositETH.js';
import './App.css';


function App() {

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [releaseTime, setReleaseTime] = useState("");
  const [isInvestor, setIsInvestor] = useState(false);
  const [canWithdraw, setCanWithdraw] = useState(false);
  const [connectButtonText, setConnectButtonText] = useState('Connect Wallet');
  const [defaultAccount, setDefaultAccount] = useState(null);

  const createUser = async () => {
    if(address === "" || name === ""){
      notification['error']({
        message: 'Wallet Address and Amount required'
      });
      return;
    }

    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(); 
    const contract = new ethers.Contract(TEST_ADDRESS, TEST_ABI, signer);

    const create = await contract.addUser(address, name, amount, releaseTime, isInvestor, canWithdraw);

    const res = await create.wait();

    notification['info']({
      message: 'User with wallet address: ' + address + ' has been created'
    });

    console.log(create);
    console.log(res);
  }

  const accountChangedHandler = (newAccount: any) => {
    setDefaultAccount(newAccount);
  } 

  const connectWallet = () => {
    //@ts-ignore
    if(window.ethereum){
      //@ts-ignore
      window.ethereum.request({method: 'eth_requestAccounts'}).then(result => {
        accountChangedHandler(result[0]);
        setConnectButtonText('Wallet Connected');
        notification['info']({
          message: 'You are connected'
        });
      })
    }
    else{
      notification['error']({
        message: 'You need to install Metamask'
      });
      return;
    }
  }

  return (
    <Router>
      <div className='App'>
      <Button type="primary" onClick={connectWallet}>{connectButtonText}</Button>
      <Row style={{ margin: "10px" }}>
        <Col md={12}>
            <Input placeholder="Wallet Address" onChange={(e: any) => setAddress(e.target.value)} />
          </Col>
      </Row>

      <Row style={{ margin: "10px" }}>
        <Col md={24}>
        <Input placeholder="Name" onChange={(e: any) => setName(e.target.value)}/>
      </Col>
      </Row>

      <Row style={{ margin: "10px" }}>
        <Col md={24}>
        <Input placeholder="Amount in ETH" onChange={(e: any) => setAmount(e.target.value)}/>
      </Col>
      </Row>

      <Row style={{ margin: "10px" }}>
        <Col md={24}>
        <Input placeholder="Release Time" onChange={(e: any) => setReleaseTime(e.target.value)}/>
      </Col>
      </Row>
      <Button type="primary" onClick={createUser}> Create User ! </Button>
      </div>
    </Router>
  );
}

export default App;
