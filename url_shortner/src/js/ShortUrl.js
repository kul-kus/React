
import React, { useState, useEffect } from 'react';
import { NavigationBar, Footer, InputPanel, ConvertStringtoHtml } from "./Component"
import './../css/Home.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

// const { data } = this.props.location

function Home(props) {
    let finalShortURL = props.shortURl
    let setShortUrlTemp

    [finalShortURL, setShortUrlTemp] = useState(props.shortURl)
    let [finalLongURL, setLongUrlTemp] = useState(props.longURL)

    useEffect(() => {
        if(finalShortURL)
        localStorage.setItem("finalShortURL", JSON.stringify(finalShortURL))

        if(finalLongURL)
        localStorage.setItem("finalLongURL", JSON.stringify(finalLongURL))
    })
    useEffect(() => {
        let tempLURL = localStorage.getItem("finalLongURL")
        let tempSURL = localStorage.getItem("finalShortURL")
        if (tempLURL) {
            setLongUrlTemp(JSON.parse(tempLURL))
        }
        if (tempSURL) {
            setShortUrlTemp(JSON.parse(tempSURL))
        }
    }, [])

    let panelmsg = "Copy the shortened link and share it in messages, post, websites and other locations."

    let longUrl = `<a class="contnet_a" target="_blank" rel="noopener noreferrer" href=${finalLongURL}> ${finalLongURL}</a>`


    let pageContent = (
        <>
            <NavigationBar></NavigationBar>
            <Container style={{ "paddingBottom": "80px" }}>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <InputPanel heading="Your shortened URL"
                            shrtURL={finalShortURL}
                            type="short"
                            onchangefun={e => { setShortUrlTemp(e.target.value) }}

                            longurl={ConvertStringtoHtml(longUrl)}
                            panelmsg={ConvertStringtoHtml(panelmsg)}>
                        </InputPanel>
                    </Col>
                </Row>
            </Container>
            <Footer></Footer>

        </>
    )
    // return finalShortURL ? (pageContent) : (pageContent)
    return localStorage.getItem("finalShortURL") ? (pageContent) : (<><Redirect to="/" /></>)

}

export default Home;
