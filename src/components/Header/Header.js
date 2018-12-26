import React, { Component } from 'react'
import { Layout, Menu, Icon, Row, Col, Button, Input, Popover } from 'antd';
import './Header.css';

import SideMenu from '../SideMenu/SideMenu';
import UserToolbarDropdrop from '../UserToolbarDropdrop/UserToolbarDropdrop';

const styles = {
  layoutHeader: {
    padding: '0px 0px',
    backgroundColor: 'white'
  },
  menuHorizontal: {
    borderBottom: 'none'
  }
};

class Header extends Component {

  constructor(props) {
    super(props);
    this.searchInput = React.createRef();
    this.state = {
      sideMenuOpen: false,
      searchOpen: false
    }

    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleSearch = this.toggleSearch.bind(this);
  }

  toggleMenu() {
    this.setState({ sideMenuOpen: !this.state.sideMenuOpen });
  }

  toggleSearch() {
    this.setState({ searchOpen: !this.state.searchOpen }, () => {
      if (this.searchInput.current) this.searchInput.current.input.focus();
    });
  }

  render() {
    const { Header } = Layout;
    const SubMenu = Menu.SubMenu;
    const MenuItemGroup = Menu.ItemGroup;
    const Search = Input.Search;

    return (
      <React.Fragment>
        <SideMenu open={this.state.sideMenuOpen} onClose={this.toggleMenu} />
        <Header style={styles.layoutHeader}>
          <Row justify='start' type='flex' align="middle">
            <Col sm={2} xs={4}>
              <Icon
                type={'menu-fold'}
                className="hover-trigger"
                onClick={this.toggleMenu}
              />
            </Col>
            <Col sm={4} xs={8}>
              <img src="https://static1.squarespace.com/static/58fe59981b10e39e20b08029/t/598a5487f9a61e39d18cd0c5/favicon.ico" style={{ width: 'inherit' }} />
            </Col>
            <Col sm={12} xs={16}>
              {
                this.state.searchOpen ?
                  <Input
                    placeholder="Search for products, brand and more"
                    prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    size="large"
                    style={{ width: '80%' }}
                    ref={this.searchInput}
                  /> :

                  <Row justify='space-around' type='flex' gutter={8}>
                    <Menu
                      selectedKeys={['mail']}
                      mode="horizontal"
                      style={styles.menuHorizontal}
                    >
                      <SubMenu title={<span className="submenu-title-wrapper">Shop Categories</span>}>
                        <SubMenu title="Mobile, Computers" style={{ width: 280 }}>
                          <Menu.Item key="cat1:sub1">All Mobile Phones</Menu.Item>
                          <Menu.Item key="cat1:sub2">All Mobile Accessories</Menu.Item>
                          <Menu.Item key="cat1:sub3">Cases and Covers</Menu.Item>
                          <Menu.Item key="cat1:sub4">Power Banks</Menu.Item>
                          <Menu.Item key="cat1:sub5">Graphic Cards</Menu.Item>
                        </SubMenu>
                        <SubMenu title="TV, Appliances, Electronics" style={{ width: 280 }}>
                          <Menu.Item key="cat2:sub1">Televisions</Menu.Item>
                          <Menu.Item key="cat2:sub2">Headphones</Menu.Item>
                          <Menu.Item key="cat2:sub3">Speakers</Menu.Item>
                          <Menu.Item key="cat2:sub4">Cameras</Menu.Item>
                          <Menu.Item key="cat2:sub5">DSLR Cameras</Menu.Item>
                        </SubMenu>
                        <SubMenu title="Men's Fashion" style={{ width: 280 }}>
                          <Menu.Item key="cat3:sub1">Clothing</Menu.Item>
                          <Menu.Item key="cat3:sub2">T-Shirts</Menu.Item>
                          <Menu.Item key="cat3:sub3">Inner Wears</Menu.Item>
                          <Menu.Item key="cat3:sub4">Shirts</Menu.Item>
                          <Menu.Item key="cat3:sub5">Jeans</Menu.Item>
                          <Menu.Item key="cat3:sub6">Shoes</Menu.Item>
                          <Menu.Item key="cat3:sub7">Sunglasses</Menu.Item>
                          <Menu.Item key="cat3:sub8">Watches</Menu.Item>
                        </SubMenu>
                      </SubMenu>
                      <Menu.Item key="offers">
                        Offers
                      </Menu.Item>
                      <SubMenu title={<span className="submenu-title-wrapper">Account</span>} placement="bottomCenter">
                        <Menu.Item key="account:1">Profile</Menu.Item>
                        <Menu.Item key="account:2">Wallet</Menu.Item>
                        <Menu.Item key="account:3">Wishlist</Menu.Item>
                        <Menu.Item key="account:4">Orders</Menu.Item>
                        <Menu.Item key="account:5">Tickets</Menu.Item>
                      </SubMenu>
                      <Menu.Item key="blog">
                        Blog
                      </Menu.Item>
                      <Menu.Item key="help">
                        Help
                      </Menu.Item>
                    </Menu>
                  </Row>
              }
            </Col>
            <Col sm={1}>
              <Button shape="circle" icon={this.state.searchOpen ? 'close' : 'search'} size="large" onClick={this.toggleSearch} />
            </Col>
            <Col sm={1}>
              <Popover content={<UserToolbarDropdrop />} trigger="click" style={{ width: 200 }}>
                <Button shape="circle" icon="user" size="large" />
              </Popover>
            </Col>
            <Col sm={1}>
              <Button shape="circle" icon="heart" size="large" />
            </Col>
            <Col sm={1}>
              <Button shape="circle" icon="shopping-cart" size="large" />
            </Col>
            <Col sm={2}></Col>
          </Row>
        </Header>
      </React.Fragment>
    );
  }
};

export default Header;