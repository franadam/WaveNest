import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home.page';
import { Layout } from 'hoc/Layout/Layout.hoc';
import './App.css';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  );
};

export default App;
