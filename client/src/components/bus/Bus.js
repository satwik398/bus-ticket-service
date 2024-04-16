import React, { useEffect, useState } from "react"
import "./bus.css"

import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import bus from "../../images/school-bus.png";
import BasicDatePicker from "../DateField";
import axios from "axios"
const testBus = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iwd3GKCS-siIfaTxopKv-wHaE9%26pid%3DApi&f=1&ipt=1a4d7a1db3474d3d54de39932b55b8ce55992530cc808adcd272e2fe28667fad&ipo=images"


const Bus = () => {

    const [tickets, setTickets] = useState(0);


    const [idBus, setIdBus] = useState();

    const { id } = useParams();


    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        // creating a new order
        const result = await axios.post("http://localhost:3001/api/payments/orders");

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        // Getting the order details back
        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_k2WGqQOjmwhW1G", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "Bus Hive",
            description: "Test Transaction",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                // const result = await axios.post("http://localhost:5000/payment/success", data);

                alert("payment successful");
            },
            prefill: {
                name: "abc abc",
                email: "abc@gmail.com",
                contact: "9999999999",
            },
            notes: {
                address: "abc",
            },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }


    useEffect(() => {
        const fetchBus = async () => {
            try {
                // console.log(id);
                const data = await axios.get(`http://localhost:3001/api/bus/${id}`);
                console.log(data);
                setIdBus(data.data);
            } catch (error) {

            }
        }
        fetchBus();
    }, []);

    const subtractTicket = () => {
        if (tickets === 0) {
            return;
        }
        setTickets(tickets - 1);
    }

    const addTicket = () => {
        if (tickets == idBus?.seats) {
            return;
        }
        setTickets(tickets + 1);
    }

    const [userId, setUserId] = useState("");
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);

    const makePurchase = async () => {
        if (!cookies.token || cookies.token === 'undefined') {
            navigate("/login");
            return;
        }
        try {
            await displayRazorpay();
            const data = await axios.get("http://localhost:3001/api/profile", { withCredentials: true });
            console.log(data);
            if (data.data.status !== 200) {
                removeCookie("token");
                navigate("/login");
                return;
            }
            setUserId(data.data.user._id);
            console.log(userId);
            console.log(id);
            console.log(tickets);
            // if (!userId || !id || tickets <= 0) {
            //     alert("Invalid Request");
            //     return;
            // }
            const submitObject = {
                userId: data.data.user._id,
                busId: idBus._id,
                tickets: tickets
            }
            const purchase = await axios.post("http://localhost:3001/api/ticket", submitObject, { withCredentials: true });
            if (purchase.data.status === 400) {
                alert("some error occoured");
                return;
            }
            console.log(purchase);
            // alert("purchse successful");
            // navigate("/");
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="bus">
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

            <div className="bus-container">
                <div className="bus-modal-image">
                    <img src={idBus?.displayImage} alt=""></img>
                </div>
                <div className="bus-modal-content">

                    <div className="bus-modal-name">
                        <div className="bus-modal-content-left">
                            Name:
                        </div>
                        <div>
                            {idBus?.name}
                        </div>
                    </div>
                    <div className="bus-modal-src">
                        <div className="bus-modal-content-left">
                            Source:
                        </div>
                        <div>
                            {idBus?.source}
                        </div>
                    </div>
                    <div className="bus-modal-departure">
                        <div className="bus-modal-content-left">
                            Departure:
                        </div>
                        <div className="bus-modal-content-right">
                            {idBus?.startTime}
                        </div>
                    </div>
                    <div className="bus-modal-dest">
                        <div className="bus-modal-content-left">
                            Destination:
                        </div>
                        <div className="bus-modal-content-right">
                            {idBus?.destination}
                        </div>
                    </div>
                    <div className="bus-modal-arrival">
                        <div className="bus-modal-content-left">
                            Arrival:
                        </div>
                        <div className="bus-modal-content-right">
                            {idBus?.endTime}
                        </div>
                    </div>
                    <div className="bus-modal-seats">
                        <div className="bus-modal-content-left">
                            Available Seats:
                        </div>
                        <div className="bus-modal-content-right">
                            {idBus?.seats}
                        </div>
                    </div>
                    <div className="bus-modal-price">
                        <div className="bus-modal-content-left">
                            Price:
                        </div>
                        <div className="bus-modal-content-right">
                            {idBus?.price}
                        </div>
                    </div>
                    <div className="add-ticket">
                        <div>
                            <BasicDatePicker></BasicDatePicker>
                        </div>
                        <div className="add-buttons">
                            <button onClick={subtractTicket}>-</button>
                            <div>{tickets}</div>
                            <button onClick={addTicket}>+</button>
                        </div>
                        <div className="buy-button">
                            <button onClick={makePurchase}>BUY</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Bus;