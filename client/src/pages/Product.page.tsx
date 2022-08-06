import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { Loader } from 'components/Loader.component';
import { ProductInfo } from 'components/ProductInfo.component';
import { useAppSelector } from 'hooks/use-type-selector.hook';
import { Guitar } from 'interfaces/Guitars.interface';
import { useParams } from 'react-router-dom';
import guitarService from 'services/guitars.service';
import { selectGuitarById } from 'store/reducers/guitars.reducer';
import { renderCardImage } from 'utils/renderCardImage';
import Slider from 'react-slick';

interface Props {}

export const Product: React.FC<Props> = () => {
  const [_, setIsLoading] = useState(false);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [guitar, setGuitar] = useState<Guitar | undefined>(undefined);
  const { id } = useParams();
  // const guitar = useAppSelector(state => selectGuitarById(state,id))
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const closeModal = () => setisModalOpen(false);
  const openModal = () => setisModalOpen(true);

  const fetchGuitar = async (id: string) => {
    const data = await guitarService.readGuitar(+id);
    setGuitar(data);
  };

  useEffect(() => {
    setIsLoading(true);
    if (id) {
      fetchGuitar(id);
    }
  }, [id]);

  return (
    <div className="page_container">
      <div className="page_top">
        <div className="container">Product Details</div>
      </div>
      <div className="container">
        {guitar ? (
          <div className="product_detail_wrapper">
            <div className="left">
              <div>
                <img
                  src={renderCardImage(guitar.images)}
                  alt={guitar.model}
                  onClick={() => openModal()}
                />
              </div>
            </div>
            <div className="right">
              <ProductInfo guitar={guitar} />
            </div>
          </div>
        ) : (
          <Loader full={true} />
        )}
      </div>
      <Modal show={isModalOpen} onHide={closeModal} dialogClassName="modal-90w">
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <Slider {...settings}>
            {guitar &&
              guitar.images &&
              guitar.images.map((img) => (
                <div key={img.id} style={{ margin: '0 auto' }}>
                  <div
                    className="img-block"
                    style={{ background: `url(${img.url}) no-repeat` }}
                  ></div>
                </div>
              ))}
          </Slider>
        </Modal.Body>
      </Modal>
    </div>
  );
};
