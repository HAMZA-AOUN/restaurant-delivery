import React, { useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import Logo from "../img/logo.png";
import Avatar from "../img/avatar.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { MdModeEditOutline } from "react-icons/md";
import { getAllfooterInfo } from "../utils/firebaseFunctions";
import { wait } from "@testing-library/user-event/dist/utils";
import { waitFor } from "@testing-library/react";

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems, orders }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const getmyOrders = async () => {
    return await (orders || []).filter(
      (item) => item.email === user.email && item.status !== "3"
    );
  };
  const myOrder = getmyOrders();

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-8 bg-primary">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-10 object-cover" alt="logo" />
          <p className=" ml-1 mb-2 text-3xl font-serif font-extrabold text-orange-500">
            yummy
          </p>
        </Link>

        <div className="flex items-center md:gap-4 lg:gap-12  ">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-24 md:gap-12 "
          >
            <li
              className="text-lg text-textColor hover:text-headingColor duration-100
             transition-all ease-in-out cursor-pointer"
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className="text-lg text-textColor hover:text-headingColor duration-100
             transition-all ease-in-out cursor-pointer"
            >
              <a href="#menu">Menu</a>
            </li>
            <li
              className="text-lg text-textColor hover:text-headingColor duration-100
             transition-all ease-in-out cursor-pointer"
            >
              <a href="#aboutUs">About Us</a>
            </li>
            <li
              className="text-lg text-textColor hover:text-headingColor duration-100
             transition-all ease-in-out cursor-pointer"
            >
              <a href="#contactUs">Contact Us</a>
            </li>
          </motion.ul>

          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
            {cartItems && cartItems.length > 0 && (
              <div
                className=" absolute -top-2 -right-2 w-5 h-5 rounded-full
               bg-cartNumBg flex items-center justify-center"
              >
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
            {myOrder && myOrder.length > 0 && (
              <div
                className=" absolute -top-0 -right-2 w-5 h-5 rounded-full
               bg-cartNumBg flex items-center justify-center"
              >
                <p className="text-xs text-white font-semibold">
                  {myOrder.length}
                </p>
              </div>
            )}
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === "aou4925@gmail.com" && (
                  <div className="flex-col">
                    <Link to={"/createItem"}>
                      <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        New Item <MdAdd />
                      </p>
                    </Link>
                    <Link to={"/orders"}>
                      <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        Orders
                      </p>
                    </Link>
                    <Link to={"/updateChef"}>
                      <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        Chef
                        <MdModeEditOutline />
                      </p>
                    </Link>
                    <Link to={"/updateFooter"}>
                      <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        Footer
                        <MdModeEditOutline />
                      </p>
                    </Link>
                    <Link to={"/updateAboutUsPage"}>
                      <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        AboutUs
                        <MdModeEditOutline />
                      </p>
                    </Link>
                  </div>
                )}
                <Link to={"/myOrders"}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    My Orders
                  </p>
                </Link>

                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className=" ml-1 mb-2 text-3xl font-serif font-extrabold text-orange-500">
            yummy
          </p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className=" w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userprofile"
            onClick={login}
          />
          {myOrder && myOrder.length > 0 && (
            <div
              className=" absolute -top-0 -left-2  md:-right-0  w-5 h-5 rounded-full
               bg-cartNumBg flex items-center justify-center"
            >
              <p className="text-xs text-white font-semibold">
                {myOrder.length}
              </p>
            </div>
          )}
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user && user.email === "aou4925@gmail.com" && (
                <div className="flex-col">
                  <Link to={"/createItem"}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      New Item <MdAdd />
                    </p>
                  </Link>
                  <Link to={"/orders"}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      Orders
                    </p>
                  </Link>
                  <Link to={"/updateChef"}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      Chef
                      <MdModeEditOutline />
                    </p>
                  </Link>
                  <Link to={"/updateFooter"}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      Footer
                      <MdModeEditOutline />
                    </p>
                  </Link>
                  <Link to={"/updateAboutUsPage"}>
                    <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      AboutUs
                      <MdModeEditOutline />
                    </p>
                  </Link>
                </div>
              )}

              <ul className="flex flex-col ">
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  <Link to="/">Home</Link>
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  <a href="#menu">Menu</a>
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  <a href="#aboutUs">About Us</a>
                </li>
                <li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  <a href="#contactUs">Contact Us</a>
                </li>
              </ul>
              <Link to={"/myOrders"}>
                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                  My Orders
                </p>
              </Link>

              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
