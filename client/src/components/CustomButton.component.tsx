import React from 'react';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface Props {
  type: string;
  title?: string;
  subTitle?: string;
  buttonTitle: string;
  altClass?: string;
  linkTo: string;
  style?: React.CSSProperties;
  iconSize?: string;
  runAction?: () => void;
}

export const CustomButton: React.FC<Props> = ({
  type,
  buttonTitle,
  altClass,
  linkTo,
  style,
  iconSize,
  runAction,
}) => {
  let template: React.ReactElement;
  switch (type) {
    case 'default':
      template = (
        <Link
          className={!altClass ? 'link_default' : altClass}
          to={linkTo}
          style={{ ...style }}
        >
          {buttonTitle}
        </Link>
      );

      break;

    case 'bag_link':
      template = (
        <div
          className="bag_link"
          onClick={() => {
            runAction && runAction();
          }}
          style={{ ...style }}
        >
          <AddShoppingCartIcon style={{ fontSize: iconSize }} />
        </div>
      );
      break;
    default:
      template = <div></div>;
  }
  return template;
};
