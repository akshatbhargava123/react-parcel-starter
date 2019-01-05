import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { Row, Col, Breadcrumb, Icon } from 'antd';

import './AccountPage.css';
import AccountSidemenu from '../components/AccountSidemenu';
import Support from '../components/Support';
import EditProfile from '../components/EditProfile';

class AccountPage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      currentRouteKey: 'profile'
    }
    this.onClick = this.onClick.bind(this);
    this.changeRoute = this.changeRoute.bind(this);
  }

  componentDidMount() {
    const { pathname } = this.props.location;
    const key = pathname.slice(pathname.lastIndexOf('/') + 1, pathname.length);
    this.setState({ currentRouteKey: key });
  }

  onClick(e) {
    e.preventDefault();
  }

  changeRoute(key) {
    this.props.history.push(`/account/${key}`);
    this.setState({ currentRouteKey: key })
  }

  render() {
    return (
      <React.Fragment>

        <Row style={{ marginTop: 100 }}>
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
                <span>{this.state.currentRouteKey}</span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>

        <Row style={{ marginTop: 30 }}>
          <Col span={2}></Col>
          <Col span={7}>

            <AccountSidemenu current={this.state.currentRouteKey} optionSelected={this.changeRoute} />

          </Col>

          <Col span={12}>

            <Switch>
              <Route path='/account/support' component={Support} />
              <Route path='/account/profile' exact component={EditProfile} />
            </Switch>

          </Col>

          <Col span={5}></Col>


        </Row>


      </React.Fragment>
    )
  }
}

export default withRouter(AccountPage);