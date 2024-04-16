import React, { useEffect, useState } from "react";
import "./bus-menu.css";

import busListIcon from "../../images/bus-menu-bus.png";
import rightArrow from "../../images/right-chevron.png";
import bus from "../../images/school-bus.png";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from 'react-router-dom'
import axios from "axios";

const BusItem = (props) => {

    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate(`/bus/${props.id}`);
    }


    return (
        <div className="bus-item" onClick={handleClick}>
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
                        Destination: {props.destination}
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




const BusMenu = () => {

    const [busses, setbusses] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{

        const fetchBusses = async ()=>{
            const source = searchParams.get("source");
            const destination = searchParams.get("destination");
            
            const url = `http://localhost:3001/api/bus?source=${source}&destination=${destination}`;
            try {
                const data = await axios.get(url);
                // console.log(data);
                setbusses(data.data);
                console.log(busses);
            } catch (error) {
                console.log(error);
            }
        }
        fetchBusses();

    }, [searchParams]);

    return (
        <div className="bus-menu">
            <div className="bus-header">
                <div>
                    <div className="bus-header-icon">
                        <img src={bus} alt=""></img>
                    </div>
                    <div className="bus-header-input">
                        <div className="bus-tagline">Journey Made Simple, Tickets In A Click</div>

                        <div className="bus-input-container">
                            <div>
                                <input placeholder="From"></input>
                            </div>
                            <div>
                                <input placeholder="To"></input>
                            </div>
                            <div>
                                <button>search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bus-list">
                {busses?.map((bus)=><BusItem key={bus._id} id={bus._id} name={bus.name} source={bus.source} destination={bus.destination} startTime={bus.startTime} endTime={bus.endTime} price={bus.price}></BusItem>)}
            </div>
        </div>
    )
}

export default BusMenu;