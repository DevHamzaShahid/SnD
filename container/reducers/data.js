export const LOADING = '/data/loading';
export const FETCH_CUSTOMERS = '/data/customers/fetch';
export const FETCH_Dashboard = '/data/dashboard/fetch';
const defaultState = {
  loading: false,
  customers: [],
  dashboard: {},
};
const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS:
      return Object.assign({}, state, {
        customers: action.payload.customers,
        loading: false,
      });
    case FETCH_Dashboard:
      return Object.assign({}, state, {
        dashboard: action.payload.dashboard,
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
