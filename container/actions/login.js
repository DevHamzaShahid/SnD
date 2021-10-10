import {LOADING} from '../reducers/login';
import {PURGE} from 'redux-persist';
// import FCM from 'react-native-fcm';
import {SERVER_URL} from './../../Global';
export const updateAuth = auth => {
  return async dispatch => {
    // const fcmToken = await FCM.getFCMToken();
    // console.log(' fcmToken ', fcmToken, ' auth ', auth);
    let formdata = new FormData();
    formdata.append('domainId', auth.domainId);
    // formdata.append('fcm_token', fcmToken);
    const response = await fetch(
      'https://salonist.io/webapi/fcm_token_update',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formdata,
      },
    );
    const responseJson = await response.json();
    console.log(responseJson);

    dispatch({
      type: 'LOGIN',
      payload: {
        loading: false,
        auth: auth,
        loginSuccess: true,
      },
    });
  };
};

export const updateAuthContact = auth => {
  return async dispatch => {
    dispatch({
      type: 'LOGIN',
      payload: {
        loading: false,
        auth: auth,
        loginSuccess: true,
      },
    });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    dispatch({
      type: LOADING,
      payload: {loading: true},
    });

    let formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);

    let response = await fetch('https://duaacollection.com/b2b/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formdata,
    });
    const responseJson = await response.json();
    console.log(responseJson);

    // const fcmToken = await FCM.getFCMToken();
    // formdata.append('fcm_token', fcmToken);
    // formdata.append('domainId', responseJson.domainId);
    // response = await fetch('https://salonist.io/webapi/fcm_token_update', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    //   body: formdata,
    // });
    // const tokenJson = await response.json();
    // console.log(formdata, tokenJson);

    if (responseJson.status && responseJson.status === 'error') {
      dispatch({
        type: LOADING,
        payload: {loading: false},
      });
      return Promise.reject(responseJson.msg);
    } else {
      dispatch({
        type: 'LOGIN',
        payload: {
          loading: false,
          auth: responseJson,
          loginSuccess: true,
        },
      });
      return Promise.resolve(responseJson);
    }
  };
};

export const logout = domainId => {
  return async dispatch => {
    // let formdata = new FormData();
    // formdata.append('domainId', domainId);
    // // formdata.append('fcm_token', '');
    // const response = await fetch(
    //   'https://salonist.io/webapi/fcm_token_update',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //     body: formdata,
    //   },
    // );
    // const responseJson = await response.json();

    dispatch({
      type: 'LOGOUT',
    });
    dispatch({
      type: PURGE,
      key: 'root',
    });
    return Promise.resolve(responseJson);
  };
};
