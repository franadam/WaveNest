import axios from 'axios';
import { Guitar } from 'interfaces/Guitars.interface';
import { User, Credentials } from 'interfaces/Users.interface';

const baseUrl = 'https://localhost:4000/api/users';
const authUrl = 'https://localhost:4000/api/auth';
const transactionsUrl = 'https://localhost:4000/api/transactions';

const register = async (user: User): Promise<User> => {
  const response = await axios.post(`${authUrl}/register`, user);
  console.log('service >> response.data', response.data);
  return response.data;
};

const login = async (credentials: Credentials): Promise<User> => {
  console.log('first');
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

const verifyUser = async (): Promise<User> => {
  const token = getToken();
  const params = { validation: token };
  console.log('params', params);
  const response = await axios(`${baseUrl}/verify`, {
    params,
    headers: { Authorization: `Bearer ${getToken()}` },
  });
  console.log('service user', response.data);
  saveToken(response.data.token);
  return response.data;
};

const addToCart = async (id: number, cart: Guitar[]): Promise<User> => {
  const { email, ...rest } = await profile();
  console.log('user', rest, cart);
  const response = await axios.patch(
    `${baseUrl}/${id}`,
    { ...rest, cart },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  console.log('service user', response.data);
  saveToken(response.data.token);
  return response.data;
};

const purchase = async (order_id: string) => {
  const response = await axios.post(
    `${transactionsUrl}`,
    { order_id },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  const transaction = response.data;
  const newHistory = [
    {
      id: transaction.id,
      created_at: transaction.order_data.create_time,
      order_id: transaction.order_data.id,
      amount: parseFloat(transaction.order_data.purchase_units[0].amount.value),
      items: transaction.user.cart,
    },
  ];
  const { email, id, history, ...rest } = await profile();
  const user = await axios.patch(
    `${baseUrl}/${id}`,
    { ...rest, history: [...history, ...newHistory], cart: [] },
    {
      headers: { Authorization: `Bearer ${getToken()}` },
    }
  );
  console.log('service user', user);
  return history;
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
  verifyUser,
  addToCart,
  purchase,
};

const usersService = { fetchUsers };

export { authService, usersService };
