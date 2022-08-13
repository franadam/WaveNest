import React, { useEffect } from 'react';
import { DashboardHoc } from 'hoc/Dashboard.hoc';
import { useAppSelector } from 'hooks/use-type-selector.hook';
import { HistoryTable } from 'components/Dasboard/HistoryTable.component';

export const Dashboard: React.FC = () => {
  const profile = useAppSelector(({ auth }) => auth.profile);

  return (
    <DashboardHoc title="Overview">
      <div className="user_nfo_panel">
        <h1>User Information</h1>
        <div>
          <span>
            Firstname: <strong>{profile.firstname}</strong>
          </span>
          <span>
            Lastname: <strong>{profile.lastname}</strong>
          </span>
          <span>
            Email: <strong>{profile.email}</strong>
          </span>
        </div>
      </div>
      {profile.history.length && (
        <div className="user_nfo_panel">
          <h1>History purchases</h1>
          <div className="user_product_block_wrapper">
            <HistoryTable history={profile.history} />
          </div>
        </div>
      )}
    </DashboardHoc>
  );
};
