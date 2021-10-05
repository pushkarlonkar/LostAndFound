import React, { useEffect, useState } from "react";
import M from "materialize-css";
import "./Login.css";
import img from "../../Content/121.svg";
import { useHistory } from "react-router-dom";

const Login = ({ cjson, curAccount, setcitId, setCitizen }) => {
  // she is good at talking
  // get the value
  //  make the login uthentication page over here
  //  we need cjson then we need the
  /* Steps for Login 
        1. Make the frontend
        2. Changes in Smartcontract
            i. Add citizen construct to store 
                Username password msg.sender name email phone number 
                Store all these details in the struct 
                write a funtion to add to register 
                for login we need to just check 2 things  1. is it present 
                                                          2. Is the password right 
                                                          done with it 
        3. Integrate with the frontend 
            login for view and check 
            register call register and add the details to the mapping 
            we are gonna get the cid of a particular citizen through which we can navigate   
            register the value with making                 
            just a little weed with a little bit o cash with a little bit of this with a little bit of that
        now we need to add the user to the blockchain so let us start with that
    */
  // let us start with login and details so what is the value
  // start with it now  let us begin
  // so what are the changes needed
  // getting the location +-100 then it will display
  // change the name to lost and
  const history = useHistory();
  useEffect(() => {
    const options = {
      swipeable: true,
    };
    // initialize the tabs class
    // now we need to get the me
    // M.Tabs.init(Login);
    let el = document.querySelectorAll(".tabs");
    M.Tabs.init(el, options);
  }, []);

  const [username, setUsername] = useState();
  const [lpassword, setLpassword] = useState();
  const [matched, setMatched] = useState();
  const [name, setName] = useState();
  const [email, setemail] = useState();
  const [rpassword01, setRpassword01] = useState();
  const [rpassword02, setRpassword02] = useState();

  // set up  the  registration details
  // we need to pass this cid to so let us define it in App.js

  const handleLogin = async (e) => {
    // called when login button clicked
    // get the  CN function
    // pass in the parameters
    console.log("Inside Login");
    e.preventDefault();
    if (username && lpassword) {
      const id = await cjson.methods.LoginCitizen(username, lpassword).call();
      console.log(id);
      if (id > 0) {
        setcitId(id);
        const us = await cjson.methods.viewCitizen(id).call();
        setCitizen(us);
        // console.log(us);
        setMatched(true);
      } else {
        setMatched(false);
      }
    }
    // if the matched is true move to next page
    // else give an error message saying that username or password is incorrect
    // call linking function
  };

  const renderError = (e) => {
    console.log("inside render error");
    if (matched == false) {
      return (
        <div className="red-text">
          <p>Incorrect Email/Password</p>
        </div>
      );
    } else if (matched == true) {
      // then route to the home page
      // get the address and the account
      // route to the home page how to do that
      history.push("/home");
    } else {
      return <div></div>;
    }
  };
  const handleRegistration = (e) => {
    e.preventDefault();
    console.log("inside register handle");
    console.log(name);
    console.log(email);
    console.log(rpassword01);

    if (rpassword01 === rpassword02) {
      // get the values
      // none of them should be empty
      cjson.methods
        .registerCitizen(name, email, rpassword01, 0)
        .send({ from: curAccount })
        .on("transactionHash", (hash) => {
          // do this after the transaction
          // set all to null
          setLpassword(null);
          setMatched(null);
          setName(null);
          setRpassword01(null);
          setRpassword02(null);
          setUsername(null);
        })
        .catch((err) => {
          console.log("Error: Message: " + err.message);
        });
    }
  };
  return (
    <div className="main">
      <div className="row">
        <div className="col s12 m7 maindiv teal darken-2">
          <div className="title center">
            <h2>LOST AND FOUND</h2>
          </div>
          <div className="subtitle center">
            <h5>DECENTRALIZED/CROWD FUNDED</h5>
          </div>
          <div className="section vect">
            <img className="img1" src={img} />
          </div>
        </div>
        <div className="col s12 m5 formdiv ">
          <div className="row">
            <div className="col s12 m2 l3 "></div>
            <div className="col s10 offset-s1 m8 l6 center-align">
              <div className="row">
                <ul id="tabs-swipe-demo" className="tabs transparent">
                  <li className="tab col s6">
                    <a className="active black-text" href="#test-swipe-1">
                      LOGIN
                    </a>
                  </li>
                  <li className="tab col s6">
                    <a className="black-text" href="#test-swipe-2">
                      REGISTER
                    </a>
                  </li>
                </ul>
                <div id="test-swipe-1" className="col s12 ">
                  <div className="section">
                    <div className="row">
                      <div className="col s12 input-field">
                        <input
                          type="email"
                          id="email1"
                          className="validate"
                          onChange={(e) => {
                            setUsername(e.target.value);
                          }}
                          required
                        />
                        <label htmlFor="email1">Email</label>
                      </div>

                      <div className="col s12 input-field">
                        <input
                          type="password"
                          className="validate"
                          id="password"
                          onChange={(e) => {
                            setLpassword(e.target.value);
                          }}
                          required
                        />
                        <label htmlFor="password">Password</label>
                      </div>
                      <div className="col s12 left-align">
                        <form action="">
                          <label>
                            <input type="checkbox" id="cb" />
                            <span htmlFor="cb">Keep Me Logged in</span>
                          </label>
                        </form>
                      </div>

                      <div className="col s12 btnm">
                        <a
                          href=""
                          onClick={handleLogin}
                          className="btn-large"
                          style={{ width: "100%" }}
                        >
                          LOGIN
                        </a>
                      </div>
                      <div className="col s12">
                        <a href="">Forgot Password?</a>
                      </div>
                      <div className="col s12">{renderError()}</div>
                    </div>
                  </div>
                </div>
                <div id="test-swipe-2" className="col s12 ">
                  {/* get the value of */}
                  <div className="row">
                    <div className="col s12 input-field">
                      <input
                        type="text"
                        id="name"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="col s12 input-field">
                      <input
                        type="email"
                        id="email2"
                        className="validate"
                        onChange={(e) => {
                          setemail(e.target.value);
                        }}
                        required
                      />
                      <label htmlFor="email2">Email</label>
                    </div>
                    <div className="col s12 input-field">
                      <input
                        type="password"
                        className="validate"
                        id="password01"
                        onChange={(e) => {
                          setRpassword01(e.target.value);
                        }}
                        required
                      />
                      <label htmlFor="password01">Password</label>
                    </div>
                    <div className="col s12 input-field">
                      <input
                        type="password"
                        className="validate"
                        id="password02"
                        onChange={(e) => {
                          setRpassword02(e.target.value);
                        }}
                        required
                      />
                      <label htmlFor="password02">Re-enter Password</label>
                    </div>
                    <div className="col s12 ">
                      <a
                        href=""
                        className="btn-large"
                        style={{ width: "100%" }}
                        onClick={handleRegistration}
                      >
                        REGISTER
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col s12 m2 l3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
