import React from 'react';
import { Link } from 'react-router-dom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface Props {
  type: string;
  title?: string;
  subTitle?: string;
  buttonTitle?: string;
  altClass?: string;
  linkTo?: string;
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
      if (linkTo && buttonTitle)
        template = (
          <Link
            className={!altClass ? 'link_default' : altClass}
            to={linkTo}
            style={{ ...style }}
          >
            {buttonTitle}
          </Link>
        );
      else {
        template = <div></div>;
      }
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

    case 'add_to_cart_link':
      template = (
        <div
          className="add_to_cart_link"
          onClick={() => {
            runAction && runAction();
          }}
        >
          <AddShoppingCartIcon style={{ fontSize: iconSize }} /> Add to cart
        </div>
      );
      break;
    default:
      template = <div></div>;
  }
  return template;
};
