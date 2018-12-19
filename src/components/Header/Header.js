import React, { Component } from 'react'
import { Layout, Menu, Icon, Row, Col } from 'antd';

import SideMenu from '../SideMenu/SideMenu';

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
    this.state = {
      sideMenuOpen: false
    }
  }

  toggleMenu = () => {
    this.setState({ sideMenuOpen: !this.state.sideMenuOpen });
  }
  
  render() {
    const { Header } = Layout;
    const SubMenu = Menu.SubMenu;
    const MenuItemGroup = Menu.ItemGroup;

    return (
      <React.Fragment>
        <SideMenu open={this.state.sideMenuOpen} onClose={this.toggleMenu} />
        <Header style={styles.layoutHeader}>
          <Row justify='start' type='flex' align="middle">
            <Col sm={2}>
              <Icon
                type={'menu-fold'}
                className="hover-trigger"
                onClick={this.toggleMenu}
              />
            </Col>
            <Col sm={4}></Col>
            <Col sm={12}>
              <Row justify='space-around' type='flex' gutter={16}>
                <Menu
                  selectedKeys={['mail']}
                  mode="horizontal"
                  style={styles.menuHorizontal}
                >
                  <Menu.Item key="mail">
                    HOME
                </Menu.Item>
                  <Menu.Item key="app">
                    SHOP
                </Menu.Item>
                  <SubMenu title={<span className="submenu-title-wrapper">ACCOUNT</span>}>
                    <MenuItemGroup title="Item 1">
                      <Menu.Item key="setting:1">Option 1</Menu.Item>
                      <Menu.Item key="setting:2">Option 2</Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="Item 2">
                      <Menu.Item key="setting:3">Option 3</Menu.Item>
                      <Menu.Item key="setting:4">Option 4</Menu.Item>
                    </MenuItemGroup>
                  </SubMenu>
                  <Menu.Item key="alipay">
                    PAGES
                </Menu.Item>
                </Menu>
              </Row>
            </Col>
          </Row>
        </Header>
      </React.Fragment>
    );
  }
};

export default Header;