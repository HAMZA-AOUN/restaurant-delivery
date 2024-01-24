import React from "react";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { MdDelete } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";

import {
  deleteOrder,
  getAllOrders,
  updateOrderStatus,
  updateItem,
} from "../utils/firebaseFunctions";
import { GiCampCookingPot, GiCube } from "react-icons/gi";
import { MdDirectionsBike } from "react-icons/md";
import { useState } from "react";
import { wait } from "@testing-library/user-event/dist/utils";

const Orders = () => {
  const [{ orders }, dispatch] = useStateValue();
  const [status, setStatus] = useState("");
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  const search = (data) => {
    const data1 = (data || []).filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.status.toLowerCase().includes(query)
    );
    return data1;
  };
  const orders1 = search(orders);

  const updateQuantity = (item) => {
    setIsLoading(true);
    try {
      const data = {
        id: item.id,
        title: item.title,
        imageURL: item.imageURL,
        category: item.category,
        calories: item.calories,
        qty: 0,
        price: item.price,
        quantity: item.quantity + item.qty,
      };

      updateItem(item.id, data);
      setIsLoading(false);
      setFields(true);
      setMsg("Data Uploaded successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
      clearData();
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };

  const deleteorder = (id, status, goods) => {
    console.log("1");
    const i = status;
    if (i !== "3") {
      console.log("2");
      goods.map((item) => updateQuantity(item));
    }
    console.log("3");
    wait(4000);
    console.log("4");
    deleteOrder(id);
    console.log("5");
  };

  const deleteDeliveredOrders = () => {
    orders.map((item) => {
      const i = item.status;
      if (i == "3") {
        deleteOrder(item.id);
      }
    });

    //deliveredOrders.map((item) => deleteOrder(item.id));
  };

  const updateStatus = (item) => {
    setIsLoading(true);
    try {
      const data = {
        id: item?.id,
        address: item?.address,
        date: item?.date,
        email: item?.email,
        goods: item?.goods,

        name: item?.name,
        totalPrice: item?.totalPrice,
        status: status,
      };
      updateOrderStatus(item.id, data);
      setIsLoading(false);
      setFields(true);
      setMsg("Data Uploaded successfully 😊");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
      clearData();
    } catch (error) {
      console.log(error);
      setFields(true);
      setMsg("Error while uploading : Try AGain 🙇");
      setAlertStatus("danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }

    fetchData();
  };

  const clearData = () => {
    setStatus("");
  };

  const fetchData = async () => {
    await getAllOrders().then((data) => {
      dispatch({
        type: actionType.SET_ORDERS,
        orders: data,
      });
    });
  };

  return (
    <div className=" w-full min-h-screen items-center justify-center ">
      {fields && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${
            alertStatus === "danger"
              ? "bg-red-400 text-red-800"
              : "bg-emerald-400 text-emerald-800"
          }`}
        >
          {msg}
        </motion.p>
      )}
      {/* desktop & tablet */}
      <div className="hidden md:flex  items-center gap-2">
        <div className="mt-4 items-center flex ">
          <p
            className="w-40  text-2xl mb-8 mt-4 font-semibold capitalize text-headingColor relative
         before:absolute before:rounded-lg before:content
          before:w-16 before:h-1 before:-bottom-2 before:left-0 
          before:bg-gradient-to-tr from-orange-400 to-orange-600
           transition-all ease-in-out duration-100 mr-auto"
          >
            Our Orders :
          </p>
        </div>

        <div className=" w-full p-1 border-2 border-gray-300 flex items-center gap-2 rounded-lg">
          <input
            type="string"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full h-full text-lg bg-transparent outline-none border-none
             placeholder:text-gray-400 text-textColor"
          />
        </div>

        <motion.p
          whileTap={{ scale: 0.75 }}
          className="w-40 md:ml-4  mt-4 flex justify-center items-center gap-2  py-1 px-2 my-2
           bg-gray-200
           rounded-md hover:shadow-md  cursor-pointer text-headingColor font-medium text-xl"
          onClick={deleteDeliveredOrders}
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {/* mobile */}
      <div className=" md:hidden    ">
        <div className="flex w-full items-center justify-center ">
          <div className="mt-4 items-center flex ">
            <p
              className="w-40  text-2xl mb-8 mt-4 font-semibold capitalize text-headingColor relative
         before:absolute before:rounded-lg before:content
          before:w-16 before:h-1 before:-bottom-2 before:left-0 
          before:bg-gradient-to-tr from-orange-400 to-orange-600
           transition-all ease-in-out duration-100 mr-auto"
            >
              Our Orders :
            </p>
          </div>
          <div className="w-full"></div>
          <div className="">
            <motion.p
              whileTap={{ scale: 0.75 }}
              className="w-40 md:ml-4  mt-4 flex justify-center items-center gap-2  py-1 px-2 my-2 bg-gray-200
           rounded-md hover:shadow-md  cursor-pointer text-headingColor font-medium text-xl"
              onClick={deleteDeliveredOrders}
            >
              Clear <RiRefreshFill />
            </motion.p>
          </div>
        </div>

        <div className=" w-full p-1 border-2 border-gray-300 flex items-center gap-2 rounded-lg">
          <input
            type="string"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full h-full text-lg bg-transparent outline-none border-none
             placeholder:text-gray-400 text-textColor"
          />
        </div>
      </div>

      <div className=" ">
        {orders1 && orders1.length > 0 ? (
          orders1.map((item) => (
            <div
              key={item?.id}
              className="mt-4 p-5 w-full h-auto  bg-white rounded-md shadow-md"
            >
              <div className="flex justify-end items-end">
                {" "}
                <motion.div
                  whileTap={{ scale: 0.75 }}
                  className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center
                 cursor-pointer hover:shadow-md "
                  onClick={() => {
                    deleteorder(item?.id, item?.status, item?.goods);
                  }}
                >
                  <MdDelete className=" text-white" />
                </motion.div>
              </div>
              <div className="w-full md:flex justify-start items-start gap-4 ">
                <p className="mb-2 text-base text-cartTotal font-bold">
                  {item?.name}
                </p>

                <p className=" mb-2 text-base text-cartTotal font-bold">
                  {item?.email}{" "}
                </p>

                <p className="text-base text-cartTotal font-bold">
                  {item?.date}{" "}
                </p>
              </div>

              <div className="">
                <p className="mb-1 mt-1 text-base text-red-600 font-bold">
                  Address :
                </p>
                <p className="mr-2 text-base text-cartTotal font-semibold">
                  {item?.address}{" "}
                </p>
              </div>
              <p className=" mb-1 mt-1 text-base text-red-600 font-bold">
                Goods :
              </p>

              {item.goods.map((i) => (
                <div key={i?.id} className=" md:flex gap-4">
                  <p className=" text-base text-orange-500 font-semibold">
                    {i?.title} :
                  </p>
                  <div className="flex">
                    <p className=" mr-4 text-base text-cartTotal font-semibold">
                      Quantity : {i?.qty}
                    </p>
                    <p className="flex text-base text-cartTotal font-semibold">
                      Price : {i?.qty * i?.price}
                    </p>
                  </div>
                </div>
              ))}
              <p className=" mb-1 mt-1 text-base text-red-600 font-bold">
                Total Price : {item?.totalPrice}
              </p>

              <div className="md:flex ">
                <div className="flex">
                  <p className=" mb-1 mt-2 text-base text-red-600 font-bold">
                    Status :
                  </p>
                  {item?.status == 1 && (
                    <div className="flex ml-4 items-center justify-center gap-4">
                      <p className="text-base text-cartTotal font-semibold bg-orange-400 p-1 rounded-md">
                        Cooking
                      </p>
                      <GiCampCookingPot className="text-4xl text-orange-600" />
                    </div>
                  )}
                  {item?.status == 2 && (
                    <div className="flex ml-4 items-center justify-center gap-4">
                      <p className="text-base text-cartTotal font-semibold bg-orange-400 p-1 rounded-md">
                        On Way
                      </p>
                      <MdDirectionsBike className="text-4xl text-orange-600" />
                    </div>
                  )}
                  {item?.status == 3 && (
                    <div className="flex ml-4 items-center justify-center gap-4">
                      <p className="text-base text-cartTotal font-semibold bg-green-500 p-1 rounded-md">
                        Delivered
                      </p>
                      <GiCube className="text-4xl text-green-500" />
                    </div>
                  )}
                </div>

                <div className="flex mt-2 md:mt-0">
                  <p className="mt-2 md:ml-2 text-base text-red-600 font-bold">
                    Edit Status :{" "}
                  </p>
                  <div className="ml-2 p-1 border-2 border-gray-300 flex items-center gap-2 rounded-lg">
                    <input
                      type="string"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      placeholder=""
                      className="w-20 h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                    />
                  </div>
                  <div className="flex items-center w-auto">
                    <button
                      type="button"
                      className="ml-2 p-1 w-auto md:w-auto border-none
                     outline-none bg-emerald-500 px-4
                      rounded-lg text-lg text-white font-semibold"
                      onClick={() => {
                        updateStatus(item);
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex w-full items-center justify-center">
            <p className=" text-2xl mt-4 font-semibold capitalize text-headingColor">
              no orders
            </p>
          </div>
        )}{" "}
      </div>
    </div>
  );
};

export default Orders;
