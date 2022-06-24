import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
  title: string;
}

interface CustomLinks {
  name: string;
  linkTo: string;
}

const links: CustomLinks[] = [
  { name: 'My Account', linkTo: '/dashboar' },
  { name: 'My Profile', linkTo: '/dashboar/user_profile' },
  { name: 'My Cart', linkTo: '/dashboar/user_cart' },
];

const admin: CustomLinks[] = [
  { name: 'Manage Site', linkTo: '/dashboar/admin/manage_site' },
  { name: 'Add Products', linkTo: '/dashboar/admin/add_product' },
  { name: 'Manage categories', linkTo: '/dashboar/admin/manage_categories' },
];

const DashboardHoc: React.FC<Props> = ({ children, title }) => {
  const generateLinks = (links: CustomLinks[]) =>
    links.map((item, idx) => (
      <Link to={item.linkTo} key={`${item.name}${idx}`}>
        {item.name}
      </Link>
    ));

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My Account</h2>
          <div className="links">{generateLinks(links)}</div>
          <h2>Admin</h2>
          <div className="links">{generateLinks(admin)}</div>
        </div>
        <div className="user_right">
          <div className="dashbord_title">
            <h1> {title}</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardHoc;
