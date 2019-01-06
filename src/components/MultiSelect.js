import React, { Component } from 'react';
import { Button } from 'antd';

class MultiSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      options: this.props.options
    }
  }

  changeSelected(i) {
    this.setState({ selected: i });
    if (this.props.selected) this.props.selected(i);
  }

  render() {
    return (
      <span>
        {
          this.state.options.map((o, i) => {
            return (
              <Button
                key={i}
                type={this.state.selected == i ? 'primary' : 'ghost'}
                style={{ margin: 4 }}
                onClick={() => this.changeSelected(i)}
              >
                {o}
              </Button>
            );
          })
        }
      </span>
    )
  }
}

export default MultiSelect;