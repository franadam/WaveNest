import { CircularProgress } from '@mui/material';
import React from 'react';

interface Props {
  full?: boolean;
}

export const Loader: React.FC<Props> = ({ full }) => {
  return (
    <div className={`root_loader ${full ? 'full' : ''} `}>
      <CircularProgress />
    </div>
  );
};
