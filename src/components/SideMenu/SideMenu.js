import React, { Component } from 'react'

import { Drawer, Menu } from 'antd';

const styles = {
  sideBarMenu: {
    border: 'none'
  }
};

class SideMenu extends Component {
  render() {
    return (
      <Drawer
        visible={this.props.open}
        onClose={this.props.onClose}
        placement="left"
        closable={true}
        maskClosable={true}
        width={330}
        title="Shop Categories"
      >
        <Menu mode='vertical-right' style={styles.sideBarMenu}>
          <Menu.Item>MEN'S SHOES</Menu.Item>
          <Menu.Item>WOMEN'S SHOES</Menu.Item>
          <Menu.Item>MEN'S CLOTHING</Menu.Item>
          <Menu.Item>WOMEN'S CLOTHING</Menu.Item>
          <Menu.Item>KID'S CLOTHING</Menu.Item>
          <Menu.Item>BAGS</Menu.Item>
          <Menu.Item>ACCESSORIES</Menu.Item>
        </Menu>
      </Drawer>
    )
  }
}

export default SideMenu;