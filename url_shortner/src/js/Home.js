import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import './../css/Home.css';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptop, faShieldAlt, faLink } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp, faHandPaper, faClock } from '@fortawesome/free-regular-svg-icons'

import { NavigationBar, Footer, InputPanel, TextBox, ConvertStringtoHtml } from "./Component"

var api = require("./../api/routes")
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
        <input className="customInput"
          style={customInputCss}
          value={props.value}
          onChange={props.onchangefun}
        ></input>
      </div>
    )
  } else {
    con = (
      <div className="customPanel" style={customPanel}>
        <span>{props.tag}</span><input className="customInput"
          type="text"
          style={customInputCss}
          value={props.value}
          onChange={props.onchangefun}
        ></input>
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

  var formData = {}
  var setUrl, setCustom, setDays, setSubmt, setError

  [formData["url"], setUrl] = useState("");
  [formData["custom"], setCustom] = useState("");
  [formData["days"], setDays] = useState("");
  [formData["error"], setError] = useState("");
  [formData["submt"], setSubmt] = useState(false);
  const [shorturl, setShortUrl] = useState(false);



  const validationCheck = (obj, cb) => {
    if (obj && obj.url) {
      let urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/gm
      // let urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm

      if (!urlRegex.test(obj["url"])) {
        return cb("Enter the valid Url to be Shortned")
      }

      if (obj.days) {
        if (isNaN(obj.days)) {
          return cb("Expiry days should be in number")
        }
        if (Number(obj.days) <= 0) {
          return cb("Minimum value for expiry days is 1")
        }
        if (Number(obj.days) > 365) {
          return cb("Maxium value for expiry days is 365")
        }
      }
      return cb(null, true)

    } else {
      return cb("Enter the Url to be Shortned")
    }
  }

  const onFormSubmit = (e => {

    validationCheck(formData, (err, data) => {
      if (err) {
        setError(err)
        e.preventDefault()
      } else {
        setSubmt(true)
        api.createShortUrl(formData, (err, data) => {
          if (err) {
            setError(err)
            setUrl(formData["url"])
            setCustom(formData["custom"])
            setDays(formData["days"])
            e.preventDefault()
          }
          if (data) {
            // <Redirect to="/shorturl/" />
            setError("---------------")
            setShortUrl(data)
          }
        })
      }
    })
  })

  useEffect(() => {
    if (formData["submt"]) {
      setSubmt(false)
    }
  }, [formData["submt"], shorturl]);

  let error = {
    "marginTop": "15px",
    "fontWeight": "500",
    "letterSpacing": "0.5px",
    "color": "rgba(220, 25, 25, 0.87)",
    "height": "25px"
  }

  let renderData = (
    <>
      {/* <Redirect to="/shorturl" /> */}
      <div className="error" style={error}>{formData.error}</div>
      <Form style={{ "padding": "3px 5px 20px 5px" }} onSubmit={onFormSubmit}>

        <TextBox type="home" placeholder="Enter your link here" btnTxt="Shorten" onchangefun={e => { setUrl(e.target.value) }} value={formData.url}></TextBox>
        <MyFormOptionalParams span="3"
          tag="shorturl/"
          label="Optional short link ending. Custom ending goes here:"
          onchangefun={e => setCustom(e.target.value)} value={formData.custom}
        ></MyFormOptionalParams>

        <MyFormOptionalParams span="2"
          tag="/days"
          label="Optional link expire time in days:"
          onchangefun={e => setDays(e.target.value)} value={formData.days}
        ></MyFormOptionalParams>
      </Form>
    </>
  )
  return (
    <>
      {
        shorturl ? <><Redirect to="/shorturl"
          to={{
            pathname: "/shorturl",
            data: { "Longurl": formData.url } // your data array of objects
          }}
        /></> : renderData
      }
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

  let content1 = `ShortURL allows to reduce long links from 
  <a class="contnet_a" target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/"> Facebook</a> 
  <a class="contnet_a" target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/">YouTube</a> 
  <a class="contnet_a" target="_blank" rel="noopener noreferrer" href="https://twitter.com/">Twitter</a> 
  <a class="contnet_a" target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/">Linked</a> 
  In and top sites on the Internet, just paste the long URL and click the Shorten URL button. On the next screen, 
  copy the shortened URL and share it on websites, chat and e-mail."`

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

  let panelmessage = `URLShortner! is a free tool to shorten a URL or reduce a link.</br>
  Use our URL Shortener to create a shortened link making it easy to remember.`

  let contain = (
    <>
      <Container style={{ "paddingBottom": "80px" }}>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <InputPanel type="home" heading="Paste the URL to be shortned" form={MyForm} panelmsg={ConvertStringtoHtml(panelmessage)}></InputPanel>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <div className="content" style={{ "padding": "10px 60px", "margin": "10px 0px" }}>
              <ContentPanel id="simple" title="Simple and fast URL shortener!" content={ConvertStringtoHtml(content1)}></ContentPanel>
              <ContentPanel id="short" title="Shorten, share" content={ConvertStringtoHtml(content2)}></ContentPanel>
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
