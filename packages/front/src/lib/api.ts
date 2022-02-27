import axios from 'axios';

const apiBaseURL = 'http://localhost:3000';

const api = axios.create({ baseURL: apiBaseURL });

export const getIngredients = async () => {
    const res = await api.get('/ingredients');
    return res.data;
  };