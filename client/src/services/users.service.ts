import axios from 'axios';
import { User, Credentials } from 'interfaces/Users.interface';

const baseUrl = 'http://localhost:5000/api/users';
const authUrl = 'http://localhost:5000/api/auth';

const register = async (user: User): Promise<User> => {
  const response = await axios.post(`${authUrl}/register`, user);
  console.log('service >> response.data', response.data);
  return response.data;
};

const login = async (credentials: Credentials): Promise<User> => {
  axios.defaults.withCredentials = true;
  const response = await axios.post(`${authUrl}/login`, credentials, {
    withCredentials: true,
  });
  console.log('service >> response.data', response.data);
  saveToken(response.data.token);
  return response.data;
};

const googleLogin = async (): Promise<User> => {
  const response = await axios(`${authUrl}/google`);
  console.log('service >> response.data', response.data);
  saveToken(response.data.token);
  return response.data;
};

const logout = async (): Promise<User> => {
  const response = await axios(`${authUrl}/logout`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  console.log('service >> response.data', response.data);
  removeToken();
  return response.data;
};

const profile = async (): Promise<User> => {
  const response = await axios(`${authUrl}/profile`, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

// const fetchToken = async (): Promise<Boolean> => {
//   axios.defaults.withCredentials = true;
//   const response = await axios(`${authUrl}/token`, { withCredentials: true });
//   console.log('service >> response.data', response.data);
//   return response.data;
// };

const saveToken = (token: string): void => {
  localStorage.setItem('authoken', token);
};

const getToken = (): string => {
  const token = localStorage.getItem('authoken') || '';
  console.log('token', token);
  return token;
};

const removeToken = (): void => {
  localStorage.removeItem('authoken');
};

const isAuth = () => {
  return !!getToken();
};

const fetchUsers = async (): Promise<User[]> => {
  const response = await axios(`${baseUrl}`);
  return response.data;
};

const update = async (id: number, updates: Partial<User>) => {
  const response = await axios.patch(`${baseUrl}/${id}`, updates, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  return response.data;
};

const updateEmail = async (id: number, email: string) => {
  const response = await axios.patch(`${baseUrl}/${id}/email`, email, {
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  console.log('service user', response.data);
  saveToken(response.data.token);
  return response.data;
};

const authService = {
  login,
  register,
  googleLogin,
  logout,
  isAuth,
  getToken,
  profile,
  update,
  updateEmail,
};

const usersService = { fetchUsers };

export { authService, usersService };
