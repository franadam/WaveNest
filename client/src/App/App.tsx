import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home.page';
import { Layout } from 'hoc/Layout/Layout.hoc';
import './App.css';
import { useAppDispatch } from 'hooks/use-type-selector.hook';
import { isUserAuth } from 'store/reducers/auth.reducer';
import { Dashboard } from 'pages/Dashboard/Dashboard.page';
import { AuthGard } from 'hoc/Auth.gard';
import { UserInfo } from 'pages/Dashboard/UserInfo.page';
import { Register } from 'pages/Register.page';
import { Login } from 'pages/Login.page';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(isUserAuth());
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route
          path="/dashboard/user_profile"
          element={<AuthGard ComposedComponent={UserInfo} />}
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
