export const actionType = {
  SET_USER: "SET_USER",
  SET_FOOD_ITEMS: "SET_FOOD_ITEMS",
  SET_ORDERS: "SET_ORDERS",
  SET_CART_SHOW: "SET_CART_SHOW",
  SET_CARTITEMS: "SET_CARTITEMS",
  SET_ORDER_CONTAINER_SHOW: "SET_ORDER_CONTAINER_SHOW",
  SET_UPDATEITEMS_SHOW: "SET_UPDATEITEMS_SHOW",
  SET_FOOTER_INFO: "SET_FOOTER_INFO",
  SET_CHEF_INFO: "SET_CHEF_INFO",
  SET_ABOUT_US_PAGE: "SET_ABOUT_US_PAGE",
  SET_CATEGORIES: "SET_CATEGORIES",
  SET_DELIVERY_COST: "SET_DELIVERY_COST",
};

const reducer = (state, action) => {
  // console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };

    case actionType.SET_FOOD_ITEMS:
      return {
        ...state,
        foodItems: action.foodItems,
      };

    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };

    case actionType.SET_CARTITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };
    case actionType.SET_ORDER_CONTAINER_SHOW:
      return {
        ...state,
        orderContainerShow: action.orderContainerShow,
      };
    case actionType.SET_UPDATEITEMS_SHOW:
      return {
        ...state,
        updateItems: action.updateItems,
      };
    case actionType.SET_ORDERS:
      return {
        ...state,
        orders: action.orders,
      };
    case actionType.SET_FOOTER_INFO:
      return {
        ...state,
        footerInfo: action.footerInfo,
      };
    case actionType.SET_CHEF_INFO:
      return {
        ...state,
        chefInfo: action.chefInfo,
      };
    case actionType.SET_ABOUT_US_PAGE:
      return {
        ...state,
        aboutUsPage: action.aboutUsPage,
      };
    case actionType.SET_CATEGORIES:
      return {
        ...state,
        categories: action.categories,
      };
    case actionType.SET_DELIVERY_COST:
      return {
        ...state,
        deliveryCost: action.deliveryCost,
      };

    default:
      return state;
  }
};

export default reducer;
