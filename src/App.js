import React from "react";
import { render } from "react-dom";
import { Layout } from 'antd';

import Header from './components/Header/Header';
import Routes from './Routes';

import './main.css';

const App = () => {
  const { Content, Footer } = Layout;

  return (
    <div>
      <Layout className="layout">
        <Header />
        <Content style={{ minHeight: 10000 }}>

          <Routes />

        </Content>
        <Footer style={{ textAlign: 'center', background: 'white', marginTop: 20 }}>
          <h3>Vicinity Charter ©2018</h3>
        </Footer>
      </Layout>
    </div>
  )
};

render(<App />, document.getElementById("app"));