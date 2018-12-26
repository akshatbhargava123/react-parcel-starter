import React, { Component } from 'react';
import { Input, Button, Anchor, Icon, message } from 'antd';
import { API_BASE_URL } from './../../App.constants';

const { Link } = Anchor;

export default class UserToolbarDropdrop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('vc_token'),
      phone: '',

      sendingOtp: false,
      otpSent: false,
      otpVerified: false,
      otp: ['', '', '', ''],
      wrongOtpError: false,
      resendTimer: null,
      resendTimeLeft: 0
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: String(e.target.value) });
  }

  sendOtp = () => {
    this.setState({ sendingOtp: true });
    setTimeout(() => {
      fetch(
        API_BASE_URL + '/users/login/sendotp', {
          method: 'POST',
          body: JSON.stringify({
            phone: this.state.phone
          }),
          headers: { 'Content-Type': 'application/json' }
        }
      ).then(response => response.json())
        .then(response => {
          if (response.error) {
            this.setState({ sendingOtp: false });
            message.error('OTP was not sent, make sure you entered a correct mobile number');
          } else {
            this.setState({ otpSent: true, sendingOtp: false });
            message.success('OTP sent');
          }
        }).catch(err => {
          message.error('Something went wrong, please try again later')
        });
    }, 2000);
  }

  verifyOtp = () => {
    const dismissLoading = message.loading('Verifying OTP...', 0);
    fetch(
      API_BASE_URL + '/users/login/verifyotp', {
        method: 'POST',
        body: JSON.stringify({
          phone: this.state.phone,
          otp: this.state.otp.join('')
        }),
        headers: { 'Content-Type': 'application/json' }
      }
    ).then(response => response.json())
      .then(response => {
        dismissLoading();
        if (response.error) {
          message.error(response.message);
          this.setState({ wrongOtpError: true, otp: ['', '', '', ''] })
        } else {
          message.success('OTP verified!');
          this.setState({ otpVerified: true });
          localStorage.setItem('vc_token', response.token);
        }
      }).catch(err => {
        message.error('Something went wrong, please try again later');
      });
  }

  changeNumber = () => {
    this.setState({
      otpSent: false,
      otpVerified: false,
      otp: ['', '', '', ''],
      phone: ''
    });
  }

  handleOtpChange = (e, i) => {
    this.setState({ otp: [...this.state.otp.slice(0, i), e.target.value] }, () => {
      if (i < 3) {
        document.getElementById(`input-${i + 1}`).focus();
      } else this.verifyOtp();
    });
  }

  logout = () => {
    this.setState({
      otpVerified: false,
      otpSent: false,
      otp: ['', '', '', ''],
      wrongOtpError: false
    });
  }

  UserPanel = () => {
    return (
      <div>
        <h3 style={{ textAlign: "center", color: "#1890ff" }}>Update Profile Now!!!</h3>
        <Button block>My Profile</Button><br />
        <Button block>Orders List</Button><br />
        <Button block>Wishlist</Button><br /><br />
        <Button type="primary" icon="unlock" type="danger" block onClick={this.logout}>Logout</Button>
      </div>
    )
  }

  OtpForm = () => {
    const otpInputStyle = { width: 50, textAlign: 'center' };
    return (
      <div>
        <h3 style={{ color: "#1890ff" }}>Enter the OTP below</h3>
        <Input size="default" placeholder="*" value={this.state.otp[0]} id="input-0" onChange={(e) => this.handleOtpChange(e, 0)} style={otpInputStyle} />
        <Input size="default" placeholder="*" value={this.state.otp[1]} id="input-1" onChange={(e) => this.handleOtpChange(e, 1)} style={otpInputStyle} />
        <Input size="default" placeholder="*" value={this.state.otp[2]} id="input-2" onChange={(e) => this.handleOtpChange(e, 2)} style={otpInputStyle} />
        <Input size="default" placeholder="*" value={this.state.otp[3]} id="input-3" onChange={(e) => this.handleOtpChange(e, 3)} style={otpInputStyle} />
        <br /><br />
        <Button className="button" block>Resend OTP</Button><br />
        <Button className="button" block onClick={this.changeNumber}>Change Phone Number</Button>
      </div>
    )
  }

  LoginForm = () => {
    return (
      <div>
        <h3 style={{ color: "#1890ff", marginBottom: 10 }}>Login</h3>
        <Input style={{ marginBottom: 20 }} placeholder="Enter Phone Number" name="phone" onChange={this.handleChange} />
        <Button type="primary" icon="unlock" style={{ fontSize: 20 }} block onClick={this.sendOtp} loading={this.state.sendingOtp} />
        <br />
        <div style={{ marginTop: 15, marginBottom: 10 }}>
          <Button style={{ backgroundColor: '#dd4b39', color: "white", borderColor: "#dd4b39", marginRight: 15 }} icon="google-plus" size="large" shape="circle" onClick={this.sendOtp} />
          <Button style={{ backgroundColor: '#3b5998', color: "white", borderColor: '#3b5998', marginLeft: 15 }} type="primary" size="large" shape="circle" onClick={this.sendOtp}>
            <Icon type="facebook" theme="filled" ></Icon>
          </Button>
        </div>
      </div>
    )
  };

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        {
          this.state.isLoggedIn ?
            (this.UserPanel()) :
            (this.state.otpSent ?
              this.OtpForm() :
              this.LoginForm()
            )
        }
      </div>
    );
  }
}
