import React, { useEffect, useState } from "react";
import "./profile.css"
import {useCookies} from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import busListIcon from "../../images/bus-menu-bus.png";
import rightArrow from "../../images/right-chevron.png";

const BusItem = (props) => {
    return (
        <div className="bus-item  white-background">
            <div className="bus-item-image">
                <img src={busListIcon} alt=""></img>
            </div>
            <div className="bus-item-content">
                <div className="bus-item-name">
                    {props.name}
                </div>
                <div className="bus-item-src-dest">
                    <div className="flex1">
                        Source: {props.source}
                    </div>
                    <div className="flex2">
                        <img src={rightArrow} alt=""></img>
                    </div>
                    <div className="flex1">
                        Destination: {props.destinatuon}
                    </div>
                </div>
                <div className="bus-item-time">
                    <div className="flex1">Departure: {props.startTime}</div>
                    <div className="flex2">
                        <img src={rightArrow} alt=""></img>
                    </div>
                    <div className="flex1">Arrival: {props.endTime}</div>
                </div>
                <div className="bus-item-price">
                    Price: <span>{props.price}</span>
                </div>
            </div>
        </div>
    )
}




const Profile = ()=>{

    
    const [user, setUser] = useState({});
    const [rides, setRides] = useState([]);
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
                return;
            }
            setUser({
                name: data.data.user.name,
                email: data.data.user.email,
                mobile: data.data.user.mobile
            })
            setRides(data.data.RidesTaken);
        }
        verifyCookie();
    },[cookies, navigate, removeCookie]);

    return (
        <div className="profile-main">
            <div className="profile-container">
                <div className="main-profile-heading">MY PROFILE</div>
                <div className="profile-wrapper">
                    <div className="personal-info">
                        <div className="personal-info-title">Personal Information</div>
                        <div className="personal-info-heading">Your Name</div>
                        <div className="personal-info-content">{user?.name}</div>
                    </div>
                    <div className="contact-info">
                        <div className="contact-info-title">Contact Information</div>
                        <div className="contact-info-container">
                            <div>
                                <div className="contact-info-heading">Email</div>
                                <div className="contact-info-content">{user?.email}</div>
                            </div>
                            <div>
                                <div className="contact-info-heading">Phone</div>
                                <div className="contact-info-content">+91 {user?.mobile}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pastRides-container">
                <div className="main-pastRides-heading">PREVIOUS BOOKINGS</div>
                <div className="past-rides-list">
                    {rides?.map((ride)=><BusItem key={ride?._id} name={ride?.name} source={ride?.source} destination={ride?.destination} price={ride?.price} startTime={ride?.startTime} endTime={ride?.endTime}></BusItem>)}
                    {/* <BusItem></BusItem>
                    <BusItem></BusItem>
                    <BusItem></BusItem>
                    <BusItem></BusItem> */}
                </div>
            </div>
        </div>
    )
}

export default Profile;