import React, { Component } from 'react';
import { Button, Carousel } from 'antd';

import image1 from '../../assets/images/1.jpg';
import image2 from '../../assets/images/2.jpg';
import image3 from '../../assets/images/3.jpg';
import image4 from '../../assets/images/4.jpg';

const styles = {
  leftBtn: { position: 'absolute', top: window.innerHeight * 0.35, marginLeft: 20, zIndex: 1 },
  rightBtn: { position: 'absolute', top: window.innerHeight * 0.35, zIndex: 2 }
};

class BigCarousel extends Component {

  slider = null;

  constructor(props) {
    super(props);
  }

  slide = dir => {
    dir == 1 ? this.slider.next() : this.slider.prev();
  }

  render() {
    const goldenRatioHeight = window.innerHeight * 0.6;
    return (
      <div>
        <div style={{ textAlign: 'left' }}>
          <Button type="default" shape="circle" onClick={() => this.slide(-1)} icon="left" size='large' style={styles.leftBtn} />
        </div>
        <Carousel ref={r => this.slider = r} draggable={true}>
          <div><img src={'https://rukminim1.flixcart.com/flap/844/140/image/cd7e461c8d5d918f.jpg?q=50'} style={{ width: '100%', height: goldenRatioHeight }} /></div>
          <div><img src={image2} style={{ width: '100%', height: goldenRatioHeight }} /></div>
          <div><img src={image3} style={{ width: '100%', height: goldenRatioHeight }} /></div>
          <div><img src={image4} style={{ width: '100%', height: goldenRatioHeight }} /></div>
        </Carousel>
        <div style={{ textAlign: 'right', marginRight: 60 }}>
          <Button type="default" shape="circle" onClick={() => this.slide(1)} icon="right" size='large' style={styles.rightBtn} />
        </div>
      </div>
    )
  }
};

export default BigCarousel;