import React, { Component } from 'react'
import './ImageSlider.css';

/**
 *
 */
class ImageSlider extends Component {

  constructor(props) {
    super(props);
    this.imageRefs = [];
    this.state = {
      images: this.props.images,
      totalWidth: 0,
    };

    this.setRef = this.setRef.bind(this);
    this.calculateAndUpdateWidth = this.calculateAndUpdateWidth.bind(this);
  }

  setRef(ref) {
    this.imageRefs.push(ref);
    if (this.imageRefs.length == this.props.images.length) {
      this.calculateAndUpdateWidth();
    }
  }

  calculateAndUpdateWidth() {
    let totalWidth = 0;
    this.imageRefs.forEach(r => {
      totalWidth += r.naturalWidth;
    })
    this.setState({ totalWidth }, () => console.log(this.state.totalWidth));
  }

  render() {
    return (
      <div style={styles.root}>
        <div style={{ width: this.state.totalWidth }}>
          {
            this.props.images.map((d, i) => {
              return (
                <img src={d.downloadUrl} key={d._id} className="image-slider-img" style={styles.image} ref={this.setRef} />
              )
            })
          }
        </div>
      </div>
    )
  }

}

const styles = {
  root: {
    overflow: 'scroll',
    width: '0.9 vh',
    height: 280,
    margin: '10px 0px 10px 0px'
  },
  image: {
    padding: '0px 10px 0px 10px',
    cursor: 'pointer',
    maxHeight: 260
  }
}

export default ImageSlider;