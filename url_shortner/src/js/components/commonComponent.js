import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';


import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import LoadingProgressBar from "./LoadingProgressbar"
import FixedProgressBar from "./FixedProgressbar"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import './../css/Home.css';
import './../../css/Home.css';
import './../../css/Component.css';
import { useSelector, useDispatch } from "react-redux"



function NavigationBar(props) {
    let navbar = (
        <Navbar bg="dark" variant="dark" >
            <Navbar.Brand style={{ padding: "0px" }}>
                <Link to="/" style={{ letterSpacing: "2px" }}>
                    <span className="logo" style={{ marginLeft: "50px", marginRight: "15px" }}>
                        Esy
                    </span>
                    <span clss="remaning2">Url</span>
                </Link>
            </Navbar.Brand>
        </Navbar>
    )
    return navbar
}
function Footer(props) {
    return (
        <>
            <footer>
                <p>© 2021 ShortUrl - Tool to shorten a long link.<br />
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
        h1["marginBottom"] = "0px"
    }
    return (
        <h1 style={h1} >{props.heading}</h1>
    )
}
function InputPanel(props) {

    let home = (props.type && props.type === "home") ? true : false

    // console.log("InputPanel -> props.longurl", props.longurl)
    return (
        <div className="inputdiv" >
            {props.heading && <Heading type={props.type} heading={props.heading}></Heading>}
            {(props.form)
                // ? (< props.form longURL={props.longURL} shortURl={props.shortURl} setSiteData={props.setSiteData}></props.form>)
                ? (< props.form></props.form>)

                : <TextBox
                    value={props.shrtURL}
                    type={props.type}
                    onchangefun={props.onchangefun}
                    btnTxt="Copy"></TextBox>}
            <PanelMsg content={props.panelmsg}></PanelMsg>

            {
                props.longurlText
                    ? <><PanelMsg beforeCon={"Long Url: "} content={props.longurlText}></PanelMsg></>
                    : <></>
            }
            {
                !home
                    ? <>Create other<Link className="contnet_a" to="/"> Shortened URL</Link></>
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
        "fontSize": "18px",
        "fontWeight": "400"
    }
    let rightArrow = {
        "fontWeight": "bolder",
        "fontSize": "33px",
        "height": "100%"
    }
    let home = (props.type && props.type === "home") ? true : false

    const [show, setShow] = useState(false);

    useEffect(() => {
        if (show) {
            var copyText = document.getElementById("myInput");
            copyText.select();
            copyText.setSelectionRange(0, 99999)
            document.execCommand("copy");
        }
    }, [show]);

    return (
        <>
            {
                !home
                    ? <Row style={{ "height": "30px" }}>
                        <Col lg={{ span: 2, offset: 9 }} style={colCss}>
                            {/* <AlertComp></AlertComp> */}
                            <Toast className="toast-text" onClose={() => setShow(false)} show={show} delay={1500} autohide>
                                <Toast.Body>Copied</Toast.Body>
                            </Toast>
                        </Col>
                    </Row>
                    : <></>
            }

            <Row>
                {/* <Col lg={{ span: 6, offset: 2 }} style={colCss}> */}

                <Col lg={{ span: 8, offset: 1 }} style={colCss}>
                    <InputGroup className="mb-3" style={inputTxtCss}>
                        {
                            props.type && props.type === "home" &&
                            < InputGroup.Prepend style={{ "height": "100%" }}>
                                <InputGroup.Text id="basic-addon1" style={rightArrow}>&#10132;</InputGroup.Text>
                            </InputGroup.Prepend>
                        }
                        <FormControl id="myInput" style={inputTxtCss}
                            placeholder={props.placeholder}
                            // aria-label="Username"
                            value={props.value}
                            onChange={props.onchangefun}
                            aria-describedby="basic-addon1"
                        />

                    </InputGroup>
                </Col>
                <Col lg={{ span: 2 }} style={colCss}>
                    {home
                        ? <Button style={btnCss} variant="primary" type="submit"> {props.btnTxt}</Button>
                        : <Button style={btnCss} variant="primary" onClick={() => setShow(true)}> {props.btnTxt}</Button>
                    }
                </Col>
            </Row>
        </>
    )
}

// const onFormSubmit = (e => {
//     console.log("dddddddddddddddddddddddddddddddddddddddddddddddddd")
// })
function LoadingBar(props) {
    // LoadingProgressBar
    //FixedProgressBar
    const { isSumitted } = useSelector((state) => state.esy)

    return (
        <>
            {(isSumitted && props.type === "home") ? <LoadingProgressBar /> : <FixedProgressBar />}
        </>
    )
}

function ConvertStringtoHtml(con) {
    return (
        <span dangerouslySetInnerHTML={{ __html: con }}>
        </span>
    )
}


export {
    Footer,
    NavigationBar,
    InputPanel,
    PanelMsg,
    TextBox,
    Heading,
    ConvertStringtoHtml,
    LoadingBar
}
// export NavigationBar
