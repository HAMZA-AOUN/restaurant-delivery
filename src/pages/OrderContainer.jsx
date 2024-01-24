import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";
import { useStateValue } from "../context/StateProvider";
import HeroBg from "../../src/img/heroBg.png";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  MdPerson,
  MdEmail,
  MdShoppingBasket,
  MdLocationCity,
} from "react-icons/md";
import {
  saveOrder,
  getAllOrders,
  updateItem,
} from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import moment from "moment";
import { useLocation } from "react-router-dom";

const OrderContainer = () => {
  const [msg, setMsg] = useState(null);
  const location = useLocation();
  const { TotalPrice } = location.state;

  const [address, setAddress] = useState("");
  const [alertStatus, setAlertStatus] = useState("danger");
  const [{ cartItems, user }] = useStateValue();
  const [fields, setFields] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [{ orders }, dispatch] = useStateValue();
  const form = useRef();

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
        quantity: item.quantity,
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
    item.qty = 0;
  };

  const saveDetails = () => {
    const yourDate = new Date().toLocaleString() + "";
    setIsLoading(true);
    try {
      if (address == "") {
        setFields(true);
        setMsg("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          status: "1",
          name: user.displayName,
          email: user.email,
          goods: cartItems,
          address: address,
          date: yourDate,
          totalPrice: TotalPrice + " $",
        };
        saveOrder(data);
        setIsLoading(false);
        setFields(true);
        setMsg("Data Uploaded successfully 😊");
        setAlertStatus("success");
        setTimeout(() => {
          setFields(false);
        }, 4000);
        clearData();
      }
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
    cartItems.map((item) => updateQuantity(item));
  };

  const clearData = () => {
    setAddress("");
  };

  const fetchData = async () => {
    await getAllOrders().then((data) => {
      dispatch({
        type: actionType.SET_ORDERS,
        orders: data,
      });
    });
  };

  const sendEmail = (e) => {
    saveDetails();
    e.preventDefault();

    emailjs
      .sendForm(
        "service_a3s9awb",
        "template_30wvlqr",
        form.current,
        "E312yfjoheJ4zQCj8"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
    console.log("send");
    console.log(orders);
  };

  //const  goooood = cartItems[0].title + " : " + cartItems[0].qty;
  const myGoods = cartItems.map((i) => i.title + " : " + i.qty + "\n");
  const mySendingGoods = cartItems.map(
    (i) =>
      i.title + " , Quantity : " + i.qty + " , Price :" + i.price * i.qty + "\n"
  );
  return (
    <form
      className="w-full min-h-screen mt-6  flex items-center justify-center"
      ref={form}
      onSubmit={sendEmail}
    >
      <div
        className="w-[90%] h-full md:w-full  border border-gray-300
       rounded-lg p-4 flex flex-col items-center justify-center gap-4"
      >
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
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdPerson className="mr-5 text-2xl text-gray-700" />
          <input
            type="input"
            name="user_name"
            value={user.displayName}
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdEmail className="mr-5 text-2xl text-gray-700" />
          <input
            type="email"
            name="user_email"
            value={user.email}
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdShoppingBasket className="mr-5 text-2xl text-gray-700" />
          <textarea
            name="Goods"
            value={myGoods}
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full flex md:flex-row items-center gap-3">
          <MdLocationCity className="mr-5 text-2xl text-gray-700" />

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <textarea
              name="Addres"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="please enter your address 😊"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>

        <div className="flex items-center w-full">
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={sendEmail}
          >
            <input type="submit" value="Send" />
          </motion.button>
        </div>
      </div>
    </form>
  );
};
export default OrderContainer;
