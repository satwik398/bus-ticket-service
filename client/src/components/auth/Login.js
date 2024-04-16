import React, {useState} from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = ()=>{

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleOnChangeEmail = (e)=>{
        setEmail(e.target.value);
    }
    const handleOnChangePassword = (e)=>{
        setPassword(e.target.value);
    }

    async function handleSubmit(){
        if(!email || !password){
            alert("All fields are necessary");
            return;
        }

        const submitObject = {
            email,
            password,
        }

        try {
            const data = await axios.post("http://localhost:3001/api/auth/login", submitObject, {withCredentials: true});
            console.log(data);

            if(data.data.status !== 200){
                alert(data.data.msg);
                return;
            }
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleTransfer = ()=>{
        navigate("/register");
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
                    <div className="login-submit-button" onClick={handleSubmit}>sign up/ sign in</div>
                    <div className="transfer">
                        Dont have an account? <span onClick={handleTransfer}>Register</span>
                    </div>
                </div>
            </div>

            
            <div className="circle yellow"></div>
            <div className="circle pink"></div>
            <div className="circle blue"></div>
        </div>
    )
}

export default Login;