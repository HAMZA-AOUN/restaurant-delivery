import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import { MdLocationOn, MdPhone, MdWork, MdTimer } from "react-icons/md";
import { getAllfooterInfo, updateFooter } from "../utils/firebaseFunctions";
import { actionType } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

const UpdateFooter = () => {
  const [{ footerInfo }, dispatch] = useStateValue();
  const [location, setLocation] = useState(footerInfo[0].location);
  const [phone1, setPhone1] = useState(footerInfo[0].phone1);
  const [phone2, setPhone2] = useState(footerInfo[0].phone2);
  const [facebookPage, setFacebookPage] = useState(footerInfo[0].facebookPage);
  const [instagramPage, setInstagramPage] = useState(
    footerInfo[0].instagramPage
  );
  const [twitterPage, setTwitterPage] = useState(footerInfo[0].twitterPage);
  const [workingDays, setWorkingDays] = useState(footerInfo[0].workingDays);
  const [workingHours, setWorkingHours] = useState(footerInfo[0].workingHours);
  const [fields, setFields] = useState(false);

  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateDetails = () => {
    console.log("ali");
    setIsLoading(true);
    try {
      console.log("ali1");
      const data = {
        id: "uHIUxIyHlaKK9FeXXLWP",
        location: location,
        phone1: phone1,
        phone2: phone2,
        facebookPage: facebookPage,
        instagramPage: instagramPage,
        twitterPage: twitterPage,
        workingDays: workingDays,
        workingHours: workingHours,
      };
      updateFooter("uHIUxIyHlaKK9FeXXLWP", data);
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
    setLocation("");
    setPhone1("");
    setPhone2("");
    setFacebookPage("");
    setInstagramPage("");
    setTwitterPage("");
    setWorkingDays("");
    setWorkingHours("");
  };

  const fetchData = async () => {
    await getAllfooterInfo().then((data) => {
      dispatch({
        type: actionType.SET_FOOTER_INFO,
        footerInfo: data,
      });
    });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-[90%] md:w-[50%] border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
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
          <MdLocationOn className="mr-2 text-xl text-gray-700" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Our Location"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdPhone className="mr-2 text-xl text-gray-700" />
          <input
            type="text"
            value={phone1}
            onChange={(e) => setPhone1(e.target.value)}
            placeholder="Our Phone 1"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdPhone className="mr-2 text-xl text-gray-700" />
          <input
            type="text"
            value={phone2}
            onChange={(e) => setPhone2(e.target.value)}
            placeholder="Our Phone 2"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <FiFacebook className="mr-2 text-xl text-gray-700" />
          <input
            type="text"
            value={facebookPage}
            onChange={(e) => setFacebookPage(e.target.value)}
            placeholder="Our Facebook page"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <FiInstagram className="mr-2 text-xl text-gray-700" />
          <input
            type="text"
            value={instagramPage}
            onChange={(e) => setInstagramPage(e.target.value)}
            placeholder="Our Instagram page"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <FiTwitter className="mr-2 text-xl text-gray-700" />
          <input
            type="text"
            value={twitterPage}
            onChange={(e) => setTwitterPage(e.target.value)}
            placeholder="Our Twitter page"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdWork className="mr-2 text-xl text-gray-700" />
          <input
            type="text"
            value={workingDays}
            onChange={(e) => setWorkingDays(e.target.value)}
            placeholder="Our working days"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdTimer className="mr-2 text-xl text-gray-700" />
          <input
            type="text"
            value={workingHours}
            onChange={(e) => setWorkingHours(e.target.value)}
            placeholder="Our working hours"
            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="flex items-center w-full">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={updateDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateFooter;
