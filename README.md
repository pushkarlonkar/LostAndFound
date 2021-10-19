# LOST AND FOUND
 Lost and Found is a decentralized system for lodging civil complaints onto a network that uses blockchain to engage citizens in that area 
 

 
 


## Description
In case a citizen looses something of value to him ,he can create an account onto the website .

Once registered a secure transaction would be initiated which will register the user to the network . 

Now he can login to the network with the help of his email Id and password specified during creation of the account .

![Login](https://github.com/Pushkarlonkar/LostAndFound/blob/master/readme/Login.png)


Once Logged in the user would be directed to the home page displaying two options register and solve .

![Home](https://github.com/Pushkarlonkar/LostAndFound/blob/master/readme/Home.png)

He can click on the register button where he can register the complaint specifying his details, description of the lost object ,the reward (ETHER) and time of the incident .

![Register01](https://github.com/Pushkarlonkar/LostAndFound/blob/master/readme/Register01.png)

Once registered the complain will be added to the blockchain along with the geographic coordinates of the user. No one other than the user can make any changes to the complaint now !!.


![Register02](https://github.com/Pushkarlonkar/LostAndFound/blob/master/readme/Register02.png)

Once a complain is registered it would be visible to all other users present in that area .

A complain goes through 3 stages 
* Pending 
* Proposed 
* Resolved

![view01](https://github.com/Pushkarlonkar/LostAndFound/blob/master/readme/view01.png)

Other users have two choices 

![options01](https://github.com/Pushkarlonkar/LostAndFound/blob/master/readme/options01.png)

**Fund Complain**

Other Users if they feel can fund  and increase the reward for the solver of the comlaint
A crowd sourcing thing 

A Transaction would get initiated from account of the doner to that of the complain owner

![Funding](https://github.com/Pushkarlonkar/LostAndFound/blob/master/readme/Funding.png)
![fund](https://github.com/Pushkarlonkar/LostAndFound/blob/master/readme/fund.png)

**Propose a Soultion**

Someone who knows whereabouts of the lost  object can propose a solution . The status of the complain will change from **PENDING** to **PROPOSED**

 if the solution is accepted by the complaint owner then a transaction with value of reward will take place from account of the complaint owner to the user who suggested the solution
 
The status of the complain will change from **PROPOSED** to **RESOLVED** 

Else if the complain owner is not satisfied with the suggestion then he can decline the request and the status will change back to **PENDING** 


![propose](https://github.com/Pushkarlonkar/LostAndFound/blob/master/readme/propose.png)

![resolve](https://github.com/Pushkarlonkar/LostAndFound/blob/master/readme/resolve.png)


![accept](https://github.com/Pushkarlonkar/LostAndFound/blob/master/readme/accept.png)


## Built With 
  * [React.js](https://reactjs.org/)
  * [Solidity](https://soliditylang.org/)
  * [web3.js](https://web3js.readthedocs.io/en/v1.5.2/)
  * [Materialize](https://materializecss.com/)
  * [Javascript](https://www.javascript.com/)
  
## Getting Started

### Installing

* Install truffle 
 ```
npm install truffle -g
```
* clone the repository 
 ```
git clone https://github.com/Pushkarlonkar/LostAndFound.git
```
* Install necessary dependencies
 ```
npm install
```
### Executing program

#### In Parent Folder
* Compile Contracts
```
truffle compile
```
* Migrate the Contract to the  blockchain
```
truffle migrate 
truffle migrate --reset
```
#### In Client Folder
* start react app  
```
cd client
npm start
```

## Help

Any advise for common problems or issues.
```
command to run if program contains helper info
```
