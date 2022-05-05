export const renderCardImage = (images: string[]) => {
  if (images.length) return images[0];
  else return '/images/image_not_availble.png';
};
