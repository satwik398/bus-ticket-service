import React, { useState } from "react"
import "./Home.css"
import bus from "../../images/school-bus.png"
import delhi from "../../images/delhi.png"
import jaipur from "../../images/jaipur.png"
import agra from "../../images/agra.png"
import mumbai from "../../images/mumbai.png"
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate();

    const [source, setSource] = useState("");
    const [destination, setDestination] = useState("");

    const handleOnChangeSource = (e)=>{
        setSource(e.target.value);
    }
    const handleOnChangeDestination = (e)=>{
        setDestination(e.target.value);
    }

    const handleSubmit = ()=>{
        if(!source || !destination){
            alert("ALL FIELDS ARE NECESSARY");
            return;
        }

        const params = `?source=${source.toLowerCase()}&destination=${destination.toLocaleLowerCase()}`;
        navigate(`/bus${params}`);
    }


    return (
        <div className="home">
            <div className="home-header">
                <div>
                    <div className="home-header-icon">
                        <img src={bus} alt=""></img>
                    </div>
                    <div className="home-header-input">
                        <div className="tagline">Journey Made Simple, Tickets In A Click</div>

                        <div className="home-input-container">
                            <div>
                                <input placeholder="From" onChange={handleOnChangeSource}></input>
                            </div>
                            <div>
                                <input placeholder="To" onChange={handleOnChangeDestination}></input>
                            </div>
                            <div>
                                <button onClick={handleSubmit}>search</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-cities">
                <div>
                    <img src={delhi} alt=""></img>
                    <div>Delhi</div>
                </div>
                <div>
                    <img src={agra} alt=""></img>
                    <div>Agra</div>
                </div>
                <div>
                    <img src={mumbai} alt=""></img>
                    <div>Mumbai</div>
                </div>
                <div>
                    <img src={jaipur} alt=""></img>
                    <div>Jaipur</div>
                </div>
            </div>
        </div>
    )
}

export default Home;