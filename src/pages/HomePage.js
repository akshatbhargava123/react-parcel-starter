import React from 'react';
import { Row, Col } from 'antd';

import BigCarousel from '../components/BigCarousel/BigCarousel';
import ProductShowCard from '../components/ProductShowCard/ProductShowCard';
import MultipleItemCarousel from '../components/MultipleItemCarousel/MultipleItemCarousel';

export default class HomePage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <BigCarousel />

        <MultipleItemCarousel />

        <Row align="middle" dir="col" justify="space-around">
          <Col span={6}>
            <ProductShowCard />
          </Col>
          <Col span={6}>
            <ProductShowCard />
          </Col>
          <Col span={6}>
            <ProductShowCard />
          </Col>
          <Col span={6}>
            <ProductShowCard />
          </Col>
        </Row>

      </React.Fragment>
    )
  }
}
