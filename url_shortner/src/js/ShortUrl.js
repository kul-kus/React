
import React from 'react';
import { NavigationBar, Footer, InputPanel } from "./Component"
import './../css/Home.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';


function Home() {
    let panelmsg = [
        "Copy the shortened link and share it in messages, post, websites and other locations.", <br></br>,
    ]
    let longUrl = [
        <a className="contnet_a" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com"> https://www.facebook.com/</a>
    ]
    return (
        <>
            <NavigationBar></NavigationBar>
            <Container style={{ "paddingBottom": "80px" }}>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        {/* <InputPanel></InputPanel> */}
                        <InputPanel heading="Your shortened URL" type="short" longurl={longUrl}
                            panelmsg={panelmsg}>
                        </InputPanel>
                    </Col>
                </Row>
            </Container>
            <Footer></Footer>

        </>
    );
}
export default Home;