import { Breadcrumb, Layout, Menu, Row, Input, Col, Button, notification, message } from 'antd'; 
import { Header } from 'antd/lib/layout/layout';
import { useState } from 'react';
import { browserName } from 'react-device-detect';

export default function MainPage() {

    const [connectButtonText, setConnectButtonText] = useState('Connect Wallet');
    const [defaultAccount, setDefaultAccount] = useState(null);
    
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
          setConnectButtonText("Connect Wallet");

          if(browserName === "Chrome"){
            window.location.replace("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en");
          }
          else if(browserName === "Firefox"){
            window.location.replace("https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/");
          }
          else if(browserName === "Brave"){
            window.location.replace("https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en");
          }
          notification['error']({
            message: 'You need to install Metamask'
          });
          return;
        }
    }

    return(
        <div>
            <Header/>
            <Button type="primary" onClick={connectWallet}>{connectButtonText}</Button>
        </div>
    );
}