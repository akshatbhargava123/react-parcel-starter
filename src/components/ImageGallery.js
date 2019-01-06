import React, { Component } from 'react';
import { Row, Col, Popover } from 'antd';
import ReactImageMagnify from 'react-image-magnify';
import './ImageGallery.css';

class ImageGallery extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focusedImage: 0,
      images: this.props.images
    }
  }

  changeFocused(i) {
    this.setState({ focusedImage: i });
  }

  render() {
    return (
      <Row justify="space-between">
        <Col span={3}>
        {
          this.state.images.map((img, i) => {
            return (
              <div key={i}>
                <img src={img.downloadUrl} className="side-image" onMouseOver={() => this.changeFocused(i)} />
              </div>
            );
          })
        }
        </Col>
        <Col span={1} />
        <Col span={20}>
          <ReactImageMagnify
            enlargedImageContainerStyle={{ zIndex: 500 }}
            smallImage={{
              alt: 'Phone',
              src: this.state.images[this.state.focusedImage].downloadUrl,
              height: window.outerHeight * 0.7,
              width: 480 * 0.72
            }}
            largeImage= {{
              src: this.state.images[this.state.focusedImage].downloadUrl,
              isFluidWidth: true,
              width: 600,
              height: 1000
            }}
          />
          {/* <img src={this.state.images[this.state.focusedImage].downloadUrl} style={{ maxHeight: window.outerHeight * 0.7 }} /> */}
        </Col>
      </Row>
    );
  }

}

export default ImageGallery;