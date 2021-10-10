export const LOADING = '/login/loading';
const defaultState = {
  loading: false,
};
const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign({}, state, {
        auth: action.payload.auth,
        loading: false,
        loginSuccess: action.payload.loginSuccess,
      });
    case 'LOGOUT':
      return Object.assign({}, state, {
        loginSuccess: false,
        loading: false,
      });
    case LOADING:
      return Object.assign({}, state, {
        loading: action.payload.loading,
      });
    default:
      return state;
  }
};
export default loginReducer;
