import React, { Component } from 'react';
import { Button, Carousel, Card, Icon, Row, Col } from 'antd';

const styles = {
  leftBtn: { position: 'absolute', marginLeft: 20, zIndex: 1, marginTop: 180 },
  rightBtn: { position: 'absolute', zIndex: 1, }
};

const ItemCard = ({ cardCoverImg, title, price, categories }) => {
  return (
    <Card
      hoverable
      style={{ width: 300, textAlign: 'center', margin: 50 }}
      cover={<img alt="example" src={cardCoverImg} />}
      actions={[<Icon type="eye" theme="twoTone" />, <Icon type="plus-circle" theme="twoTone" />]}
    >
      <Card.Meta
        title={title}
        description={<h4 style={{ color: '#388e3c' }}>{price}</h4>}
      />
      <p>{categories}</p>
    </Card>
  )
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

    const carouselProps = {
      draggable: true,
      slidesToShow: 4,
      infinite: true,
    }

    return (
      <div>
        <div style={{ position: 'absolute', marginTop: '14%', marginLeft: '2%', zIndex: 2 }}>
          <Button type="default" shape="circle" icon="left" size='large' onClick={() => this.slide(-1)} />
        </div>
        <div style={{ position: 'absolute', marginTop: '14%', marginLeft: '96%', zIndex: 2 }}>
          <Button type="default" shape="circle" icon="right" size='large' onClick={() => this.slide(1)} />
        </div>
        <Carousel
          ref={r => this.slider = r}
          {...carouselProps}
        >
          <div>
            <ItemCard cardCoverImg="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" title="PUMA 500X" price="₹250" categories="Clothing, Footwear" />
          </div>
          <div>
            <ItemCard cardCoverImg="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" title="PUMA 500X" price="₹250" categories="Clothing, Footwear" />
          </div>
          <div>
            <ItemCard cardCoverImg="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" title="PUMA 500X" price="₹250" categories="Clothing, Footwear" />
          </div>
          <div>
            <ItemCard cardCoverImg="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" title="PUMA 500X" price="₹250" categories="Clothing, Footwear" />
          </div>
          <div>
            <ItemCard cardCoverImg="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" title="PUMA 500X" price="₹250" categories="Clothing, Footwear" />
          </div>
          <div>
            <ItemCard cardCoverImg="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" title="PUMA 500X" price="₹250" categories="Clothing, Footwear" />
          </div>
          <div>
            <ItemCard cardCoverImg="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" title="PUMA 500X" price="₹250" categories="Clothing, Footwear" />
          </div>
          <div>
            <ItemCard cardCoverImg="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" title="PUMA 500X" price="₹250" categories="Clothing, Footwear" />
          </div>
        </Carousel>
      </div>
    )
  }
}

export default MultipleItemCarousel;