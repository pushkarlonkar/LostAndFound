import React, { Component, useState, useEffect } from "react";
import Web3 from "web3";
import ComplainNetworkJson from "./contracts/ComplainNetwork.json";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Home from "./components/Home/Home";
import Register from "./components/Pages/Register/Register";
import View from "./components/Pages/View/View";
import Login from "./components/Pages/Login/Login";

//! COMPONENTS

//? 1. Register
//? 2. View      
//? 3. Home
//? 4. Login

function App() {
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const [loader, setLoader] = useState(false);
  const [CN, setCN] = useState();
  const [curAcc, setCuracc] = useState();
  const [web3, setWeb3] = useState();
  const [citId, setcitId] = useState();
  const [citizen, setCitizen] = useState();

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected . You should consider trying metamask!"
      );
    }
    console.log("Inside loadweb3");
  };
  const loadBlockchainData = async () => {
    // get the blockchain data here
    // let us code the smart contract now
    // what to do now let us start with making
    // we have to do the browser location
    setLoader(true);
    const web3 = window.web3;
    setWeb3(web3);
    // console.log("inside loadbc");
    const accounts = await web3.eth.getAccounts();
    // this.state.curAccount= accounts[0];
    setCuracc(accounts[0]);
    const networkId = await web3.eth.net.getId();

    const networkData = ComplainNetworkJson.networks[networkId];
    if (networkData) {
      const ComplainNetwork = new web3.eth.Contract(
        ComplainNetworkJson.abi,
        networkData.address
      );
      setCN(ComplainNetwork);
      // pass this CN
      // and access the methods and variable using CN.methods().methodName().call();
      // console.log(CN);
    } else {
      window.alert("ComplainNetwork Not Deployed to the net");
    }
    setLoader(false);
    console.log("inside load bc after false");
  };

  // console.log(citId);
  // console.log(citizen);


  // pass the CN to various components and get what we need and then the
  // Check if etherium walleti s preset 
  if (!window.ethereum) {
    return (
      <div>
        <p>No Ethereum Wallet Found</p>
      </div>
    );
  }
  // loader
  if (loader) {
    return <div>LOADING.....</div>;
  }
  // JSX
  return (
    <div>
      <Router>
        <Route
          exact
          path={"/"}
          render={(props) => (
            <Login
              cjson={CN}
              curAccount={curAcc}
              setcitId={setcitId}
              setCitizen={setCitizen}
            />
          )}
        />
        <Route
          exact
          path={"/Home"}
          render={(props) => (
            <Home cjson={CN} curAccount={curAcc} citizen={citizen} />
          )}
        />
        <Route
          exact
          path={"/register"}
          render={(props) => (
            <Register cjson={CN} curAccount={curAcc} citizen={citizen} />
          )}
        />
        <Route
          exact
          path={"/view"}
          render={(props) => (
            <View
              cjson={CN}
              curAccount={curAcc}
              web3={web3}
              citizen={citizen}
            />
          )}
        />
      </Router>
    </div>
  );
}

export default App;
