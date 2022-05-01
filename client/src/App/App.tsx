import { Footer } from 'components/Footer.component';
import { Header } from 'components/Header.component';
import { Home } from 'pages/Home.page';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
