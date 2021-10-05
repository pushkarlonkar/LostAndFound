import React, { useState, useEffect, useReducer } from "react";
import M from "materialize-css";
import "./View.css";
import { Redirect } from "react-router-dom";
import Web3 from "web3";
import { ethers } from "ethers";
const View = ({ cjson, curAccount, web3, citizen }) => {
  // get the complains and display them then look for the action
  // we need to get the total number of complains
  // we need to get the status it is in the complain
  // so we do not need the police access
  // we want to propose the solution to the customer and if he is satisfied then then he can resolve and transfer funds
  // we need to make some changes in the smartcontract first
  // finish it up today
  // so let us start with what we want to be the features of this app
  // first register done
  // we need you are not authorised for making the changes necessary
  // so what are different status     Pending Proposed and Resolved are the 3 states
  // remove the police
  // what are the button required
  // 1. funding 2.Proposed Solution 3. Accept the proposal 4. decline the request
  // let us start with funding we need to just increase the reward by the value
  // so we need to start with making the resolve work
  // resolve should only be accessed by the owner of the complaint
  // and then the transfer would take place from the owner to the contributors
  // So what are the extra things we need to do
  // 1. Clean up the project
  // 2. Handle the errors
  // ? Cards
  // 3. Improve the UI
  // 4. Propose Solution and get
  // Let us start handling the errors
  // handling the errors  let us get started with it
  // if curAccount != complainUser Account then dont show the accept and reject buttons
  // done with it now let us start with making the values
  // now we need to make some changes in register first
  // how to update without reloading just reload the state in react
  // which state we need ot
  // so where to start with
  // let us make it right and do the necessary things
  // toasts are working but some things need refreshing
  // let us start with error handling
  // we need to detect the error before opening the contract and transaction and display the error
  // so that the user will know about it
  // so what are the things left to do
  // let us start with some designing so what to add in the back
  // so we need to start with making the location to be equal to th
  // so how to solve the location problem it is not getting the current

  useEffect(() => {
    // getLocation();
    getComplains();
  }, []);
  const [complains, setComplains] = useState([]);
  const [complainCount, setComplainCount] = useState();
  const [loader, setLoader] = useState(false);
  const [fundSt, setFundSt] = useState();
  const [fundId, setFundId] = useState();
  const [fund, setFund] = useState();
  const [propId, setPropId] = useState();
  const [propSt, setPropSt] = useState();
  const [solution, setSolution] = useState();
  const [status, setStatus] = useState();
  const [solnarray, setsolnarray] = useState([]);
  const [curFile, setcurFile] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  const getComplains = async () => {
    setLoader(true);
    setLoggedIn(true);
    // getLocation();
    // getlocation is not setting the get the location in home then pass it down to here
    // get the complains here
    // first get the complain count
    // that is the total number of complaints and then iterate over them and then
    // display them on the table
    // got the counter
    // work on status and action today so let us start
    // show complains in my area only
    // start with transfering the funds how to transfer the funds
    // send it from
    // load everything in the array just show the one where condtion is satisfied

    var lat, long;
    navigator.geolocation.getCurrentPosition(function (position) {
      lat = position.coords.latitude * 1e12;
      long = position.coords.longitude * 1e12;
    });
    console.log("Inside cjson");
    if (cjson) {
      console.log("Inside ");
      const c = await cjson.methods.complainCounter().call();
      setComplainCount(c);
      // set the
      // the problem is the complains are not getting set
      // make the complains
      for (var i = 0; i < c; i++) {
        const comp = await cjson.methods.viewComplain(i).call();
        const sol = await cjson.methods.viewSolution(i).call();
        console.log(comp);
        // console.log(comp[].substr(0,3));
        console.log(lat);
        if (
          comp[2].substr(0, 2) === long.toString().substr(0, 2) &&
          comp[3].substr(0, 2) === lat.toString().substr(0, 2)
        ) {
          // add it to the array
          setComplains((complains) => [...complains, comp]);
          setsolnarray((solnarray) => [...solnarray, sol]);
        } else {
          setComplains((complains) => [...complains, "null"]);
        }
      }
    }
    console.log(cjson);
    if (complains.length != 0) {
      console.log(complains);
    }
    setLoader(false);
  };
  // what to do now let us start with resolving the complain function
  const handleFundComplain = (e, file) => {
    e.preventDefault();
    setFundSt(true);
    setFundId(file[0]);
    setcurFile(file);
  };
  const addFunds = (e) => {
    e.preventDefault();
    const weifund = Web3.utils.toWei(fund, "ether");
    if (curFile[6] == 2) {
      M.toast({
        html: "Complain Already Resolved",
        classes: " red accent-4 darken-1 white-text",
      });
    } else {
      web3.eth.sendTransaction(
        { from: curAccount, to: curFile[4], value: weifund },
        function (err, transactionHash) {
          if (err) {
            console.log(err);
            M.toast({
              html: "Error in Transaction",
              classes: " red accent-4 darken-1 white-text",
            });
          } else {
            // call the contract function
            cjson.methods
              .fundComplain(fundId)
              .send({ from: curAccount, value: fund })
              .then(() => {
                setFund(null);
                setFundSt(null);
                setFundId(null);
                M.toast({
                  html: "Funds Transferred Successfully",
                  classes: " green accent-4 darken-1 white-text",
                });
                window.location.reload();
              })
              .catch((err) => {
                console.log("ERROR IN FUNDING");
                console.log(err);
              });
          }
        }
      );
    }
  };
  const addSolution = (e, tid) => {
    // console.log(tid);
    // console.log(solution);
    e.preventDefault();
    if (curFile[6] == 2) {
      M.toast({
        html: "Complain Already Resolved",
        classes: " red accent-4 darken-1 white-text",
      });
    } else {
      cjson.methods
        .claimSolution(tid, solution)
        .send({ from: curAccount })
        .then(() => {
          setPropId(null);
          M.toast({
            html: "Solution Proposed",
            classes: " green accent-4 darken-1 white-text",
          });
          window.location.reload();
        })
        .catch((err) => {
          console.log("ERROR IN PROPOSED" + err);
        });
    }
  };
  const handleProposeSolution = (e, file) => {
    // handle the propose solution
    e.preventDefault();
    // so what to do with the proposed solution
    setPropSt(true);
    setPropId(file[0]);
    setcurFile(file);
  };
  const handleAcceptSolution = (e, file) => {
    e.preventDefault();
    // what is there in accept solution
    // console.log(tid);
    const tid = file[0];
    console.log("Handle inside Accept solution");
    // get the reward and transfer it from here value :
    // we need to get the reciever here
    // transfer is not working so what to do make
    // get the reward and then the complain solver
    const promise = cjson.methods.getComplainSolver(tid).call();

    promise.then((result) => {
      // so what can we do to get the rewards start with making
      const rew = file[1];
      const weival = Web3.utils.toWei(rew, "ether");
      web3.eth.sendTransaction(
        { from: curAccount, to: result, value: weival },
        function (err, transactionHash) {
          if (err) {
            console.log(err);
            M.toast({
              html: "Error in Transaction",
              classes: " red accent-4 darken-1 white-text",
            });
          } else {
            console.log("TRANSACTION HASH " + transactionHash);
            cjson.methods
              .resolve(tid)
              .send({ from: curAccount })
              .then(() => {
                console.log("FUNCTION RESOLVED AND FUND TRANSFERRED");
                M.toast({
                  html: "Complain Resolved Successfully",
                  classes: " green accent-4 darken-1 white-text",
                });
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
                M.toast({
                  html: "Error in Transaction",
                  classes: " red accent-4 darken-1 white-text",
                });
                console.log("ERROR IN RESOLVED");
              });
          }
        }
      );
    });

    // we have sent the complain to the
  };
  const handleDeclineSolution = (e, tid) => {
    e.preventDefault();
    cjson.methods
      .declineProposal(tid)
      .send({ from: curAccount })
      .then(() => {
        console.log("FUNCTION DECLINED");
        M.toast({
          html: "Proposed Solution Declined",
          classes: " red accent-4 white-text",
        });

        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        console.log("ERROR IN DECLINE PROPOSAL");
      });
  };
  const SolutionInput = (cid) => {
    if (propSt && cid == propId) {
      return (
        <div className="row input-field ">
          <div className="col s9 ">
            <input
              type="text"
              placeholder="Propose a Solution"
              id="fund"
              onChange={(e) => {
                setSolution(e.target.value);
              }}
            />
          </div>
          <div className="col s2">
            <a
              href=""
              className="btn-floating waves-effect waves-light cyan accent-3"
              onClick={(e) => {
                addSolution(e, cid);
              }}
            >
              <i className="material-icons">add</i>
            </a>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  };
  const rewardInput = (cid) => {
    if (fundSt && cid == fundId) {
      return (
        <div className="row input-field">
          <div className="col s4 offset-s5 ">
            <input
              type="text"
              placeholder="Enter Amount"
              id="fund"
              onChange={(e) => {
                setFund(e.target.value);
              }}
            />
          </div>
          <div className="col s2">
            <a
              href=""
              className="btn-floating waves-effect waves-light"
              onClick={addFunds}
            >
              <i className="material-icons">add</i>
            </a>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  };
  const renderStatus = (f) => {
    if (f == 0) {
      return (
        <div className="red-text">
          <p style={{ fontSize: "15px", fontWeight: "bold" }}>Pending</p>
        </div>
      );
    } else if (f == 1) {
      return (
        <div className="blue-text">
          <p style={{ fontSize: "15px", fontWeight: "bold" }}>Proposed</p>
        </div>
      );
    } else {
      return (
        <div className="green-text">
          <p style={{ fontSize: "15px", fontWeight: "bold" }}>Resolved</p>
        </div>
      );
    }
  };
  const showMyComplains = () => {};
  const greenRedbtn = (add, file) => {
    // if cur acc is add and status is proposed
    // then add two extra options accept or reject
    // and status is proposed then update this
    // get the value of the
    if (curAccount == add && file[6] == 1) {
      return (
        <div>
          <div className="col s6 m6 l2 offset-l1">
            <a
              href=""
              className="btn-small btna green lighten-1"
              onClick={(e) => {
                handleAcceptSolution(e, file);
              }}
            >
              <i className="material-icons">done</i>
            </a>
          </div>
          <div className="col s6 m6 l2 offset-l1">
            <a
              href=""
              className="btn-small btna red darken-1"
              onClick={(e) => {
                handleDeclineSolution(e, file[0]);
              }}
            >
              <i className="material-icons">delete</i>
            </a>
          </div>
        </div>
      );
    }
  };
  
  // const descHand= (S)=>{
  //   console.log("Inside descHand");
  //   const arr = S.split(' ');
  //   // got the array now 
  //   console.log(S);
  //   console.log(arr);
  //   var s = "";
  //   for(var i = 0;i<arr.length;i++){
  //     if(i%4==0){
  //       s.concat("\n");
  //     }
  //     s.concat(arr[i]+" ");
  //   }
  //   console.log(s);
  //   return(
  //   <div>
  //     {s}
  //   </div>
  //   )
  // }
  const descHan= (text) =>{
    console.log(text);
    const newText = text.split('\n').map(str => <p>{str}</p>)
    return newText;
  }

  if (loader) {
    return <div>Loading....</div>;
  }

  return (
    <div className="main">
      <div className="c">
        <div className="section center teal darken-3 white-text">
          <h3>COMPLAINTS</h3>
        </div>
        <div className="divider"></div>
        <div className="section">
          <table className=" responsive-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>LOCATION</th>
                <th>DESCRIPTION</th>
                <th>STATUS</th>
                <th>
                  REWARD <span class="iconify" data-icon="mdi:ethereum"></span>
                </th>
                <th>PROPOSED SOLUTION</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {complains.map((file, key) => {
                const arr = file[5].split("!");
                console.log(file);
                if (file[4] == curAccount) {
                  return (
                    <tr key={key} className="blue lighten-5">
                      <td>{parseInt(file[0]) + 1}</td>
                      <td>{arr[0]}</td>
                      <td>{arr[1]}</td>
                      <td>{descHan(arr[2])}</td>
                      <td>{renderStatus(file[6])}</td>
                      <td>{file[1]} ether</td>
                      <td>{solnarray[file[0]]}</td>
                      <td>
                        <div className="row">
                          <div className="col s6 m6 l2 btn-div">
                            <a
                              href=""
                              className="btn-small btna "
                              onClick={(e) => {
                                handleFundComplain(e, file);
                              }}
                            >
                              <i className="material-icons">paid</i>
                            </a>
                          </div>
                          <div className="col s6 m6 l2 offset-l1 btn-div">
                            <a
                              href=""
                              className="btn-small btna blue lighten-2"
                              onClick={(e) => {
                                handleProposeSolution(e, file);
                              }}
                            >
                              <i className="material-icons">send</i>
                            </a>
                          </div>
                          {greenRedbtn(file[4], file)}
                        </div>
                        {rewardInput(file[0])}
                        {SolutionInput(file[0])}
                      </td>
                    </tr>
                  );
                } else {
                  return (
                    <tr key={key}>
                      <td>{parseInt(file[0]) + 1}</td>
                      <td>{arr[0]}</td>
                      <td>{arr[1]}</td>
                      <td>{descHan(arr[2])}</td>
                      <td>{renderStatus(file[6])}</td>
                      <td>{file[1]} ether</td>
                      <td>{solnarray[file[0]]}</td>
                      <td>
                        <div className="row">
                          <div className="col s6 m6 l2 btn-div">
                            <a
                              href=""
                              className="btn-small btna "
                              onClick={(e) => {
                                handleFundComplain(e, file);
                              }}
                            >
                              <i className="material-icons">paid</i>
                            </a>
                          </div>
                          <div className="col s6 m6 l2 offset-l1 btn-div">
                            <a
                              href=""
                              className="btn-small btna blue lighten-2"
                              onClick={(e) => {
                                handleProposeSolution(e, file);
                              }}
                            >
                              <i className="material-icons">send</i>
                            </a>
                          </div>
                          {greenRedbtn(file[4], file)}
                        </div>
                        {rewardInput(file[0])}
                        {SolutionInput(file[0])}
                      </td>
                    </tr>
                  );
                }
              })}
              <tr></tr>
            </tbody>
          </table>
        </div>
        {/* <div className="divider"></div> */}
        <div className="section">
          <div className="row">
            <div className="col s12 l6">
              <div className="row">
                <div className="col s12">
                  <div href="" className="btn btna waves-effect waves-light">
                    <i className="material-icons">paid</i>
                  </div>
                  <span>Fund a Complain</span>
                </div>
                <div className="col s12">
                  <div
                    href=""
                    className="btn btna blue waves-effect waves-light"
                  >
                    <i className="material-icons">send</i>
                  </div>
                  <span>Report A Solution</span>
                </div>
                <div className="col s12">
                  <div
                    href=""
                    className="btn btna green waves-effect waves-light"
                  >
                    <i className="material-icons">done</i>
                  </div>
                  <span>Resolve</span>
                </div>
                <div className="col s12">
                  <div
                    href=""
                    className="btn btna red waves-effect waves-light"
                  >
                    <i className="material-icons">delete</i>
                  </div>
                  <span>Decline</span>
                </div>
              </div>
            </div>
            <div className="col s12 l6 hide-on-small-only">
              <p style={{ fontSize: "18px" }}>CurentUser : {curAccount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
