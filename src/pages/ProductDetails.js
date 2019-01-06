import React, { Component } from 'react';
import { Row, Col, Rate, Button, Comment, Avatar, Tooltip, AutoComplete, Input, Icon } from 'antd';

import ImageGallery from './../components/ImageGallery';
import MultiSelect from './../components/MultiSelect';
import ImageSlider from './../components/ImageSlider';

import cities from './cities';

import './ProductDetails.css';

const test_images = [
  { downloadUrl: 'https://images-na.ssl-images-amazon.com/images/I/61682XpNGFL._SY879_.jpg', path: '' },
  { downloadUrl: 'https://images-na.ssl-images-amazon.com/images/I/61NU6O0qPZL._SY879_.jpg', path: '' }
]

class ProductDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: test_images,
      price: [
        500, 650, 1000
      ],
      selectedSize: 0
    }

    this.changePrice = this.changePrice.bind(this);
  }

  changePrice(i) {
    this.setState({ selectedSize: i });
  }

  static SpecificationRow({ title, value }) {
    return (
      <Row>
        <Col span={8} style={{ background: '#F3F4F5', padding: 10 }}>{title}</Col>
        <Col span={16} style={{ background: '#F3F4F5', padding: 10 }}>{value}</Col>
      </Row>
    );
  }

  static UserRating({ starRating, author, avatar, comment, time }) {
    return (
      <Comment
        author={<a>{author}</a>}
        avatar={(
          <Avatar
            src={avatar}
            alt="Han Solo"
          />
        )}
        content={(
          <div>
            <Rate defaultValue={starRating} disabled></Rate>
            <p>{comment}</p>
          </div>
        )}
        datetime={(
          <Tooltip title={time}>
            <span>{time}</span>
          </Tooltip>
        )}
      />
    )
  }

  render() {
    return (
      <div style={{ paddingTop: 40, background: 'white' }}>
        <Row>
          <Col span={12} style={{ margin: 4 }}>
            <div>
              <ImageGallery images={this.state.images} />
            </div>
          </Col>
          <Col span={8} className="product-details-content" style={{ overflowY: 'scroll', maxHeight: 700 }}>
            <h1>Apple iPhone X (Space Grey, 3GB RAM, 64GB Storage, 12 MP Dual Camera, 458 PPI Display)</h1>
            <Rate disabled allowHalf={true} defaultValue={4.5} />(4.5 stars rating)
            <br />
            <a>12 customer reviews</a>
            <h1 style={{ margin: '20px 0px 20px 0px' }}>₹ {this.state.price[this.state.selectedSize]}</h1>
            <p>
              Enjoy quick file transfers at a speed of up to 98 MB/s. Also enjoy a rewarding smartphone experience, as this memory card has been optimised to make your apps perform and respond faster. It is also built to withstand harsh conditions.
            </p>
            <h3>Size:</h3>
            <MultiSelect
              options={[
                'Small',
                'Medium',
                'Large'
              ]}
              selected={this.changePrice}
            />

            <br /><br />

            <AutoComplete
              dropdownMatchSelectWidth={false}
              style={{ width: '50%' }}
              dataSource={cities.map(c => c.n)}
              placeholder="Enter Delivery Location"
              optionLabelProp="value"
            >
              <Input suffix={<Icon type="environment" />} />
            </AutoComplete>

            <br />
            <Row type="flex" align="middle" justify="space-between" style={{ marginTop: 40 }}>
              <Col span={11}>
                <Button
                  size="large"
                  type="primary"
                  icon="schedule"
                  block
                >
                  Rent Now
                </Button>
              </Col>
              <Col span={11}>
                <Button
                  size="large"
                  type="primary"
                  icon="shopping-cart"
                  block
                >
                  Add to Cart
                </Button>
              </Col>
            </Row>

            <br /><br /><br />
            <h1>Product Description</h1>
            <p>The SanDisk Ultra 32 GB memory card enables speedy file transfers and also lets you store full HD videos, music, photos and other files without having to worry about storage space.</p>
            <p>Transferring data from your phone to the memory card or from your memory card to another device can now be done in a few minutes. This SanDisk memory card transfers data at a speed of up to 98 MB/s.</p>
            <p>The SanDisk Memory Zone App, available from the Google Play Store, facilitates easy file management. You can view, access and backup your device’s files in one location. In order to free up space on your device, you can also transfer files to your memory card.</p>
            <p>With a storage capacity of up to 32 GB, this microSDHC and microSDXC card lets you store Full HD Videos as well as music, photos and other files.</p>


            <h1>Specfications</h1>
            <ProductDetails.SpecificationRow title="Package" value='1 Memory Card, Adapter'></ProductDetails.SpecificationRow>
            <ProductDetails.SpecificationRow title="Series" value='Ultra'></ProductDetails.SpecificationRow>
            <ProductDetails.SpecificationRow title="Model Number" value='SDSQUAR-032G-GN6MA'></ProductDetails.SpecificationRow>
            <ProductDetails.SpecificationRow title="W x H x D" value='14.99 mm x 10.92 mm'></ProductDetails.SpecificationRow>
            <ProductDetails.SpecificationRow title="Weight" value='4.54 g'></ProductDetails.SpecificationRow>

          </Col>

        </Row>

        <Row>
          <Col span={2}></Col>
          <Col span={16}>
            <h1>Ratings and Reviews</h1>

            <ProductDetails.UserRating
              starRating={2.5}
              author="Akshat Bhargava"
              avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              comment="Value for money good choice for this price range with adaptor."
              time="5 minutes from now"
            />

            <ProductDetails.UserRating
              starRating={4.5}
              author="Sakshi Srivastava"
              avatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              comment="So High speed copy and paste.i like this. Price is lass than market price.I Happy to this product.100% original product."
              time="10 minutes from now"
            />
          </Col>
        </Row>
        
        <br /><br /><br />
        <Row style={{ marginBottom: 400 }}>
          <Col span={2}></Col>
          <Col span={20}>
            <h1>More Products like this</h1>
            <ImageSlider images={[
              { downloadUrl: '/images/a.png', _id: '1' },
              { downloadUrl: '/images/b.jpg', _id: '2' },
              { downloadUrl: '/images/c.jpg', _id: '3' },
              { downloadUrl: '/images/d.jpg', _id: '4' },
              { downloadUrl: '/images/a.png', _id: '5' },
            ]} />
          </Col>
        </Row>
      </div>
    )
  }
}

export default ProductDetails;