import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home.page';
import { Layout } from 'hoc/Layout/Layout.hoc';
import { Authentication } from 'pages/Authentication.page';
import './App.css';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { isUserAuth } from 'store/reducers/users.reducer';
import { Loader } from 'components/Loader.component';
import Dashboard from 'pages/Dashboard.page';
import AuthGard from 'hoc/Auth.gard';

const App: React.FC = () => {
  const [formType, setFormType] = useState(true);

  const dispatch = useAppDispatch();

  const toggleFormType = () => {
    setFormType((prev) => !prev);
  };

  useEffect(() => {
    dispatch(isUserAuth());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route
          path={'/auth'}
          element={
            <Authentication
              formType={formType}
              toggleFormType={toggleFormType}
            />
          }
        />
        <Route
          path="/dashboard"
          element={<AuthGard ComposedComponent={Dashboard} />}
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </Layout>
  );
};

export default App;
