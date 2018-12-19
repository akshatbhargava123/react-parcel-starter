import React from "react";
import { render } from "react-dom";

import { Layout, Breadcrumb  } from 'antd';

import Header from './components/Header/Header';
import BigCarousel from './components/BigCarousel/BigCarousel';
import ProductShowCard from './components/ProductShowCard/ProductShowCard';
import MultipleItemCarousel from './components/MultipleItemCarousel/MultipleItemCarousel';

import './main.css';

const App = () => {
  const { Content, Footer } = Layout;

  return (
    <div>
      <Layout className="layout">
        <Header />
        <Content>
          <BigCarousel />

          <ProductShowCard />

          <MultipleItemCarousel />

          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </div>
  )
};

render(<App />, document.getElementById("app"));