
import React, { useState } from 'react';
import { NavigationBar, Footer, InputPanel, ConvertStringtoHtml, LoadingBar } from "./commonComponent"
import './../../css/Home.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { useSelector } from "react-redux"

// const { data } = this.props.location

function Home(props) {
    let reduxSate = useSelector((state) => state.esy)
    let [finalShortURL, setShortUrlTemp] = useState(reduxSate["shortUrl"])
    let finalLongURL = reduxSate["longUrl"]
    // let [finalLongURL, setLongUrlTemp] = useState("www.google.com")



    let panelmsg = `Copy the <a class="contnet_b" target="_blank" rel="noopener noreferrer" href=${finalShortURL}>shortened</a> link and share it in messages, post, websites and other locations.`

    let longUrl = `<a class="contnet_a" target="_blank" rel="noopener noreferrer" href=${finalLongURL}> ${finalLongURL}</a>`


    let pageContent = (
        <>
            <NavigationBar></NavigationBar>
            <LoadingBar></LoadingBar>
            <Container style={{ "paddingBottom": "80px" }}>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <InputPanel heading="Your shortened URL"
                            shrtURL={finalShortURL}
                            type="short"
                            onchangefun={e => { setShortUrlTemp(e.target.value) }}
                            longurlText={ConvertStringtoHtml(longUrl)}
                            panelmsg={ConvertStringtoHtml(panelmsg)}>
                        </InputPanel>
                    </Col>
                </Row>
            </Container>
            <Footer></Footer>

        </>
    )
    // return finalShortURL && finalLongURL ? (pageContent) : (pageContent)
    return reduxSate["shortUrl"] ? (pageContent) : (<><Redirect to="/" /></>)

}

export default Home;
