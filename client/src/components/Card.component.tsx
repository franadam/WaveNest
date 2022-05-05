import React from 'react';
import { Guitar } from 'interfaces/Guitars.interface';
import { renderCardImage } from 'utils/renderCardImage';
import { CustomButton } from './CustomButton.component';

interface Props {
  grid: boolean;
  item: Guitar;
}

export const Card: React.FC<Props> = ({ grid, item }) => {
  const handleAddToCart = (guitar: Guitar): void => {
    alert('add to cart');
  };

  return (
    <div className={`card_item_wrapper ${grid ? 'grid_bars' : ''}`}>
      <div
        className="image"
        style={{ background: `url(${renderCardImage(item.images)})` }}
      ></div>
      <div className="action_container">
        <div className="tags">
          <div className="brand">{item.brand.name}</div>
          <div className="name">{item.model}</div>
          <div className="name">€{item.price}</div>
        </div>

        {grid ? (
          <div className="description">
            <p>{item.description}</p>
          </div>
        ) : null}
        <div className="actions">
          <div className="button_wrapp">
            <CustomButton
              type="default"
              altClass="card_link"
              buttonTitle="View Product"
              linkTo={`guitar_detail/${item.id}`}
              style={{ fontWeight: 'bold' }}
            />
          </div>
          <div className="button_wrapp">
            <CustomButton
              type="bag_link"
              altClass="card_link"
              runAction={() => handleAddToCart(item)}
              iconSize="23"
              linkTo={`guitar_detail/${item.id}`}
              buttonTitle="View Product"
              style={{ fontWeight: 'bold' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
