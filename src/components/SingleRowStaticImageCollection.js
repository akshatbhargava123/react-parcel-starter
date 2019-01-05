import React, { Component } from 'react';
import { Row, Col } from 'antd';

class SingleRowStaticImageCollection extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: this.props.images,
      span: Math.floor(24 / this.props.images.length)
    }
  }

  render() {
    return (
      <Row justify="center" align="middle">
        {
          this.state.images.map((image, i) => {
            return (
            <Col span={this.state.span} key={image._id}>
              <img style={{ width: '100%', height: '90%', padding: 10 }} src={image.downloadUrl} />
            </Col>
            );
          })
        }
      </Row>
    )
  }
}

export default SingleRowStaticImageCollection;