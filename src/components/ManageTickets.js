import React, { Component } from 'react';
import { Button, Table, Modal, Input, message } from 'antd';
import jwt_decode from 'jwt-decode';
import { API_BASE_URL } from './../App.constants';

const columns = [{
  title: 'Created',
  dataIndex: 'createdAt',
  key: 'createdAt'
}, {
  title: 'Subject',
  dataIndex: 'subject',
  key: 'subject',
}, {
  title: 'Description',
  dataIndex: 'description',
  key: 'description',
}, {
  title: 'Action',
  key: 'action',
  render: (row) => (
    <span>
      <Button size="small" type="danger" disabled={row.status == 'closed'}>
        {row.status == 'closed' ? 'Closed' : 'Close'}
      </Button>
    </span>
  ),
}];

const data = [
  {
    createdAt: '',
    key: '1',
    subject: 'Subject is a subject 1',
    description: 'Description 1',
    status: 'ongoing'
  },
  {
    createdAt: '',
    key: '2',
    subject: 'Subject is a subject 2',
    description: 'Description 2',
    status: 'closed'
  },
  {
    createdAt: '',
    key: '3',
    subject: 'Subject is a subject 3',
    description: 'Description 3',
    status: 'ongoing'
  },
];

class ManageTickets extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      sendingTicket: false,
      ticket: {},
      isLoggedIn: false
    }

    this.createTicket = this.createTicket.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.token = localStorage.getItem('vc_token');
    if (this.token) {
      this.user = jwt_decode(this.token);
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }
  
  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  handleInputChange(e) {
    this.setState({ ticket: { ...this.state.ticket, [e.target.name]: e.target.value } });
  }

  createTicket() {
    
    this.setState({ sendingTicket: true });

    fetch(
      API_BASE_URL + '/support/ticket', {
        method: 'POST',
        body: JSON.stringify({
          subject: this.state.ticket.subject,
          description: this.state.ticket.description,
          status: 'ongoing',
          user: this.user
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('vc_token')
        }
      }
    ).then((res) => res.json())
    .then(res => {
      if (res.error) {
        message.error('Some problem occured while generating your ticket, please try again later!');
      } else {
        message.success('Ticket successfully opened, you will hear out from us via mail in next 48 hours!');
        this.setState({ sendingTicket: false, ticket: {}, isModalOpen: false });
      }
    });
  }

  isNotLoggedInView = () => (
    <h3 style={{ marginTop: 200 }}>You need to be logged in to continue...</h3>
  )
  
  render() {
    if (!this.state.isLoggedIn) return this.isNotLoggedInView();
    return (
      <div>
        <h2>Your Active Tickets</h2>
        <Table
          columns={columns}
          dataSource={data}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.description}</p>}
        />
        <Modal
          title="Open Support Ticket"
          style={{ top: 20 }}
          visible={this.state.isModalOpen}
          okText="Create Ticket"
          confirmLoading={this.state.sendingTicket}
          onOk={this.createTicket}
          onCancel={this.toggleModal}
        >
          <Input
            placeholder="Subject"
            size="large"
            name="subject"
            value={this.state.ticket.subject}
            onChange={this.handleInputChange}
            style={{ marginBottom: 20 }}
          />
          <Input.TextArea
            placeholder="Describe your issue"
            size="small"
            rows={5}
            name="description"
            value={this.state.ticket.description}
            onChange={this.handleInputChange}
          />
        </Modal>
 
        <Button type="default" onClick={this.toggleModal}>
          Create New Ticket
        </Button>
      </div>
    )
  }
}

export default ManageTickets;