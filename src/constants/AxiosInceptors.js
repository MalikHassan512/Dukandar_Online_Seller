import {useEffect} from 'react';
import {useSelector} from 'react-redux';

import axios from 'axios';
import {url} from './urls';

const AxiosInterceptors = () => {
  const token = useSelector(state => state.auth?.token);
  // console.log(token);

  useEffect(() => {
    axios.interceptors.request.use(req => {
      req.headers.authorization = `Token ${token}`;
      // console.log(token);
      req.headers['Content-Type'] =
        'application/json; charset=UTF-8,multipart/form-data';
      req.baseURL = url;
      return req;
    });
  }, [token]);
};

export default AxiosInterceptors;
