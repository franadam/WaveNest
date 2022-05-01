import { CarouselItem } from 'interfaces/Carrousel.interface';
import React from 'react';
import { CustomButton } from './CustomButton.component';

interface Props {
  item: CarouselItem;
}

export const SlimPromotion: React.FC<Props> = ({
  item: { title, subTitle, image, linkTo, buttonTitle },
}) => {
  const renderPromotion = () =>
    image ? (
      <div
        className="slim_promotion_img"
        style={{
          background: `url(${image})`,
        }}
      >
        <div className="tag title">{title}</div>
        <div className="tag low_title">{subTitle}</div>
        <div className="btn">
          <CustomButton
            type="default"
            title={title}
            subTitle={subTitle}
            linkTo={linkTo}
            buttonTitle={buttonTitle}
          />
        </div>
      </div>
    ) : null;

  return <div className="slim_promotion">{renderPromotion()}</div>;
};
