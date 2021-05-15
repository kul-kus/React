



import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from "react-redux"


function GetApp() {
    const { counter, isLogged } = useSelector((state) => state)

    let fontStyle = {
        color: "#00a0db",
        fontSize: "50px",
        backgroundColor: "#343a40",
        padding: "20px"
    }
    return (
        <div className="App" >
            <h1> Counter Value {counter}</h1>
            <h1> isLogged Value {isLogged}</h1>
            <div style={fontStyle}>


                <div > ESY Url</div>
                <div style={{ fontFamily: 'Roboto Slab' }} > esy Url</div>
                <div style={{ fontFamily: "'Arvo',serif" }} > <span>e</span>sy Url   - </div>

                <div style={{ fontFamily: 'Vast Shadow' }} > esy Url</div>

                <div style={{ fontFamily: 'Train One' }} > ESY Url</div>
                <div style={{ fontFamily: 'Fredericka the Great' }} > esy Url</div>
                <div style={{ fontFamily: 'Fredoka One' }} > esy Url</div>
                <div style={{ fontFamily: 'Alfa Slab One' }} > esy Url</div>
                <div style={{ fontFamily: 'Paytone One' }} > esy Url</div>
                <div style={{ fontFamily: 'Bungee Inline' }} > esy Url</div>
                <div style={{ fontFamily: 'Monoton' }} > esy Url</div>
            </div>
        </div>
    );
}

export default GetApp;
