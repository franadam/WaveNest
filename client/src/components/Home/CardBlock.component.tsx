import React from 'react';
import { Guitar } from 'interfaces/Guitars.interface';
import { Card } from './Card.component';

interface Props {
  items: Guitar[];
  title?: string;
  grid: boolean;
}

export const CardBlock: React.FC<Props> = ({ title, items, grid }) => {
  const renderCards = () =>
    items.length
      ? items.map((item) => <Card key={item.id} item={item} grid={grid} />)
      : null;

  return (
    <div className={grid ? 'card_block_shop' : 'card_block'}>
      <div className={grid ? '' : 'container'}>
        {title ? <div className="title">{title}</div> : null}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>{renderCards()}</div>
    </div>
  );
};
