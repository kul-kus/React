
import React from 'react';
import { NavigationBar, Footer, InputPanel, ConvertStringtoHtml } from "./Component"
import './../css/Home.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import Container from 'react-bootstrap/Container';

// const { data } = this.props.location

function Home() {
    let panelmsg = "Copy the shortened link and share it in messages, post, websites and other locations."

    let longUrl = `<a class="contnet_a" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com"> https://www.facebook.com/</a>`

    // console.log("-------long url---->", data)

    return (

        <>
            <NavigationBar></NavigationBar>
            <Container style={{ "paddingBottom": "80px" }}>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        {/* <InputPanel></InputPanel> */}
                        <InputPanel heading="Your shortened URL" type="short" longurl={ConvertStringtoHtml(longUrl)}
                            panelmsg={ConvertStringtoHtml(panelmsg)}>
                        </InputPanel>
                    </Col>
                </Row>
            </Container>
            <Footer></Footer>

        </>
    );
}

export default Home;
