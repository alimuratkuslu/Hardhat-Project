import 'antd/dist/antd.css';
import { Breadcrumb, Layout, Menu, Row, Input, Col, Button, notification, message } from 'antd'; 
import { UseState } from 'react';
import {ethers} from 'ethers';
import { TEST_ABI, TEST_ADDRESS } from '../constants/Test1';

const DepositETH = () => {

    const [address, setAddress] = UseState("");
    const [amount, setAmount] = UseState("");

    const sendETH = async () => {
        if(address === "" || amount === ""){
          notification['error']({
            message: 'Wallet Address and Amount required'
          });
          return;
        }
    
        //@ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
    
        const signer = provider.getSigner(); 
        const contract = new ethers.Contract(TEST_ADDRESS, TEST_ABI, signer);
    
        const tx = await contract.transfer(address);
    
        const res = await tx.wait();
    
        console.log(tx);
        console.log(res);
    
        /*notification['info']({
          message: 'User with wallet address: ' + address + ' has been created'
        });*/
      }


    return (
        <>
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

        <Button type="primary" onClick={sendETH}> Send ETH ! </Button>
        </>
    );
}

export default DepositETH;
