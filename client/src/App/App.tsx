import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'hoc/Layout/Layout.hoc';
import './App.css';
import { useAppDispatch } from 'hooks/use-type-selector.hook';
import { isUserAuth } from 'store/reducers/auth.reducer';
import { Dashboard } from 'pages/Dashboard/Dashboard.page';
import { AuthGard } from 'hoc/Auth.gard';
import { UserInfo } from 'pages/Dashboard/User/UserInfo.page';
import { AdminProducts } from 'pages/Dashboard/Products/AdminProducts.page';
import { Home } from 'pages/Home.page';
import { Register } from 'pages/Register.page';
import { Login } from 'pages/Login.page';
import { AddProduct } from 'pages/Dashboard/Products/AddProduct.page';
import { EditProduct } from 'pages/Dashboard/Products/EditProduct.page';
import { Shop } from 'pages/Shop.page';
import { Product } from 'pages/Product.page';
import { Verification } from 'pages/Verification.page';
import { UserCart } from 'pages/Dashboard/User/UserCart.page';
import { ManageSite } from 'pages/Dashboard/Products/ManageSite.page';

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
        <Route path="/shop" element={<Shop />} />
        <Route path="/verification" element={<Verification />} />
        <Route path="/guitar_detail/:id" element={<Product />} />
        <Route
          path="/dashboard/admin/manage_products"
          element={<AuthGard ComposedComponent={AdminProducts} />}
        />
        <Route
          path="/dashboard/admin/add_product"
          element={<AuthGard ComposedComponent={AddProduct} />}
        />
        <Route
          path="/dashboard/admin/edit_product/:id"
          element={<AuthGard ComposedComponent={EditProduct} />}
        />
        <Route
          path="/dashboard/user_profile"
          element={<AuthGard ComposedComponent={UserInfo} />}
        />
        <Route
          path="/dashboard/user_cart"
          element={<AuthGard ComposedComponent={UserCart} />}
        />
        <Route
          path="/dashboard/admin/manage_site"
          element={<AuthGard ComposedComponent={ManageSite} />}
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
