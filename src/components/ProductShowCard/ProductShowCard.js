import React, { Component } from 'react'

import { Card, Icon, Avatar } from 'antd';

const { Meta } = Card;

class ProductShowCard extends Component {
  render() {
    return (
      <div>
        <Card
          style={{ width: 300 }}
          cover={<img alt="example" src="https://xeroshoes.com/wp-content/uploads/2017/03/Hana-Black-3-4.jpg" />}
          actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
        >
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title="PUMA X250"
            description="250$"
          />
        </Card>
      </div>
    )
  }
}

export default ProductShowCard;