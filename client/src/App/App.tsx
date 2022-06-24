import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from 'pages/Home.page';
import { Layout } from 'hoc/Layout/Layout.hoc';
import { Authentication } from 'pages/Authentication.page';
import './App.css';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { isUserAuth } from 'store/reducers/users.reducer';
import { Loader } from 'components/Loader.component';

const App: React.FC = () => {
  const [formType, setFormType] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.users);

  const toggleFormType = () => {
    setFormType((prev) => !prev);
  };

  useEffect(() => {
    dispatch(isUserAuth());
  }, [dispatch]);

  useEffect(() => {
    if (users.isAuth) setIsLoading(false);
  }, [users]);

  return (
    <Layout>
      {isLoading ? (
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
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      )}
    </Layout>
  );
};

export default App;
