import React from 'react';
import { Row, Col } from 'antd';
import { API_BASE_URL } from './../App.constants';

import ImageSlider from '../components/ImageSlider';
import BigCarousel from '../components/BigCarousel/BigCarousel';
import ProductShowCard from '../components/ProductShowCard/ProductShowCard';
import MultipleItemCarousel from '../components/MultipleItemCarousel/MultipleItemCarousel';
import SingleRowStaticImageCollection from '../components/SingleRowStaticImageCollection';

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topCarousel: { images: [] },
      carousels: []
    };
  };

  componentDidMount() {
    fetch(
      `${API_BASE_URL}/carousel`, {
        method: 'GET',
        headers: { Authorization: localStorage.getItem('vc_token') }
      }
    ).then(res => res.json())
      .then(res => {
        if (!res.error) {
          const { carousels } = res;
          this.setState({
            topCarousel: carousels.splice(0, 1)[0],
            carousels
          }, () => console.log(this.state.carousels));
        }
      });
  }

  render() {
    return (
      <React.Fragment>
        <BigCarousel images={this.state.topCarousel.images} />

        {
          this.state.carousels.map((c, i) => {

            switch (c.Ctype) {
              case 'image-slider':
                return (
                  <div style={{ margin: 10, background: 'white' }} key={c._id}>
                    <h1 style={{ margin: 20, paddingTop: 20 }}>{c.title}</h1>
                    <ImageSlider images={c.images} />
                  </div>
                );
              case 'static-multi-image':
                return <SingleRowStaticImageCollection key={c._id} images={c.images} />;
              case '':
                return <div key={c._id}></div>
            }
          })
        }

        {/* <MultipleItemCarousel /> */}

        {/* <ImageSlider images={images_123} /> */}

        {/* <SingleRowStaticImageCollection images={dummy_data_2} /> */}

        {/* <Row align="middle" dir="col" justify="space-around">
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
        </Row> */}

        {/* <SingleRowStaticImageCollection images={single_image} /> */}

        {/* <SingleRowStaticImageCollection images={dummy_data} /> */}

      </React.Fragment>
    )
  }
}
