import React, { Component } from 'react';
import { Card, Button, Table, Divider, Tag } from 'antd';
import { Route, Switch } from 'react-router-dom';

import ManageTickets from '../components/ManageTickets';
import Chat from '../components/Chat';

class Support extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chatWindow: false
    };
    this.openSection = this.openSection.bind(this);
  }

  openSection(section) {
    this.props.history.push(`/account/support/${section}`);
  }

  SupportSection = () => {
    return (
      <div>
        <h2>Facing Problems?</h2>
        <img src="/images/support.png" style={{ width: 200, margin: 20 }} />
        <div style={{ marginTop: 30 }}>
          <Button block type="primary" onClick={() => this.openSection('manage-tickets')}>
            Manage Support Ticket(s)
          </Button>
          <h3 style={{ marginTop: 10 }}>OR</h3>
          <Button block type="primary" onClick={() => this.openSection('chat')}>
            Chat with Us
          </Button>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Card style={{ width: '100%', minHeight: 500, textAlign: 'center' }}>

        <Switch>
          <Route path="/account/support" exact component={this.SupportSection} />
          <Route path="/account/support/chat" exact component={Chat} />
          <Route path='/account/support/manage-tickets' exact component={ManageTickets} />
        </Switch>

      </Card>
    )
  }
}

export default Support;