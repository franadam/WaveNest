import { useAppSelector } from 'hooks/use-type-selector.hook';
import { UserRole } from 'interfaces/Users.interface';
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
  { name: 'My Account', linkTo: '/dashboard' },
  { name: 'My Profile', linkTo: '/dashboard/user_profile' },
  { name: 'My Cart', linkTo: '/dashboard/user_cart' },
];

const admin: CustomLinks[] = [
  { name: 'Manage Site', linkTo: '/dashboard/admin/manage_site' },
  { name: 'Add Products', linkTo: '/dashboard/admin/add_product' },
  { name: 'Manage categories', linkTo: '/dashboard/admin/manage_categories' },
];

export const DashboardHoc: React.FC<Props> = ({ children, title }) => {
  const generateLinks = (links: CustomLinks[]) =>
    links.map((item, idx) => (
      <Link to={item.linkTo} key={`${item.name}${idx}`}>
        {item.name}
      </Link>
    ));

  const isAdmin = useAppSelector(
    ({ auth }) => auth.profile.roles === UserRole.ADMIN
  );

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          <h2>My Account</h2>
          <div className="links">{generateLinks(links)}</div>
          {isAdmin ? (
            <div>
              <h2>Admin</h2>
              <div className="links">{generateLinks(admin)}</div>
            </div>
          ) : null}
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
