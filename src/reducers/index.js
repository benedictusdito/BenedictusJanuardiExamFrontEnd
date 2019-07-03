import { combineReducers } from "redux";

const init = {
  id: "",
  username: "",
  myCart: [],
  totalPrice: 0,
  totalUnit: 0
};

const AuthReducer = (data = init, action) => {
  switch (action.type) {
    case "LOGIN SUCCESS":
      return {
        ...data,
        id: action.payload.id,
        username: action.payload.username
      };

    case "LOGOUT_SUCCESS":
      return {
        ...data,
        id: "",
        username: ""
      };

    case "ADD_TO_CART":
      return {
        ...data,
        myCart: [...data.myCart, action.payload.myCartPayload],
        totalPrice: data.totalPrice + action.payload.totalPrice,
        totalUnit: data.totalUnit + action.payload.myCartPayload.quantity
      };

    default:
      return data;
  }
};

export default combineReducers({
  auth: AuthReducer // {id: 1, username: ''}
});
