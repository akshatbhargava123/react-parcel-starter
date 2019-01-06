import React from "react";
import { render } from "react-dom";
import { Layout } from 'antd';

import Header from './components/Header/Header';
import Footer from './components/Footer';
import Routes from './Routes';

import './main.css';

const App = () => {
  const { Content } = Layout;

  return (
    <div>
      <Layout className="layout">
        <Header />
        <Content>

          <Routes />

        </Content>
        <Footer />
      </Layout>
    </div>
  )
};

render(<App />, document.getElementById("app"));