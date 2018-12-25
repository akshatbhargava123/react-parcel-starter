import React, { Component } from 'react';
import { Icon, Menu } from 'antd';

class AccountSidemenu extends Component {
  render() {
    return (
      <React.Fragment>
        <aside className="user-info-wrapper">
          <div className="user-cover" style={{ backgroundImage: 'url("/images/user-cover.jpg")' }}>
            <div className="info-label">
              <Icon type="trophy" theme="twoTone" />
              0 points
            </div>
          </div>
          <div className="user-info">
            <div className="user-avatar">
              <img src="images/male_placeholder.png" alt="User" />
            </div>
            <div className="user-data">
              <h4>Akshat Bhargava</h4>
              <span>Joined February 06, 2017</span>
            </div>
          </div>
        </aside>

        <Menu
          onClick={this.handleClick}
          style={{ width: '80%' }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >

          <Menu.Item key="orders">
            <Icon type="shopping" theme="twoTone" />
            Orders
          </Menu.Item>
          <Menu.Item key="profile">
            <Icon type="profile" theme="twoTone" />
            Profile
          </Menu.Item>
          <Menu.Item key="addresses">
            <Icon type="home" theme="twoTone" />
            Addresses
          </Menu.Item>
          <Menu.Item key="wishlist">
            <Icon type="tags" theme="twoTone" />
            Wishlist
          </Menu.Item>
          <Menu.Item key="support">
            <Icon type="customer-service" theme="twoTone" />
            Support
          </Menu.Item>
        </Menu>
      </React.Fragment>
    )
  }
}

export default AccountSidemenu;