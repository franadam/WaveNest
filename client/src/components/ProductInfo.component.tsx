import React from 'react';
import Slider from 'react-slick';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Guitar } from 'interfaces/Guitars.interface';
import { CustomButton } from './CustomButton.component';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  guitar: Guitar;
}

export const ProductInfo: React.FC<Props> = ({
  guitar: {
    brand,
    model,
    description,
    shipping,
    available,
    price,
    frets,
    wood,
  },
}) => {
  const showTags = () => (
    <div className="product_tags">
      <div className="tag">
        <div>
          <LocalShippingIcon />
        </div>
        <div className="tag_text">
          {shipping ? (
            <div>Free shipping for EU location</div>
          ) : (
            <div>No shipping for EU location</div>
          )}
        </div>
      </div>
      {available && (
        <div className="tag">
          <div>
            <DoneOutlineIcon />
          </div>
          <div className="tag_text">
            {shipping ? (
              <div>
                <strong>{available}</strong> product/s in warehouse available
              </div>
            ) : (
              <div>Sorry product not available at the moment</div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const showActions = () => (
    <div className="product_actions">
      <div className="price">{price}</div>
      <div className="cart">
        <CustomButton
          type="add_to_cart_link"
          runAction={() => alert('add_to_cart_link')}
        />
      </div>
    </div>
  );

  const showSpecs = () => (
    <div className="product_specifications">
      <h2>Specifications</h2>
      <div>
        <div className="item">
          <strong>Frets:</strong> {frets}
        </div>
        <div className="item">
          <strong>Wood:</strong> {wood}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1>
        {brand.name} {model}
      </h1>
      <p>{description}</p>
      {showTags()}
      {showActions()}
      {showSpecs()}
    </div>
  );
};
