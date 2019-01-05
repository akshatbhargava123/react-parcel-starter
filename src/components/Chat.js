import React, { Component } from 'react';
import { Card, Input, Button } from 'antd';
import jwt_decode from 'jwt-decode';
import * as firebase from 'firebase';

import { firebaseConfig } from './../App.constants';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      chatId: '',
      message: '',
      waitingForExecutive: true,
      chat: null,
      messages: [],
      sendingMessage: false
    };

    this.unsubscribe = null;

    this.sendMessage = this.sendMessage.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.subscribeToMessages = this.subscribeToMessages.bind(this);
    this.formatAMPM = this.formatAMPM.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem('vc_token');
    let user = null;
    if (token) user = jwt_decode(token);

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    this.firestore = firebase.firestore();
    this.firestore.settings({ timestampsInSnapshots: true });

    const chatId = new Date().getTime() + Math.floor(Math.random() * 15);

    const chatData = {
      closed: false,
      newMessageArrived: true,
      startTimestamp: new Date().getTime(),
      isGuestChat: user == null,
      id: chatId,
      user
    };

    this.firestore
      .collection('chats')
      .doc(String(chatId))
      .set(chatData)
      .then(response => {
        this.unsubscribe = this.firestore.doc(`chats/${chatId}`)
          .onSnapshot((snapshot) => {
            let data = snapshot.data(), waitingForExecutive = true;
            if (data.executiveName) waitingForExecutive = false;
            this.setState({
              chat: snapshot.data(),
              chatId,
              waitingForExecutive
            }, this.subscribeToMessages);
          });
    }).catch(error => {
      console.log(error);
    })
  }

  subscribeToMessages() {
    if (this.msgSub) this.msgSub();

    this.msgSub = this.firestore
      .collection('messages')
      .where('id', '==', this.state.chatId)
      .onSnapshot(snapshot => {
        const messages = snapshot.docs.map(doc => doc.data());
        messages.sort((m1, m2) => m1.timestamp > m2.timestamp ? 1 : -1);
        this.setState({ messages });
      });
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  handleMessageChange(e) {
    this.setState({ message: e.target.value });
  }

  sendMessage(e) {
    if (e.keyCode != 13) return;
    this.setState({ sendingMessage: true });
    const messageObj = {
      id: this.state.chatId,
      text: this.state.message,
      timestamp: new Date().getTime(),
      from: 'customer'
    };
    this.firestore
      .collection('messages')
      .add(messageObj)
      .then(() => this.setState({ sendingMessage: false, message: '' }));
  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  render() {
    const executiveName = this.state.chat ? this.state.chat.executiveName : null;
    const header = (
      <h3 style={{ margin: 0, padding: 0 }}>
        Chat{executiveName ? `ting with ${executiveName}` : ''}
      </h3>
    );
    return (
      <div>
        <Card title={header} style={{ background: '#F0F2F5' }}>
          <div style={{ overflowY: 'scroll', maxHeight: 350, minHeight: 350 }}>
            <p>Explain your problem in detail, we generally reply within minutes. Close window to close the chat.</p>
            {
              this.state.messages.length ?
              <div>
                {this.state.messages.map((message, i) => (
                  <Card
                    style={{ margin: 0, padding: 0, textAlign: message.from == 'customer' ? 'end' : 'start' }}
                    key={i}
                    type="inner"
                  >
                    <h4>{message.text}</h4>
                    <p style={{ margin: 0 }}>{this.formatAMPM(new Date(Number(message.timestamp)))}</p>
                  </Card>
                ))}
              </div> :
              <h4>Nothing yet. Send a message.</h4>
            }
            {this.state.waitingForExecutive ? 'Waiting for Executive...' : ''}
          </div>
          <div style={{ marginTop: 20 }}>
            <Input
              size="large"
              value={this.state.message}
              onChange={this.handleMessageChange}
              onKeyDown={this.sendMessage}
              suffix={<Button type="primary" loading={this.state.sendingMessage} shape="circle" icon="right" onClick={this.sendMessage}></Button>}
              placeholder="Write your message.."
              disabled={this.state.sendingMessage}
            />
          </div>
        </Card>
      </div>
    )
  }
}

export default Chat;