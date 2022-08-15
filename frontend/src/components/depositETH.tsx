import 'antd/dist/antd.css';
import { Breadcrumb, Layout, Menu, Row, Input, Col, Button, notification } from 'antd'; 
import { useState } from 'react';
import {ethers} from 'ethers';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { TEST_ABI, TEST_ADDRESS } from '../constants/Test1';
import { Header } from 'antd/lib/layout/layout';
import App from '../App';
import { render } from '@testing-library/react';

export default function DepositETH() {

  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  //const price = useExchangeEthPrice(targetNetwork, mainnetProvider);

  const sendEth = async() => {

    if(address === "" || amount === ""){
      notification['error']({
        message: 'Wallet Address and Amount required'
      });
      return;
    }

    //@ts-ignore
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(); 
    const contract = new ethers.Contract(TEST_ADDRESS, TEST_ABI, signer);

    const deposit = await contract.transfer(address);
    const res = await deposit.wait();

    notification['info']({
      message: 'You have sent ' + amount + ' to ' + address 
    });
  }

  return(
    <div className='Transfer'>
      <Header/>
      <Row style={{ margin: "10px" }}>
      <Col md={12}>
      <Input placeholder="Wallet Address" onChange={(e: any) => setAddress(e.target.value)} />
      </Col>
      </Row>

      <Row style={{ margin: "10px" }}>
      <Col md={24}>
      <Input placeholder="Amount in ETH" onChange={(e: any) => setAmount(e.target.value)}/>
      </Col>
      </Row>

      <Button type="primary" onClick={sendEth}> Send ETH ! </Button>
    </div>
  );
}
