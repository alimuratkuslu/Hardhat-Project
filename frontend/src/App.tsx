import 'antd/dist/antd.css';
import { Breadcrumb, Layout, Menu, Row, Input, Col, Button, notification, message } from 'antd'; 
import { useState } from 'react';
import {ethers} from 'ethers';
import { TEST_ABI, TEST_ADDRESS } from './constants/Test1';
import { Link, Route, BrowserRouter as Router, useNavigate, Routes } from 'react-router-dom';
import DepositETH from './components/depositETH';
import CreateUser from './components/createUser';
import MainPage from './components/mainPage';
import './App.css';
import { Header } from 'antd/lib/layout/layout';


function App() {

  const [name, setName] = useState("");
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

  return (
    <Router>
      <div className='App'>
      <Routes>
        <Route path='/' element={<MainPage/>}></Route>
        <Route path='/transfer' element={<DepositETH/>}></Route>
        <Route path='/createUser' element={<CreateUser/>}></Route>
      </Routes>
      </div>
    </Router>
  );
}

export default App;
