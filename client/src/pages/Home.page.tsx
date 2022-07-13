import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/use-type-selector.hook';
import { getGuitars, selectAllGuitars } from 'store/reducers/guitars.reducer';
import { CarouselItem } from 'interfaces/Carrousel.interface';
import { Featured } from 'components/Featured.component';
import { SlimPromotion } from 'components/SlimPromotion.component';
import { CardBlock } from 'components/CardBlock.component';
import { Loader } from 'components/Loader.component';

export const Home: React.FC = () => {
  const item: CarouselItem = {
    image: '/images/featured/featured_home_3.jpg',
    title: 'Up to 40% off',
    subTitle: 'In second hand guitar',
    buttonTitle: 'Show now',
    linkTo: '/shop',
  };

  const dispatch = useAppDispatch();

  const allGuitars = useAppSelector((state) => selectAllGuitars(state));

  const fetchGuitars = async () => {
    await dispatch(getGuitars());
  };

  useEffect(() => {
    fetchGuitars();
  }, []);

  return (
    <div>
      <Featured />
      {allGuitars ? (
        <CardBlock
          title="best selling guitars"
          items={allGuitars.sort((a, b) => b.itemSold - a.itemSold)}
          shop={false}
        />
      ) : (
        <Loader />
      )}
      <SlimPromotion item={item} />
      {allGuitars ? (
        <CardBlock
          title="latest guitars"
          items={allGuitars.sort((a, b) => {
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
