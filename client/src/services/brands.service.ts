import axios from 'axios';
import { Brand } from 'interfaces/Brands.interface';
import { authService } from './users.service';

const baseUrl = 'http://localhost:5000/api/guitars/brands';

const createBrand = async (g: Brand): Promise<Brand> => {
  const response = await axios.post(`${baseUrl}`, g);
  const brand = response.data;
  console.log('brand', brand);
  return brand;
};

const readBrands = async (): Promise<Brand[]> => {
  const response = await axios(`${baseUrl}`);
  console.log('service >> response.data', response.data);
  return response.data;
};

const readBrand = async (id: number): Promise<Brand> => {
  const response = await axios(`${baseUrl}/${id}`);
  console.log('service >> response.data', response.data);
  return response.data;
};

const updateBrand = async (
  id: number,
  updates: Partial<Brand>
): Promise<Brand> => {
  const response = await axios.patch(`${baseUrl}/${id}`, updates, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  const brand = response.data;
  console.log('brand', brand);
  return brand;
};

const deleteBrand = async (id: number): Promise<Brand> => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  const brand = response.data;
  console.log('brand', brand);
  return brand;
};

const brandService = {
  createBrand,
  readBrands,
  readBrand,
  updateBrand,
  deleteBrand,
};

export default brandService;
