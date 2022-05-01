import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  type: string;
  title: string;
  subTitle: string;
  buttonTitle: string;
  altClass?: string;
  linkTo: string;
  style?: React.CSSProperties;
}

export const CustomButton: React.FC<Props> = ({
  type,
  buttonTitle,
  altClass,
  linkTo,
  style,
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
          {buttonTitle}{' '}
        </Link>
      );

      break;

    default:
      template = <div></div>;
  }
  return template;
};
