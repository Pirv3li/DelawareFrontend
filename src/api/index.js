import axiosRoot from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};

export const getAll = async (url) => {
  const { data } = await axios.get(`${baseUrl}/${url}`);
  // Check if data has an 'items' property
  if (data && data.items) {
    return data.items;
  }
  // If not, return the data as is
  return data;
};

export const deleteById = async (url, { arg: id }) => {
  await axios.delete(`${baseUrl}/${url}/${id}`);
};

export const create = async (url, { arg: body }) => {
  const response = await axios.post(`${baseUrl}/${url}`, body);

  // If the response includes a token, store it
  if (response.data && response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

export const update = async (url, body) => {
  const response = await axios.put(`${baseUrl}/${url}`, body);
  return response.data;
};



export const getById = async (url) => {
  const { data } = await axios.get(`${baseUrl}/${url}`);
  return data;
};

export const post = async (url, { arg: body }) => {
  const { data } = await axios.post(`${baseUrl}/${url}`, body);
  return data;
};
