import axiosInstance from 'axios'
import { object } from 'yup';

const baseURL=process.env.REACT_APP_SERVERURL;
const axios=axiosInstance.create({baseURL});

export default axios


