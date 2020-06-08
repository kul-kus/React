import React from 'react';
// import logo from './logo.svg';
import './../css/Home.css';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptop, faShieldAlt, faLink } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faHandPaper, faClock } from '@fortawesome/free-regular-svg-icons'

import { NavigationBar, Footer, InputPanel, TextBox } from "./Component"

function MyCards(props) {

  let mycards = {
    "borderRadius": "10px",
    "padding": "15px",
    "marginBottom": "20px",
  }
  let h2 = {
    "color": "rgb(66, 64, 64)",
    "fontSize": "25px"
  }
  let p = {
    "fontSize": "16px/1.5 'source sans pro', arial",
    "color": "#3c3c3a"
  }

  let icon = {
    "marginBottom": "15px",
    "fontSize": "45px",
    "color": "#464544"
  }
  return (
    <>
      <div className="mycards" style={mycards}>
        <FontAwesomeIcon style={icon} icon={props.icon} size="lg" />
        {/* <FontAwesomeIcon  icon="faCoffee" size="xs"  /> */}

        <h2 style={h2}>{props.title}</h2>
        <p style={p}>{props.content}</p>
      </div>
    </>
  )
}

function MyFormOptionalParams(props) {
  let colCss = {
    "padding": "0px"
  }
  let customPanel = {
    "padding": "5px",
    "paddingLeft": "10px",
    "textAlign": "left",
    "border": "1px solid rgb(140, 142, 144)",
    "borderRadius": "5px"
  }
  let customInputCss = {
    "width": "50%",
    "border": "0px",
    "paddingLeft": "3px",
  }
  let con = null
  if (props.tag === "/days") {
    customInputCss["width"] = "100%"
    con = (
      <div className="customPanel" style={customPanel}>
        <input className="customInput" type="text" style={customInputCss}></input>
      </div>
    )
  } else {
    con = (
      <div className="customPanel" style={customPanel}>
        <span>{props.tag}</span><input className="customInput" type="text" style={customInputCss}></input>
      </div>
    )
  }
  return (
    <>
      <Row style={{ "marginBottom": "10px" }}>
        <Col lg={{ span: 7, offset: 1 }} style={{ "textAlign": "right", "paddingTop": "6px" }}>
          {props.label}
        </Col>
        <Col lg={{ span: props.span }} style={colCss}>
          {/* <div className="customPanel" style={customPanel}> */}
          {con}
          {/* </div> */}
        </Col>
      </Row>
    </>
  )
}

function MyForm(props) {

  let error = {
    "marginTop": "30px",
    "color": "#ff2727"
  }
  return (
    <>
      <div className="error" style={error}></div>
      <Form style={{ "padding": "3px 5px 20px 5px" }}>
        <TextBox type="home" placeholder="Enter your link here" btnTxt="Shorten"></TextBox>
        <MyFormOptionalParams span="3" tag="shorturl/" label="Optional short link ending. Custom ending goes here:"></MyFormOptionalParams>
        <MyFormOptionalParams span="1" tag="/days" label="Optional link expire time in days:"></MyFormOptionalParams>
      </Form>
    </>
  )
}


function ContentPanel(props) {
  let h2 = {
    "font": "bold 27px asap,arial",
    "color": "rgb(47, 47, 47)",
    "letterSpacing": "0"
  }
  let p = {
    "font": "16px source sans pro,arial",
    "color": "rgb(0, 0, 0)",
    "lineHeight": "1.5",
    "textAlign": "left"
  }
  let content = {
    "marginTop": "10px",
    "marginBottom": "10px",
    "display": "inlineBlock"
  }
  return (
    <div className="contentpanel" key={props.id} style={content}>
      <h2 style={h2}>{props.title}</h2>
      <p style={p}>{props.content}</p>
    </div>
  )
}


function MyContainer(props) {
  let content1 = ["ShortURL allows to reduce long links from ",
    <a key="link1" className="contnet_a" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/"> Facebook</a>, " ",
    <a key="link2" className="contnet_a" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/">YouTube</a>, " ",
    <a key="link3" className="contnet_a" target="_blank" rel="noopener noreferrer" href="https://twitter.com/">Twitter</a>, " ",
    <a key="link4" className="contnet_a" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/">Linked</a>,
    " In and top sites on the Internet, just paste the long URL and click the Shorten URL button. On the next screen, copy the shortened URL and share it on websites, chat and e-mail."]

  let content2 = "Your shortened URLs can be used in publications, advertisements, blogs, forums, e-mails, instant messages, and other locations"

  let mycards = [
    {
      "title": "Easy",
      "icon": faThumbsUp,
      "content": "ShortURL is easy and fast, enter the long link to get your shortened link"
    },
    {
      "title": "Shortened",
      "icon": faLink,
      "content": "Use any link, no matter what size, ShortURL always shortens"
    },
    {
      "title": "Secure",
      "icon": faShieldAlt,
      "content": "It is fast and secure, our service have HTTPS protocol and data encryption"
    },
    {
      "title": "Reliable",
      "icon": faHandPaper,
      "content": "All links that try to disseminate spam, viruses and malware are deleted"
    },
    {
      "title": "Devices",
      "icon": faLaptop,
      "content": "Compatible with smartphones, tablets and desktop"
    },
    {
      "title": "Expiry Time",
      "icon": faClock,
      "content": "Now set your on expiry time for the the Shortned URL"
    }
  ]

  let panelmessage = [
    "URLShortner! is a free tool to shorten a URL or reduce a link.", <br></br>,
    "Use our URL Shortener to create a shortened link making it easy to remember."
  ]
  let contain = (
    <>
      <Container style={{ "paddingBottom": "80px" }}>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <InputPanel type="home" heading="Paste the URL to be shortned" form={MyForm} panelmsg={panelmessage}></InputPanel>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <div className="content" style={{ "padding": "10px 60px", "margin": "10px 0px" }}>
              <ContentPanel id="simple" title="Simple and fast URL shortener!" content={content1}></ContentPanel>
              <ContentPanel id="short" title="Shorten, share" content={content2}></ContentPanel>
            </div>
          </Col>
        </Row>
        <Row style={{ "textAlign": "center" }}>
          <Col md={{ span: 10, offset: 1 }}>
            <Row>
              {
                mycards.map((curr, index) => {
                  return (
                    <Col md={4} key={index}>
                      <MyCards title={curr.title} icon={curr.icon} content={curr.content}></MyCards>
                    </Col>
                  )
                })
              }
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
  return contain
}

function Home() {
  return (
    <>
      <NavigationBar></NavigationBar>
      <MyContainer></MyContainer>
      <Footer></Footer>
    </>
  );
}
export default Home;
