import React from 'react';
import { Guitar } from 'interfaces/Guitars.interface';
import { renderCardImage } from 'utils/renderCardImage';
import { useNavigate } from 'react-router-dom';

interface Props {
  product: Guitar;
  removeItem: (id: number) => void;
}

export const CartDetails: React.FC<Props> = ({ product, removeItem }) => {
  const navigate = useNavigate();

  const goToProduct = () => {
    navigate(`/guitar_detail/${product.id}`, { replace: true });
  };

  return (
    <div
      className="user_product_block"
      key={product.id}
      onClick={() => goToProduct()}
    >
      <div className="item">
        <div
          className="image"
          style={{
            background: `url(${renderCardImage(product.images)}) no-repeat`,
          }}
        ></div>
      </div>
      <div className="item">
        <h4>Product name</h4>
        <div>
          {product.brand.name} {product.model}
        </div>
      </div>
      <div className="item">
        <h4>Price</h4>
        <div>€ {product.price}</div>
      </div>
      <div className="item btn">
        <div className="cart_remove_btn" onClick={() => removeItem(product.id)}>
          Remove
        </div>
      </div>
    </div>
  );
};
