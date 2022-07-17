import { CarouselItem } from 'interfaces/Carrousel.interface';
import React from 'react';
import { Carrousel } from './Carrousel.component';

export const Featured: React.FC = () => {
  const items: CarouselItem[] = [
    {
      image: '/images/featured/featured_home.jpg',
      title: 'Fender',
      subTitle: 'Custom shop',
      buttonTitle: 'Show now',
      linkTo: '/shop',
    },
    {
      image: '/images/featured/featured_home_2.jpg',
      title: 'B-Stock',
      subTitle: 'Awsome discount',
      buttonTitle: 'View Offers',
      linkTo: '/shop',
    },
  ];
  return (
    <div className="featured_container">
      <Carrousel items={items} />
    </div>
  );
};
