import React from 'react';
import jwt_decode from 'jwt-decode';
import { Card, Input, Icon, Row, Button, Col, Tooltip } from 'antd';
import { GoogleLogin } from 'react-google-login';
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
      user: {
        accountLinked: false,
        email: '',
        name: '',
        phone: '',
        profilePicture: '',
        secondaryEmail: ''
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.onSocialLink = this.onSocialLink.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('vc_token');
    if (token) {
      this.setState({ user: jwt_decode(token) }, () => console.log(this.state.user));
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => {
      console.log(this.state)
    })
  }

  onSocialLink(data, accountType) {
    let userData = {};
    if (accountType == 'google') {
      userData = {
        token: data.accessToken,
        email: data.profileObj.email,
        name: data.profileObj.name,
        imageUrl: data.profileObj.imageUrl
      };
    } else {
      userData = {
        token: data.accessToken,
        email: data.email,
        name: data.name,
        imageUrl: data.picture.data.url
      };
    }
    fetch(
      API_BASE_URL + '/users/profile/link-social', {
        method: 'PUT',
        body: JSON.stringify({
          ...userData,
          accountType
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('vc_token')
        }
      }
    ).then((res) => res.json())
      .then((res) => {
        console.log(res)
        const { token, updatedUser } = res;
        localStorage.setItem('vc_token', token);
        this.setState({
          user: updatedUser
        });
      }).catch((err) => {
        alert(err.message);
      });
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
          <Input value={this.state.user.name} disabled />
        </FormItem>

        <FormItem label="Email" tooltipTitle="Auto filled from your linked social media account">
          <Input value={this.state.user.email} disabled />
        </FormItem>

        <FormItem label="Secondary Email" tooltipTitle="You'll receive order details here">
          <Input name="secondaryEmail" value={this.state.secondaryEmail} onChange={this.handleChange} />
        </FormItem>

        <FormItem label="Mobile">
          <Row gutter={40}>
            <Col span={20}>
              <Input placeholder="Enter your mobile number" value={this.state.user.phone} type="tel" onChange={r => console.log(r)} />
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
                clientId={GOOGLE_APP_ID}
                onSuccess={(d) => this.onSocialLink(d, 'google')}
                onFailure={(d) => console.log(d)}
                render={renderProps => (
                  <Button type="danger" onClick={renderProps.onClick} block style={{ background: '#DD4B39', color: 'white' }} icon="google-plus" disabled={this.state.user.accountLinked == 'google'}>
                    {this.state.user.accountLinked == 'google' ? 'Account Linked' : 'Google+ Login'}
                  </Button>
                )}
              />
            </Col>
            <Col span={12}>
              <FacebookLogin
                appId={FACEBOOK_APP_ID}
                autoLoad={false}
                fields="name,email,picture"
                callback={(d) => this.onSocialLink(d, 'facebook')}
                render={renderProps => (
                  <Button type="primary" onClick={renderProps.onClick} block style={styles.facebookButtonStyle} icon="facebook" disabled={this.state.user.accountLinked == 'facebook'}>
                    {this.state.user.accountLinked == 'facebook' ? 'Account Linked' : 'Facebook Login'}
                  </Button>
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

const styles = {
  facebookButtonStyle: { background: '#3b5998', color: 'white' }

}