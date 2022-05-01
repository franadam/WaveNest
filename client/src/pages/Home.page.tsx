import React from 'react';
import { Featured } from 'components/Featured.component';
import { CarouselItem } from 'interfaces/Carrousel.interface';
import { SlimPromotion } from 'components/SlimPromotion.component';

export const Home: React.FC = () => {
  const item: CarouselItem = {
    image: '/images/featured/featured_home_3.jpg',
    title: 'Up to 40% off',
    subTitle: 'In second hand guitar',
    buttonTitle: 'Show now',
    linkTo: '/shop',
  };

  return (
    <div>
      Home
      <Featured />
      <SlimPromotion item={item} />
    </div>
  );
};
