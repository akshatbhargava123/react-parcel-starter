import React, { Component } from 'react';
import { Button, Carousel } from 'antd';

const styles = {
  leftBtn: { position: 'absolute', marginLeft: 20, zIndex: 1, marginTop: 180 },
  rightBtn: { position: 'absolute', zIndex: 1,  }
};

class MultipleItemCarousel extends Component {

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
          <div style={{ width: '30%' }}><img src="images/1.jpg" style={{ height: goldenRatioHeight }} /></div>
          <div style={{ width: '30%' }}><img src="images/2.jpg" style={{ height: goldenRatioHeight }} /></div>
          <div style={{ width: '30%' }}><img src="images/3.jpg" style={{ height: goldenRatioHeight }} /></div>
          <div style={{ width: '30%' }}><img src="images/4.jpg" style={{ height: goldenRatioHeight }} /></div>
        </Carousel>
        <div style={{ textAlign: 'right', marginRight: 60 }}>
          <Button type="default" shape="circle" onClick={() => this.slide(1)} icon="right" size='large' style={styles.rightBtn} />
        </div>
      </div>
    )
  }
}

export default MultipleItemCarousel;