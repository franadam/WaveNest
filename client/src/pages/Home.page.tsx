import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { getGuitars } from 'store/reducers/guitars.reducer';
import { CarouselItem } from 'interfaces/Carrousel.interface';
import { Featured } from 'components/Featured.component';
import { SlimPromotion } from 'components/SlimPromotion.component';
import { CardBlock } from 'components/CardBlock.component';
import { Loader } from 'components/Loader.component';
import { getUsers } from 'store/reducers/users.reducer';

export const Home: React.FC = () => {
  const item: CarouselItem = {
    image: '/images/featured/featured_home_3.jpg',
    title: 'Up to 40% off',
    subTitle: 'In second hand guitar',
    buttonTitle: 'Show now',
    linkTo: '/shop',
  };

  const dispatch = useAppDispatch();

  const guitars = useAppSelector(({ guitars }) => guitars);
  const guitarsArray = guitars.ids.map((id) => guitars.entities[id]);

  const fetchGuitars = async () => {
    // const fil = {
    //   sortBy: 'model',
    //   order: Order.ASC,
    //   skip: 0,
    //   limit: 10,
    //   price: [560, 5654],
    // };
    await dispatch(getGuitars());
    await dispatch(getUsers());
  };

  useEffect(() => {
    fetchGuitars();
  }, []);

  return (
    <div>
      <Featured />
      {guitarsArray ? (
        <CardBlock
          title="best selling guitars"
          items={guitarsArray.sort((a, b) => b.itemSold - a.itemSold)}
          shop={false}
        />
      ) : (
        <Loader />
      )}
      <SlimPromotion item={item} />
      {guitarsArray ? (
        <CardBlock
          title="latest guitars"
          items={guitarsArray.sort((a, b) => {
            if (b.created_at < a.created_at) return 1;
            else return 0;
          })}
          shop={false}
        />
      ) : (
        <Loader />
      )}
    </div>
  );
};
