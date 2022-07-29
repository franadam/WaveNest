import { Picture } from 'interfaces/Pictures.interface';

export const renderCardImage = (images: Picture[]) => {
  if (images.length && images[0].url) return images[0].url;
  else return '/images/image_not_availble.png';
};
