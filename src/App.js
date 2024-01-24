import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AboutUsPage from "./pages/AboutUsPage";
import { Header, MainContainer } from "./components";
import {
  OrderContainer,
  Orders,
  UpdateChef,
  UpdateFooter,
  MyOrders,
  UpdateAboutUsPage,
  CreateContainer,
} from "./pages";
import { useStateValue } from "./context/StateProvider";
import {
  getAllFoodItems,
  getAllOrders,
  getAllfooterInfo,
  getAllChefInfo,
  getAllAboutUsPageItems,
  getCategories,
  getDeliveryCost,
} from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import UpdateItem from "./pages/UpdateItem";
//import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [
    {
      foodItems,
      orders,
      footerInfo,
      chefInfo,
      aboutUsPage,
      categories,
      deliveryCost,
    },
    dispatch,
  ] = useStateValue();

  const fetchDeliveryCost = async () => {
    await getDeliveryCost().then((data) => {
      dispatch({
        type: actionType.SET_DELIVERY_COST,
        deliveryCost: data,
      });
    });
  };

  const fetchCategories = async () => {
    await getCategories().then((data) => {
      dispatch({
        type: actionType.SET_CATEGORIES,
        categories: data,
      });
    });
  };

  const fetchOrdersData = async () => {
    await getAllOrders().then((data) => {
      dispatch({
        type: actionType.SET_ORDERS,
        orders: data,
      });
    });
  };

  const fetchAboutUsPageData = async () => {
    await getAllAboutUsPageItems().then((data) => {
      dispatch({
        type: actionType.SET_ABOUT_US_PAGE,
        aboutUsPage: data,
      });
    });
  };

  const fetchFooterInfo = async () => {
    await getAllfooterInfo().then((data) => {
      dispatch({
        type: actionType.SET_FOOTER_INFO,
        footerInfo: data,
      });
    });
  };

  const fetchChefInfo = async () => {
    await getAllChefInfo().then((data) => {
      dispatch({
        type: actionType.SET_CHEF_INFO,
        chefInfo: data,
      });
    });
  };

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };

  useEffect(() => {
    fetchData();
    fetchOrdersData();
    fetchFooterInfo();
    fetchChefInfo();
    fetchAboutUsPageData();
    fetchCategories();
    fetchDeliveryCost();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Header />

        <main className="mt-14 md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/orederContainer" element={<OrderContainer />} />
            <Route path="/updateItem" element={<UpdateItem />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/updateChef" element={<UpdateChef />} />
            <Route path="/updateFooter" element={<UpdateFooter />} />
            <Route path="/aboutUsPage" element={<AboutUsPage />} />
            <Route path="/updateAboutUsPage" element={<UpdateAboutUsPage />} />
            <Route path="/myOrders" element={<MyOrders />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
