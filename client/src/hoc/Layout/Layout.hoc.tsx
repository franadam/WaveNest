import React from 'react';
import { Footer } from 'components/Footer.component';
import { Header } from 'components/Header.component';
import classes from './Layout.module.css';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.children}>{children}</div>
      <Footer />
    </div>
  );
};
