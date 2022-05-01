import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CarouselItem } from 'interfaces/Carrousel.interface';
import { CustomButton } from './CustomButton.component';

interface Props {
  items: CarouselItem[];
}

export const Carrousel: React.FC<Props> = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const generateSlide = () =>
    items
      ? items.map(({ title, subTitle, image, linkTo, buttonTitle }, i) => (
          <div key={i}>
            <div
              className="featured_image"
              style={{
                background: `url(${image})`,
                height: window.innerHeight,
              }}
            >
              <div className="featured_action">
                <div className="tag title">{title}</div>
                <div className="tag low_title">{subTitle}</div>
                <div>
                  <CustomButton
                    type="default"
                    title={title}
                    buttonTitle={buttonTitle}
                    subTitle={subTitle}
                    linkTo={linkTo}
                    style={{ margin: '10px 0 0 0' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      : null;

  return <Slider>{generateSlide()}</Slider>;
};
