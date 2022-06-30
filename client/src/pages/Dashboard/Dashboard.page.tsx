import React from 'react';
import { DashboardHoc } from 'hoc/Dashboard.hoc';
import { useAppSelector } from 'hooks/use-type-selector.hook';

export const Dashboard: React.FC = () => {
  const profile = useAppSelector(({ auth }) => auth.profile);

  return (
    <DashboardHoc title="Overview">
      <div className="user_nfo_panel">
        <h1>User Information</h1>
        <div>
          <span>Firstname: {profile.firstname}</span>
          <span>Lastname: {profile.lastname}</span>
          <span>Email: {profile.email}</span>
        </div>
        {/* <Button type="default" title="Edit profile" linkTo="/user/profile" /> */}
      </div>
      <div className="user_nfo_panel">
        <h1>History purchases</h1>
        <div className="user_product_block_wrapper">history</div>
      </div>
    </DashboardHoc>
  );
};
