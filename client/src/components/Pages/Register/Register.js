import React ,{useState,useEffect} from 'react'
import il from '../../Content/164.svg'
import M from 'materialize-css'
import { Redirect } from 'react-router-dom'
const Register = ({cjson,curAccount,citizen}) => {
    // REGISTER THE COMPLAIN OVER HERE

    useEffect(() => {
        getLocation();
    }, []);
    const[data,setData] = useState();

    
    const[longdata,setLongdata] = useState();
    const[latdata,setLatdata] = useState();
    const[description,setDescription] = useState();
    const[name,setName] = useState();
    const[address,setAddress] = useState();
    const[reward,setReward] = useState();
    const[notify,setNotify] = useState();
    
    function getLocation(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition);
            //console.log(latdata);
            //console.log(longdata);
        }else{
            console.log("Geolocation not supported by the browser");
        }
    }
    const showPosition  = async(position)=>{
        if(position.coords.latitude){

            setLatdata(await parseInt(position.coords.latitude * 1e12));
            setLongdata(await parseInt(position.coords.longitude * 1e12));
        }
    }



    const registertoBC = async(e) =>{
        
        e.preventDefault();
        // set the data
        setData(name + "!"+address+"!"+description);
        // console.log(name + "!"+address+"!"+description);
        
        // data is set now add it to the blockchain 
        const dt = name + "!"+address+"!"+description;
        console.log(dt);
        if(dt ){

            cjson.methods.registerComplain(dt,latdata,longdata,0).send({from : curAccount,value:reward})
            .on('transactionHash',(hash)=>{
                setAddress(null);
                setReward(null);
                setName(null);
                // notify if success
                M.toast({html: 'Complain Registered Successfully',classes :" green accent-4 darken-1 white-text"})
        
            }).catch(function(err) {    
                // Notify if error
                M.toast({html: 'Complain Not Registered',classes :" red accent-4 darken-1 white-text"})

                console.log('Error: Message: ' + err.message);
            });
        }
    }


    // No access unless logged in 
    if(!citizen){
        return(
            <Redirect to= "/"/>
        )
    }

    return (
        <div>
            <div className="row">
                <div className="col   m5 teal darken-1" >
                    <img src={il} style= {{"width":"100%","marginTop":"30%","marginBottom":"25%"}}alt="" />
                </div>
                <div className="col s11 m7">
                <div className="section center">
                    <h3 style= {{}}>REGISTER A COMPLAINT</h3>
                </div>
                <div className="divider"></div>
                <div className="section">
                    <form action="">
                        <div className="row">
                        
                            <div className="col s12 m8 offset-m2 input-field ">
                                {/* NAME */}
                                <i className="large material-icons prefix">account_box</i>
                                <input type="text" placeholder= "NAME" id= "name" onChange = {(e)=>{
                                    setName(e.target.value);
                                }} required= "true"/>
                            </div>
                            <div className="col s12 m8  offset-m2 input-field ">
                                {/* ADDRESS */}
                                <i className="large material-icons prefix">location_city</i>

                                <input type="text" placeholder= "ADDRESS" id= "address" onChange = {(e)=>{
                                    setAddress(e.target.value);
                                }} required/>
                            </div>
                            <div className="col s12 m8  offset-m2 input-field ">
                                {/* REWARD */}
                                <i className="large material-icons prefix"><span class="iconify" data-icon="mdi:ethereum"></span></i>
                                <input type="text" placeholder= "REWARD" id= "reward" onChange ={(e)=>{
                                    setReward(e.target.value);
                                }} required/>
                            </div>
                            <div className="col s12 m8  offset-m2 input-field ">
                                {/* DESCRIPTION */}
                                <i className="large material-icons prefix">description</i>
                                <textarea style= {{width:"93%",
                                height:"150px"}} placeholder= "DESCRIPTION" id= "description" onChange = {(e)=>{
                                setDescription(e.target.value);
                                }} required/>
                            </div>
                            <div className="col s11 offset-s1 m3 offset-m7 right-align">
                                <a href="" className="btn-large waves-effect waves-teal" style= {{width:"100%"}} onClick={registertoBC}>SUBMIT</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Register
