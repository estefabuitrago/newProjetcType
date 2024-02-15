/** @format */

import axios from "axios";

const env = () => {
  return axios.create({
    //baseURL: `http://localhost:8000/api/`,
    baseURL: `https://stagingtp.mundosoluciones.com.co/api/`,
  });
};

export const api = env();
