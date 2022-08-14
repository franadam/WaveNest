import axios from 'axios';
import { Site } from 'interfaces/Sites.interface';
import { authService } from './users.service';

const baseUrl = 'https://localhost:4000/api/sites';

const createSite = async (g: Site): Promise<Site> => {
  const response = await axios.post(`${baseUrl}`, g);
  const site = response.data;
  return site;
};

const readSites = async (): Promise<Site> => {
  const response = await axios(`${baseUrl}`);
  return response.data;
};

const readSite = async (id: number): Promise<Site> => {
  const response = await axios(`${baseUrl}/${id}`);
  return response.data;
};

const updateSite = async (
  id: number,
  updates: Partial<Site>
): Promise<Site> => {
  const response = await axios.patch(`${baseUrl}/${id}`, updates, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  const site = response.data;
  return site;
};

const deleteSite = async (id: number): Promise<Site> => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: `Bearer ${authService.getToken()}` },
  });
  const site = response.data;
  return site;
};

const siteService = {
  createSite,
  readSites,
  readSite,
  updateSite,
  deleteSite,
};

export default siteService;
