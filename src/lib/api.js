import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import qs from 'qs';
import Config from '../constants/config';

/**
 * Axios defaults
 */
axios.defaults.baseURL = Config.apiBaseUrl;

// Headers
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common.Accept = 'application/json';

/**
 * Request Interceptor
 */
axios.interceptors.request.use(

  async (inputConfig) => {
    const config = inputConfig;

    if (config.headers && (config.headers['content-type'] === 'application/x-www-form-urlencoded')) {
      config.data = qs.stringify(config.data);
    }
    Object.assign(config, {
      url: inputConfig.baseURL + inputConfig.url,
      timeout: 60000,
    });


    console.log('请求信息:', config);
    // Check for and add the stored Auth Token to the header request
    let token = '';
    try {
      token = await AsyncStorage.getItem('@Authentication:token');
    } catch (error) {
      /* Nothing */
    }
    if (token) {
      config.headers.Authentication = `${token}`;
    }
    return config;
  },
  (error) => {
    throw error;
  },
);

/**
 * Response Interceptor
 */
axios.interceptors.response.use(
  (res) => {
    console.log('响应信息：', res);
    // Status code isn't a success code - throw error
    if (!`${res.status}`.startsWith('2')) {
      throw res.data;
    }

    // Otherwise just return the data

    return res;
  },
  (error) => {
    console.log('错误信息：', error);
    // Pass the response from the API, rather than a status code
    if (error && error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  },
);

export default axios;
