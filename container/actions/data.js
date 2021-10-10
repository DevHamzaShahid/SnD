import {FETCH_CUSTOMERS, FETCH_Dashboard, LOADING} from '../reducers/data';
import Environment from './../../Environment';

export const fetchCustomers = (domainId) => {
  return async dispatch => {
    dispatch({
      type: LOADING,
      payload: {loading: true},
    });

    let formdata = new FormData();
    formdata.append('domainId', domainId);

    console.log(' domainId ', domainId);

    console.log( ' url ', `${Environment.BASE_URL}customers` );

    const response = await fetch(`${Environment.BASE_URL}customers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    });
    const responseJson = await response.json();
    console.log(responseJson);

    if (responseJson.status && responseJson.status === 'error') {
      dispatch({
        type: LOADING,
        payload: {loading: false},
      });
      return Promise.reject(responseJson.message);
    } else {
      dispatch({
        type: FETCH_CUSTOMERS,
        payload: {
          loading: false,
          customers: responseJson.customers,
          loginSuccess: true,
        },
      });
      return Promise.resolve(responseJson);
    }
  };
};
export const fetchDashboard = (domainId) => {
  return async dispatch => {
    dispatch({
      type: LOADING,
      payload: {loading: true},
    });

    let formdata = new FormData();
    formdata.append('domainId', domainId);

    const response = await fetch(`${Environment.BASE_URL}dashboard`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    });
    const responseJson = await response.json();
    console.log(responseJson);

    if (responseJson.status && responseJson.status === 'error') {
      dispatch({
        type: LOADING,
        payload: {loading: false},
      });
      return Promise.reject(responseJson.message);
    } else {
      dispatch({
        type: FETCH_Dashboard,
        payload: {
          loading: false,
          dashboard: responseJson,
          loginSuccess: true,
        },
      });
      return Promise.resolve(responseJson);
    }
  };
};
