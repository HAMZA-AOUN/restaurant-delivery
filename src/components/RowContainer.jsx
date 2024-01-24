import React, { useEffect, useRef, useState } from "react";
import { MdShoppingBasket, MdDelete, MdModeEditOutline } from "react-icons/md";
import { motion } from "framer-motion";
import NotFound from "../img/NotFound.svg";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { deleteItem } from "../utils/firebaseFunctions";
import { Link } from "react-router-dom";

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainer = useRef();

  const [items, setItems] = useState([]);

  const [{ user, cartItems, updateItems }, dispatch] = useStateValue();

  const addToCart1 = (item) => {
    if (item.quantity >= 0) {
      item.qty += 1;
    }
    if (item.quantity > 0) {
      item.quantity = item.quantity - 1;
    }
    if (item.qty === 1) {
      setItems([...cartItems, item]);
    }
  };

  const addtocart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    rowContainer.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addtocart();
  }, [items]);

  /*const showUpdateItems = () => {
    dispatch({
      type: actionType.SET_UPDATEITEMS_SHOW,
      updateItems: !updateItems,
    });
    console.log(updateItems);
    console.log("hhhhh");
  };*/

  //_________________________

  //_________________________

  return (
    <div
      ref={rowContainer}
      className={`w-full  flex items-center gap-3  my-12 scroll-smooth  ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[195px] min-w-[275px] md:w-300 md:min-w-[300px]  bg-cardOverlay rounded-lg py-2 px-4  my-12 backdrop-blur-lg hover:drop-shadow-lg flex flex-col items-center justify-evenly relative"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                className="w-40 h-40 -mt-8 drop-shadow-2xl"
                whileHover={{ scale: 1.2 }}
              >
                <img
                  src={item?.imageURL}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </motion.div>

              {item.quantity > 0 && (
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                  onClick={() => {
                    addToCart1(item);
                  }}
                >
                  <MdShoppingBasket className="text-white" />
                </motion.div>
              )}
            </div>

            <div className="w-full flex flex-col items-end justify-end -mt-8">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories} Calories
              </p>
              <p className="mt-1 text-sm text-gray-500">
                <span className="text-base  text-headingColor font-semibold">
                  {item?.quantity}
                </span>{" "}
                Quantity
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-sm text-red-500">$</span> {item?.price}
                </p>
              </div>
              {user && user.email === "aou4925@gmail.com" && (
                <div className="items-start justify-start flex gap-5  mr-28 lg:mr-36 md:mr-36 mb-2 ">
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                    onClick={() => {
                      deleteItem(item.id);
                    }}
                  >
                    <MdDelete className="text-white" />
                  </motion.div>
                  <Link to={"/updateItem"} state={{ currentDataID: item }}>
                    <motion.div
                      whileTap={{ scale: 0.75 }}
                      className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md -mt-8"
                    >
                      <MdModeEditOutline className="text-white" />
                    </motion.div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img src={NotFound} className="h-340" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
