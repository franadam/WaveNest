import axios from 'axios';
import { Filter } from 'interfaces/Filter.interface';
import { Guitar } from 'interfaces/Guitars.interface';

const baseUrl = 'http://localhost:5000/api/guitars';

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

// need auth
const shopGuitars = async (filter: Filter): Promise<Guitar[]> => {
  const response = await axios.post(`${baseUrl}/shop`, filter);
  const guitars = response.data;
  console.log('guitars', guitars);
  return guitars;
};

export { readGuitars, readGuitarsWithParams, shopGuitars };
