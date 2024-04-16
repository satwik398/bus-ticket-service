import "./App.css"

import { Routes,Route, useLocation } from "react-router-dom";


import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import BusMenu from "./components/bus-menu/BusMenu";
import AddBus from "./components/bus/AddBus";
import Bus from "./components/bus/Bus";
import Home from "./components/Home/Home";
import NavBar from "./components/navigation/NavBar";
import Profile from "./components/profile/Profile";

const App = ()=>{

    const location = useLocation();

    const res1 = location.pathname.includes("/login");
    const res2 = location.pathname.includes("/register");
    

    return (
        <>
            {res1 || res2 ? <></> : <NavBar></NavBar>}
            <Routes>
                <Route path={"/login"} element={<Login></Login>}></Route>
                <Route path={"/register"} element={<Register></Register>}></Route>
                <Route path={"/"} element={<Home></Home>}></Route>
                <Route path={"/bus"} element={<BusMenu></BusMenu>}></Route>
                <Route path={"/bus/:id"} element={<Bus></Bus>}></Route>
                <Route path={"/profile"} element={<Profile></Profile>}></Route>
                <Route path={"/addBus"} element={<AddBus></AddBus>}></Route>
            </Routes>
        </>
        
    )
}
export default App;