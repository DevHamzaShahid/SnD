import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART, FETCH_PRODUCTS } from '../actions/Types';

const initialState = {
    cart: [],
    total: 0,
    totalItems:0
}
export default function(state=initialState, action) {
    switch(action.type){
        case ADD_TO_CART:
            let flag = true;
            state.cart.map(( item )=>{
                if(item.id == action.payload.id){
                    item.quantity +=action.payload.quantity;
                    flag = false;
                    // state.totalItems += parseInt(action.payload.quantity);     
                }
            });
            if(flag == true)
                return {
                    ...state,
                    cart: [action.payload, ...state.cart],
                    total: state.total + ( parseFloat(action.payload.price) * parseInt(action.payload.quantity)),
                    totalItems: state.totalItems+parseInt(action.payload.quantity)
                }
            else
                return {
                    ...state,
                    cart: [...state.cart],
                    total: state.total +( parseFloat(action.payload.price) *parseInt(action.payload.quantity)),
                    totalItems: state.totalItems+parseInt(action.payload.quantity)
                }
        case EMPTY_CART:
            return {
                ...state,
                cart: [],
                total: 0,
                totalItems:0,
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter((item, i) => item.id !== action.payload.id),
                total: state.total - action.payload.price * action.payload.quantity,
                totalItems: state.totalItems -action.payload.quantity
            }
        default:
            return state
    }
}