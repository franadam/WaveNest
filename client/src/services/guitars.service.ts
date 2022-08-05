import axios from 'axios';
import { Filter, Page, Query, Shopping } from 'interfaces/Filter.interface';
import { Guitar } from 'interfaces/Guitars.interface';
import { Picture } from 'interfaces/Pictures.interface';
import { authService } from './users.service';

const baseUrl = 'http://localhost:5000/api/guitars';

const createGuitar = async (g: any): Promise<Guitar> => {
  const response = await axios.post(`${baseUrl}`, g, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  const guitar = response.data;
  return guitar;
};

const readGuitars = async (): Promise<Guitar[]> => {
  const response = await axios(`${baseUrl}`);
  console.log('service readGuitar >> guitar', response.data);
  return response.data;
};

const readGuitar = async (id: number): Promise<Guitar> => {
  const response = await axios(`${baseUrl}/${id}`);
  const guitar = response.data;
  console.log('service readGuitar >> guitar', response.data);
  return guitar;
};

const readGuitarsWithParams = async (params: Filter): Promise<Guitar[]> => {
  const response = await axios(`${baseUrl}`, { params }); //sortBy=model&order=des&limit=10&skip=1
  const guitars = response.data;
  console.log('service guitars>> readGuitarsWithParams', guitars);
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

const shopping = async (filter: Shopping): Promise<Guitar[]> => {
  console.log('filter', filter);
  const response = await axios.post(`${baseUrl}/shop`, filter, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  const guitars = response.data;
  console.log('guitars', guitars);
  return guitars;
};

const fetchPagination = async (params: Query): Promise<Page> => {
  const response = await axios(`${baseUrl}/pagination`, { params });
  const pagination = response.data;
  console.log('pagination', pagination);
  return pagination;
};

const uploadImage = async (img: FormData): Promise<Picture[] | Picture> => {
  const response = await axios.post(`${baseUrl}/upload`, img, {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
  const image = response.data;
  return image;
};

const guitarService = {
  createGuitar,
  readGuitars,
  updateGuitar,
  deleteGuitar,
  readGuitar,
  readGuitarsWithParams,
  shopping,
  uploadImage,
  fetchPagination,
};

export default guitarService;
