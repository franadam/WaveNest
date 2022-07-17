import axios from 'axios';
import { Filter } from 'interfaces/Filter.interface';
import { Guitar } from 'interfaces/Guitars.interface';
import { Picture } from 'interfaces/Pictures.interface';
import { authService } from './users.service';

const baseUrl = 'http://localhost:5000/api/guitars';

const createGuitar = async (g: any): Promise<Guitar> => {
  const response = await axios.post(`${baseUrl}`, g, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  const guitar = response.data;
  console.log('guitar', guitar);
  return guitar;
};

const readGuitars = async (): Promise<Guitar[]> => {
  const response = await axios(`${baseUrl}`);
  console.log('service >> response.data', response.data);
  return response.data;
};

const readGuitarsWithParams = async (params: Filter): Promise<Guitar[]> => {
  const response = await axios(`${baseUrl}`, { params }); //sortBy=model&order=des&limit=10&skip=1
  const guitars = response.data;
  console.log('guitars', guitars);
  return guitars;
};

const updateGuitar = async (
  id: number,
  updates: Partial<Guitar>
): Promise<Guitar> => {
  const response = await axios.patch(`${baseUrl}/${id}`, updates, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  const guitar = response.data;
  console.log('guitar', guitar);
  return guitar;
};

const deleteGuitar = async (id: number): Promise<Guitar> => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  const guitar = response.data;
  console.log('guitar', guitar);
  return guitar;
};

const shopGuitars = async (filter: Filter): Promise<Guitar[]> => {
  const response = await axios.post(`${baseUrl}/shop`, filter);
  const guitars = response.data;
  console.log('guitars', guitars);
  return guitars;
};

const uploadImage = async (img: FormData): Promise<Picture[] | Picture> => {
  console.log('uploadImage', img);
  const response = await axios.post(`${baseUrl}/upload`, img, {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
  const image = response.data;
  console.log('image', image);
  return image;
};

const guitarService = {
  createGuitar,
  readGuitars,
  updateGuitar,
  deleteGuitar,
  readGuitarsWithParams,
  shopGuitars,
  uploadImage,
};

export default guitarService;
