import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';


import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './../css/Home.css';


function NavigationBar(props) {
    let navbar = (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand>
                <Link to="/"><span className="logo">URL</span> Shortener!</Link>
            </Navbar.Brand>
        </Navbar>
    )
    return navbar
}
function Footer(props) {
    return (
        <>
            <footer>
                <p>© 2020 ShortUrl - Tool to shorten a long link.<br />
                    <a href="mailto:KuldeepKushwaha@gmail.com">Kuldeep Kushwaha</a>
                </p>
            </footer>
        </>
    )
}


function Heading(props) {
    let h1 = {
        "fontSize": "35px",
        "marginTop": "10px",
        "color": "#505050",
        "fontFamily": "arial",
        "letterSpacing": "-1px",
        "fontWeight": "bold",
    }
    if (props.type === "short") {
        h1["marginBottom"] = "30px"
    }
    return (
        <h1 style={h1} >{props.heading}</h1>
    )
}
function InputPanel(props) {

    let home = (props.type && props.type === "home") ? true : false

    return (
        <div className="inputdiv" >
            {props.heading && <Heading type={props.type} heading={props.heading}></Heading>}
            {(props.form) ? (< props.form ></props.form>) : <TextBox type={props.type} btnTxt="Copy"></TextBox>}
            <PanelMsg content={props.panelmsg}></PanelMsg>

            {
                props.longurl
                    ? <><PanelMsg beforeCon={"Long Url: "} content={props.longurl}></PanelMsg></>
                    : <></>
            }
            {
                !home
                    ? <>Create other< Link className="contnet_a" to="/"> Shortened URL</Link></>
                    : <></>
            }

        </div >
    )
}

function PanelMsg(props) {
    let paragraph = {
        "font": "15px source sans pro,arial",
        "color": "#4a4848",
        "lineHeight": "1.5",
        "marginBottom": "0px"
    }

    return (
        <div style={{ "margin": "15px 10px" }}>
            <p style={paragraph}>
                {/* {props.beforeCon}{props.content.map((curr,index)=>{return (<div key={index}>{curr}</div>)})} */}
                {props.beforeCon}{props.content}
            </p>
        </div>
    )
}

function copyTextFunction() {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
}

function AlertComp(props) {

    const [show, setShow] = useState(props.alertval);
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    alert("dddd")
    return (
        <>
            {/* <Alert key={"a1"} variant={"success"} >Copied.</Alert > */}
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
            </Toast>
        </>
    )
}


function TextBox(props) {
    let colCss = {
        "padding": "0px"
    }

    let btnCss = {
        "width": "100%",
        "height": "55px",
        "fontWeight": "500",
        "letterSpacing": "1px",
        "backgroundColor": "#2c87c5",
        "border": "#2c87c5",
        "borderTopLeftRadius": "0px",
        "borderBottomLeftRadius": "0px"
    }
    let inputTxtCss = {
        "width": "100%",
        "height": "55px",
        "borderRadius": "0px",
        "fontSize": "20px"
    }
    let rightArrow = {
        "fontWeight": "bolder",
        "fontSize": "33px",
        "height": "100%"
    }

    let home = (props.type && props.type === "home") ? true : false

    return (
        <>
            <Row>
                {/* <Col lg={{ span: 6, offset: 2 }} style={colCss}> */}
                <Col lg={{ span: 8, offset: 1 }} style={colCss}>
                    <InputGroup className="mb-3" style={inputTxtCss}>
                        {props.type && props.type === "home" &&
                            < InputGroup.Prepend style={{ "height": "100%" }}>
                                <InputGroup.Text id="basic-addon1" style={rightArrow}>&#10132;</InputGroup.Text>
                            </InputGroup.Prepend>
                        }
                        <FormControl id="myInput" style={inputTxtCss}
                            placeholder={props.placeholder}
                            // aria-label="Username"
                            aria-describedby="basic-addon1"
                        />

                    </InputGroup>
                </Col>
                <Col lg={{ span: 2 }} style={colCss}>
                    {home
                        ? <Button style={btnCss} variant="primary" type="submit"> {props.btnTxt}</Button>
                        : <Button style={btnCss} variant="primary" alertval={true} onClick={AlertComp}> {props.btnTxt}</Button>
                    }
                </Col>
            </Row>
        </>
    )
}

export {
    Footer,
    NavigationBar,
    InputPanel,
    PanelMsg,
    TextBox,
    Heading
}
// export NavigationBar
