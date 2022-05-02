import React, { useEffect } from 'react';
import { Featured } from 'components/Featured.component';
import { CarouselItem } from 'interfaces/Carrousel.interface';
import { SlimPromotion } from 'components/SlimPromotion.component';
import {
  getGuitars,
  getGuitarsWithParams,
  shopping,
} from 'store/reducers/guitars.reducer';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { Order } from 'interfaces/Filter.interface';

export const Home: React.FC = () => {
  const item: CarouselItem = {
    image: '/images/featured/featured_home_3.jpg',
    title: 'Up to 40% off',
    subTitle: 'In second hand guitar',
    buttonTitle: 'Show now',
    linkTo: '/shop',
  };

  const dispatch = useAppDispatch();

  const gu = useAppSelector((state) => state.guitars);
  useEffect(() => {
    const fil = {
      sortBy: 'model',
      order: Order.ASC,
      skip: 0,
      limit: 10,
      price: [560, 5654],
    };
    dispatch(getGuitarsWithParams(fil));
  }, []);

  return (
    <div>
      Home
      <Featured />
      <SlimPromotion item={item} />
    </div>
  );
};
