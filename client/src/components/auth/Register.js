import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./login.css";
const Register = ()=>{
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [mobile, setMobile] = useState("");

    const handleOnChangeEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handleOnChangePassword = (e)=>{
        setPassword(e.target.value);
    }
    const handleOnChangeMobile = (e)=>{
        setMobile(e.target.value);
    }
    const handleOnChangeName = (e)=>{
        setName(e.target.value);
    }
    

    async function handleSubmit(){
        if(!email || !mobile || !name || !password){
            alert("All fields are necessary");
            return;
        }

        const submitObject = {
            email,
            name,
            password,
            mobile
        }

        try {
            const data = await axios.post("http://localhost:3001/api/auth/register", submitObject, {withCredentials: true});
            console.log(data);
            navigate("/");
            
        } catch (error) {
            console.log(error);
        }
    }

    const handleTransfer = ()=>{
        navigate("/login");
    }



    return (
        <div className="login-main">
            <div className="login-container">
                <div className="login-heading">
                    BUS HIVE
                </div>
                <div className="login-form">
                    <div className="login-input">
                        <div>
                            name
                        </div>
                        <input type="text" onChange={handleOnChangeName}></input>
                    </div>
                    <div className="login-input">
                        <div>
                            phone
                        </div>
                        <input type="text" onChange={handleOnChangeMobile}></input>
                    </div>
                    <div className="login-input">
                        <div>
                            email
                        </div>
                        <input type="email" onChange={handleOnChangeEmail}></input>
                    </div>
                    <div className="login-input">
                        <div>
                            password
                        </div>
                        <input type="password" onChange={handleOnChangePassword}></input>
                    </div>
                    <div className="login-submit-button" onClick={handleSubmit}>sign up</div>
                    <div className="transfer">
                        Already have an account? <span onClick={handleTransfer}>Login</span>
                    </div>
                </div>
            </div>

            
            <div className="circle yellow"></div>
            <div className="circle pink"></div>
            <div className="circle blue"></div>
        </div>
    )
}

export default Register;