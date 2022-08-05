import React, { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import { Shopping } from 'interfaces/Filter.interface';

interface Props {
  title: string;
  filter: Shopping;
  isReset: boolean;
  handleShipping: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CustomSitch: React.FC<Props> = ({
  title,
  filter,
  isReset,
  handleShipping,
}) => {
  const [isChecked, setIsChecked] = useState(filter.shipping);

  const initShipping = () => {
    handleShipping(filter.shipping);
    setIsChecked(filter.shipping);
  };

  useEffect(() => {
    if (isReset) initShipping();
  }, [isReset]);

  useEffect(() => {
    handleShipping(isChecked);
  }, [isChecked]);

  return (
    <div className="collapse_items_wrapper">
      <div
        style={{
          textTransform: 'uppercase',
          fontWeight: 700,
          fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
        }}
      >
        {title}
      </div>
      <Switch
        checked={isChecked}
        onChange={() => setIsChecked((state) => !state)}
      />
    </div>
  );
};
