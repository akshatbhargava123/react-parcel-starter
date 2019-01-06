import React, { Component } from 'react';
import { Row, Col, Layout, Button } from 'antd';

class CustomFooter extends Component {
  render() {
    const { Footer } = Layout;
    return (
      <Footer style={{ background: 'white', marginTop: 20 }}>
        <Row>
          <Col span={4} />
          <Col span={6}>
            <h2>About</h2>
            <Row><Col>
              <a>About Us</a>
            </Col></Row>
            <Row><Col>
              <a>VC Benefits</a>
            </Col></Row>
            <Row><Col>
              <a>Blog</a>
            </Col></Row>
            <Row><Col>
              <a>Customer Diaries</a>
            </Col></Row>
          </Col>
          <Col span={6}>
            <h2>Help</h2>
            <Row><Col>
              <a>Contact Us</a>
            </Col></Row>
            <Row><Col>
              <a>FAQs</a>
            </Col></Row>
            <Row><Col>
              <a>Terms of Use</a>
            </Col></Row>
            <Row><Col>
              <a>Privacy Policy</a>
            </Col></Row>
            <Row><Col>
              <a>Documents Required</a>
            </Col></Row>
            <Row><Col>
              <a>Return and Refund</a>
            </Col></Row>
          </Col>
          <Col span={8}>
            <h2>Connect With Us</h2>
            <Button shape="circle" type="ghost" style={{ marginRight: 12 }}>
              <img style={{ width: '100%', height: '100%' }} src="/icons/facebook.png" />
            </Button>
            <Button shape="circle" type="ghost" style={{ marginRight: 12 }}>
              <img style={{ width: '100%', height: '100%' }} src="/icons/google.png" />
            </Button>
            <Button shape="circle" type="ghost" style={{ marginRight: 12 }}>
              <img style={{ width: '100%', height: '100%' }} src="/icons/twitter.png" />
            </Button>
            <Button shape="circle" type="ghost" style={{ marginRight: 12 }}>
              <img style={{ width: '100%', height: '100%' }} src="/icons/insta.png" />
            </Button>
          </Col>
        </Row>
        <div style={{ textAlign: 'center', marginTop: 30 }}>
          <h3>Vicinity Charter ©2018</h3>
          <p>Mumbai based online store for purchasing and renting products. Currently serving fashion and camping store.</p>
        </div>
      </Footer>
    )
  }
}

export default CustomFooter;