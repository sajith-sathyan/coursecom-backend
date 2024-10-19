import axios from 'axios';
import Cookies from 'js-cookie';

export const userRoutes = '/api/userService';
export const courseRoutes = '/api/courseService';
export const paymentRoutes = '/api/paymentService'
export const categoryRoutes = '/api/categoryService'
export const adminRoutes = '/api/adminSercice'
export const analyticsService = '/api/analyticsService' 
export const contentDeliveryService = '/api/contentDeliveryService' 
export const notificationService = '/api/notificationService' 
export const OrderService = '/api/OrderService'
export const baseURL = 'http://localhost:9000';

export const axiosInstance = axios.create({
  baseURL: baseURL,
});


axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
