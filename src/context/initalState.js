import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
  user: userInfo,
  foodItems: null,
  deliveryCost: null,
  orders: null,
  categories: null,
  chefInfo: null,
  footerInfo: null,
  aboutUsPage: null,
  cartShow: false,
  cartItems: cartInfo,
  orderContainerShow: false,
  updateItems: false,
};
