import React from 'react';
import jwt_decode from 'jwt-decode';
import { Card, Input, Icon, Row, Button, Col, Tooltip } from 'antd';
import GoogleLogin from './GoogleLogin';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { API_BASE_URL, GOOGLE_APP_ID, FACEBOOK_APP_ID } from '../App.constants';

const FormItem = ({ label, children, tooltipTitle }) => {
  return (
    <div style={{ margin: '0px 0px 20px 0px' }}>
      <Row>
        <Col span={4}>
          <b>{label}:</b>
        </Col>
        <Col span={16}>
          {tooltipTitle ?
            <Tooltip title={tooltipTitle} trigger="hover">
              {children}
            </Tooltip> :
            children
          }
        </Col>
      </Row>
    </div>
  )
};

class EditProfile extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('vc_token');
    if (token) {
      this.setState({ user: jwt_decode(token) });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      console.log(this.state)
    })
  }

  updateProfile(e) {
    e.preventDefault();
    fetch(
      API_BASE_URL + '/users/profile', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({
          secondaryEmail: this.state.secondaryEmail,
        })
      }
    ).then(res => res.json())
      .then((res) => {
        console.log(res);
      }).catch((err) => {
        alert(err.message);
      });
  }

  render() {
    return (
      <Card style={{ width: '100%' }}>
        <h2>Basic Profile</h2>
        <br />

        <FormItem label="Name" tooltipTitle="Auto filled from your linked social media account">
          <Input value="Sakshi Srivastava" disabled />
        </FormItem>

        <FormItem label="Email" tooltipTitle="Auto filled from your linked social media account">
          <Input value="sakshisrivastava413@gmail.com" disabled />
        </FormItem>

        <FormItem label="Secondary Email" tooltipTitle="You'll receive order details here">
          <Input name="secondaryEmail" value={this.state.secondaryEmail} onChange={this.handleChange} />
        </FormItem>

        <FormItem label="Mobile">
          <Row gutter={40}>
            <Col span={20}>
              <Input placeholder="Enter your mobile number" value="9968516771" type="tel" onChange={r => console.log(r)} />
            </Col>
            <Col span={4}>
              <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ fontSize: 'x-large' }} />
            </Col>
          </Row>
        </FormItem>

        <FormItem label="Password">
          <Button type="primary" ghost block>Change Password</Button>
        </FormItem>

        <FormItem label="Social Login">
          <Row gutter={50}>
            <Col span={12}>
              <GoogleLogin
                onSuccess={(r) => console.log(r)}
                clientId={GOOGLE_APP_ID}
                onSuccess={(d) => this.onSocialLink(d, 'google')}
                onFailure={(d) => console.log(d)}
              />
            </Col>
            <Col span={12}>
              <FacebookLogin
                appId={FACEBOOK_APP_ID}
                autoLoad={false}
                fields="name,email,picture"
                callback={(d) => this.onSocialLink(d, 'facebook')}
                render={renderProps => (
                  <Button type="primary" onClick={renderProps.onClick} block style={{ background: '#3b5998', color: 'white' }} icon="facebook">Facebook Login</Button>
                )}
              />
            </Col>
          </Row>
        </FormItem>
        <Button type="primary" block onClick={this.updateProfile}>UPDATE PROFILE</Button>
      </Card>
    )
  }
};

export default EditProfile;