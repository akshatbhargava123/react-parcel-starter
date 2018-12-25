import React from 'react';
import { Row, Col, Breadcrumb, Icon } from 'antd';

import './AccountPage.css';
import AccountSidemenu from '../components/AccountSidemenu';

export default class AccountPage extends React.Component {

  onClick = e => {
    e.preventDefault();
  }

  render() {
    return (
      <React.Fragment>

        <Row style={{ marginTop: 30 }}>
          <Col span={3}></Col>
          <Col span={4}>
            <h2>My Account</h2>
          </Col>
          <Col span={10}></Col>
          <Col span={6}>
            <Breadcrumb>
              <Breadcrumb.Item onClick={this.onClick} href="">
                <Icon type="home" />
              </Breadcrumb.Item>
              <Breadcrumb.Item onClick={this.onClick} href="/account">
                <span>Account</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Icon type="user" />
                <span>Profile</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <Row style={{ marginTop: 30 }}>
          <Col span={2}></Col>
          <Col span={7}>

            <AccountSidemenu />

          </Col>

          <Col span={11}>


            <h1>Hello World</h1>

          </Col>

          <Col span={6}></Col>


        </Row>


      </React.Fragment>
    )
  }
}
