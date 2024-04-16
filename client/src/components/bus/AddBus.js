import React, { useEffect, useState } from "react";
import "./bus.css";
import "./addbus.css";
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";
import uploadIcon from "../../images/upload.png";
import UploadWidget from "../upload-widget/UploadWidget";
import axios from "axios";

const testBus = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iwd3GKCS-siIfaTxopKv-wHaE9%26pid%3DApi&f=1&ipt=1a4d7a1db3474d3d54de39932b55b8ce55992530cc808adcd272e2fe28667fad&ipo=images";


const AddBus = ()=>{
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);

    useEffect(()=>{
        const verifyCookie = async ()=>{
            if(!cookies.token || cookies.token==='undefined'){
                navigate("/login");
            }
            const data = await axios.get("http://localhost:3001/api/profile",{withCredentials:true});
            console.log(data);
            if(data.data.status!==200){
                removeCookie("token");
                navigate("/login")
            }
            setUser({
                name: data?.data?.user.name,
                email: data?.data?.user.email,
                mobile: data?.data?.user.mobile
            });

            if(data.data.user.email !=="harshitbamotra.01@gmail.com"){
                alert("Unauthorized");
                navigate("/");
            }
        }
        verifyCookie();
    },[cookies, navigate, removeCookie]);



    const [url, setUrl] = useState("");

    const [name, setName] = useState("");
    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");
    const [departure, setDeparture] = useState("");
    const [arrival, setArrival] = useState("");
    const [seats, setSeats] = useState("");
    const [price, setPrice] = useState("");

    const handleName = (e)=>{
        setName(e.target.value);
    }
    const handleSource = (e)=>{
        setSource(e.target.value);
    }
    const handleDestination = (e)=>{
        setDestination(e.target.value);
    }
    const handleArrival = (e)=>{
        setArrival(e.target.value);
    }
    const handleDeparture = (e)=>{
        setDeparture(e.target.value);
    }
    const handlePrice = (e)=>{
        setPrice(e.target.value);
    }
    const handleSeats = (e)=>{
        setSeats(e.target.value);
    }
    
    const handleSubmit = async ()=>{
        if(!name || !url || !source || !destination || !arrival || !departure || !price || !seats){
            alert("All fields are necessary");
            return;
        }

        const submitObject = {
            name,
            source: source.toLowerCase(),
            destination: destination.toLowerCase(),
            price,
            seats,
            startTime: departure,
            endTime: arrival,
            displayImage: url.toString()
        }

        try {
            const data = await axios.post("http://localhost:3001/api/bus", submitObject);
            console.log(data);
            navigate("/");
        } catch (error) {
            
        }

    }

    return(
        <div className="addbus">
            <div className="bus-container">
                <div className="bus-modal-image">
                    {/* <img src={testBus} alt=""></img> */}
                    {url === "" ? 
                            <UploadWidget setUrl={setUrl}></UploadWidget> : <img src={url} alt=""></img>
                    }
                </div>
                <div className="bus-modal-content">
                    
                    <div className="bus-modal-name">
                        <div className="bus-modal-content-left">
                            Name: 
                        </div>
                        <div className="bus-modal-content-right">
                            <input onChange={handleName}></input>
                        </div>
                    </div>
                    <div className="bus-modal-src">
                        <div className="bus-modal-content-left">
                            Source:
                        </div>
                        <div className="bus-modal-content-right">
                            <input onChange={handleSource}></input>
                        </div>
                    </div>
                    <div className="bus-modal-departure">
                        <div className="bus-modal-content-left">
                            Departure Time:
                        </div>
                        <div className="bus-modal-content-right">
                            <input onChange={handleDeparture}></input>
                        </div>
                    </div>
                    <div className="bus-modal-dest">
                        <div className="bus-modal-content-left">
                            Destination: 
                        </div>
                        <div className="bus-modal-content-right">
                            <input onChange={handleDestination}></input>
                        </div>
                    </div>
                    <div className="bus-modal-arrival">
                        <div className="bus-modal-content-left">
                            Arrival Time: 
                        </div>
                        <div className="bus-modal-content-right">
                            <input onChange={handleArrival}></input>
                        </div>
                    </div>
                    <div className="bus-modal-seats">
                        <div className="bus-modal-content-left">
                            Available Seats: 
                        </div>
                        <div className="bus-modal-content-right">
                            <input onChange={handleSeats}></input>
                        </div>
                    </div>
                    <div className="bus-modal-price">
                        <div className="bus-modal-content-left">
                            Price: 
                        </div>
                        <div className="bus-modal-content-right">
                            <input onChange={handlePrice}></input>
                        </div>
                    </div>
                    <div className="add-ticket">
                        <div>
                            <button onClick={handleSubmit}> List Bus</button>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddBus;