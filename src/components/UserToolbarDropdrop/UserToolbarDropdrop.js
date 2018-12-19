import React, { Component } from 'react';
import { Input, Button, Anchor } from 'antd';
import { API_BASE_URL } from './../App.constants';

const { Link } = Anchor;

export default class UserToolbarDropdrop extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: localStorage.getItem('vc_token'),
      phone: '',
      otpSent: false,
      otpVerified: false,
      otp: ['', '', '', ''],
      wrongOtpError: false,
      resendTimer: null,
      resendTimeLeft: 0
    };
  }

  // resendOtp = () => {
  //   if (this.state.resendTimeLeft !== 0) return;
  //   this.setState({
  //     wrongOtpError: false,
  //     otp: ['', '', '', ''],
  //     resendTimeLeft: 30,
  //     resendTimer: setInterval(() => {
  //       if (this.state.resendTimeLeft === 0) {
  //         clearInterval(this.state.resendTimer);
  //         this.setState({ resendTimer: null, resendTimeLeft: 0 });
  //       } else this.setState({ resendTimeLeft: this.state.resendTimeLeft - 1 });
  //     }, 1000)
  //   }, () => {
  //     for (let i = 0; i < 4; i++) {
  //       document.getElementById('otp-input-' + i).value = '';
  //     }
  //     document.getElementById('otp-input-0').focus();
  //   });
  //   this.sendOtp();
  // }

  handleChange = (e) => {
    this.setState({ [e.target.name]: String(e.target.value) });
  }

  sendOtp = () => {
    console.log('sending otp:', this.state.phone);
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
        console.log(response);
        if (response.error) {
          alert('Error:', response.message.message);
          console.log('error while sending otp', response);
        } else {
          this.setState({ otpSent: true });
          console.log('otp sent');
        }
      }).catch(err => {
        alert('Something went wrong, please try again later.');
        console.log('Something went wrong, please try again later');
      });
  }

  verifyOtp = () => {
    console.log('verifying otp:', this.state.phone, this.state.otp.join(''));
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
        if (response.error) {
          console.log('otp couldn\'t be verified', response);
          this.setState({ wrongOtpError: true, otp: ['', '', '', ''] })
          console.log(this.state)
          alert("error:", response.message)
        } else {
          console.log('otp verified:', response);
          this.setState({ otpVerified: true });
          localStorage.setItem('vc_token', response.token);
        }
      }).catch(err => {
        console.log('Something went wrong, please try again later.');
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
    const { otp } = this.state;
    otp[i] = e.target.value;
    if (i == 3) {
      this.verifyOtp();
    }
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
        <h3 style={{ textAlign: "center", color: "#1890ff" }}>Update Profile</h3>
        {/* <Anchor>
          <Link href="" title="My Profile" style={{ textAlign: 'center' }} />
          <Link href="" title="Orders List" />
          <Link href="" title="Wishlist" />
        </Anchor> */}
        <Button style={{ width: "200px" }} block>My Profile</Button><br />
        <Button style={{ width: "200px" }} block>Orders List</Button><br />
        <Button style={{ width: "200px" }} block>Wishlist</Button><br /><br />
        <Button type="primary" icon="unlock" type="danger" block onClick={this.logout}>Logout</Button>
      </div>
    )
  }

  OtpForm = (
    <div>
      <h3 style={{ textAlign: 'center', color: "#1890ff" }}>Enter the OTP below</h3>
      <Input size="default" onChange={(e) => this.handleOtpChange(e, 0)} style={{ width: "50px", textAlign: 'center' }} />
      <Input size="default" onChange={(e) => this.handleOtpChange(e, 1)} style={{ width: "50px", textAlign: 'center' }} />
      <Input size="default" onChange={(e) => this.handleOtpChange(e, 2)} style={{ width: "50px", textAlign: 'center' }} />
      <Input size="default" onChange={(e) => this.handleOtpChange(e, 3)} style={{ width: "50px", textAlign: 'center' }} />
      <br /><br />
      <Button className="button" block>Resend OTP</Button><br />
      <Button className="button" block onClick={this.changeNumber}>Change Phone Number</Button>
    </div >
  )

  LoginForm = (
    <div>
      <h3 style={{ textAlign: 'center', color: "#1890ff" }}>Login</h3>
      <hr />
      <Input style={{ textAlign: 'center' }} placeholder="Enter Phone Number" name="phone" onChange={this.handleChange} />
      <br /><br />
      <Button type="primary" icon="unlock" size="large" block onClick={this.sendOtp} />
    </div>
  )

  render() {
    // return this.state.otpSent ? (
    //   this.state.otpVerified ? this.UserPanel() : this.OtpForm
    // ) : this.LoginForm;
    // return this.LoginForm;
    // return this.OtpForm;
    return this.UserPanel();
  }
}
