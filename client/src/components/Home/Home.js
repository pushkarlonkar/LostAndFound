import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link, Redirect } from "react-router-dom";
import "./Home.scss";
const Home = ({ cjson, citizen, curAccount }) => {
  // so how to start with details
  // let us start with making the final changes in the project
  // let us get started with it
  // we have got the citId
  // it is almost done
  // just some minor changes are remaining and then the documentation
  console.log(citizen);
  if(!citizen){
    return(
        <Redirect to= "/"/>
    )
  }
  return (
    <div className="Home">
      <div className="row">
        <div className="col s11 m7 ">
          <div className="hello col s12 hide-on-small-only ">HELLO</div>
          <div className="name col s12 hide-on-small-only  grey-text text-darken-4">
            {citizen[0]}
          </div>
          <div className="he col s12 hide-on-med-and-up ">HELLO</div>
          <div className="nm col s12 hide-on-med-and-up grey-text text-darken-4">Pushkar</div>
          <div className="col s12 btns">
            <div className="row">
              <div className="col m4 s12">
                <Link to="./register">
                  <a
                    href=""
                    className="btn-large waves-effect waves-light green accent-3 btna"
                    style={{ width: "100%" }}
                  >
                    REGISTER
                  </a>
                </Link>
              </div>
              <div className="col m4 s12">
                <Link to="./view">
                  <a
                    href=""
                    className="btn-large waves-effect waves-light  cyan accent-4 btna"
                    style={{ width: "100%" }}
                  >
                    SOLVE
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="col s12 addr hide-on-small-only">
            <p className="flow-text">{curAccount}</p>
          </div>
        </div>


        <div className="col s12 m5 plain hide-on-small-only">
          {/* we need a fuckin design here */}
          <div class="seaContainer">
            <div class="submarine__container">
              <div class="light"></div>
              <div class="submarine__periscope"></div>
              <div class="submarine__periscope-glass"></div>
              <div class="submarine__sail">
                <div class="submarine__sail-shadow dark1"></div>
                <div class="submarine__sail-shadow light1"></div>
                <div class="submarine__sail-shadow dark2"></div>
              </div>
              <div class="submarine__body">
                <div class="submarine__window one"></div>
                <div class="submarine__window two"></div>
                <div class="submarine__shadow-dark"></div>
                <div class="submarine__shadow-light"></div>
                <div class="submarine__shadow-arcLight"></div>
              </div>
              <div class="submarine__propeller">
                <div class="propeller__perspective">
                  <div class="submarine__propeller-parts darkOne"></div>
                  <div class="submarine__propeller-parts lightOne"></div>
                </div>
              </div>
            </div>
            <div class="bubbles__container">
              <span class="bubbles bubble-1"></span>
              <span class="bubbles bubble-2"></span>
              <span class="bubbles bubble-3"></span>
              <span class="bubbles bubble-4"></span>
            </div>
            <div class="ground__container">
              <div class="ground ground1">
                <span class="up-1"></span>
                <span class="up-2"></span>
                <span class="up-3"></span>
                <span class="up-4"></span>
                <span class="up-5"></span>
                <span class="up-6"></span>
                <span class="up-7"></span>
                <span class="up-8"></span>
                <span class="up-9"></span>
                <span class="up-10"></span>
              </div>
              <div class="ground ground2">
                <span class="up-1"></span>
                <span class="up-2"></span>
                <span class="up-3"></span>
                <span class="up-4"></span>
                <span class="up-5"></span>
                <span class="up-6"></span>
                <span class="up-7"></span>
                <span class="up-8"></span>
                <span class="up-9"></span>
                <span class="up-10"></span>
                <span class="up-11"></span>
                <span class="up-12"></span>
                <span class="up-13"></span>
                <span class="up-14"></span>
                <span class="up-15"></span>
                <span class="up-16"></span>
                <span class="up-17"></span>
                <span class="up-18"></span>
                <span class="up-19"></span>
                <span class="up-20"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
