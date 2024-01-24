import React from "react";
import { FiFacebook, FiTwitter, FiInstagram } from "react-icons/fi";
import "./Footer.css";

import { motion } from "framer-motion";
import { useStateValue } from "../../context/StateProvider";

const Footer = () => {
  const [{ footerInfo }, dispatch] = useStateValue();

  return (
    <div
      className=" app__footer section__padding bg-orange-200 rounded-md"
      id="contactUs"
    >
      {footerInfo && footerInfo.length > 0 ? (
        footerInfo.map((item) => (
          <div className="app__footer-links">
            <div className="app__footer-links_contact">
              <h1
                className="mb-2 text-3xl font-semibold capitalize text-headingColor relative
 transition-all ease-in-out duration-100"
              >
                Contact Us
              </h1>
              <p className="">{item?.location}</p>
              <p className="">{item?.phone1}</p>
              <p className="">{item?.phone2}</p>
            </div>

            <div className="app__footer-links_logo ">
              <p className="  text-base">
                &quot;The best way to find yourself is to lose yourself in the
                service of others.&quot;
              </p>

              <div className="justify-center app__footer-links_icons flex">
                <a href={item?.facebookPage}>
                  {" "}
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    className="w-12 min-w-[40px] h-12 min-h-[40px] flex items-center
             m-5  bg-gradient-to-br from-orange-400 to-orange-500
             rounded-full
            hover:shadow-md hover:shadow-orange-400  cursor-pointer"
                  >
                    <FiFacebook className="w-full" />
                  </motion.div>
                </a>
                <a href={item?.twitterPage}>
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    className="w-12 min-w-[40px] h-12 min-h-[40px] flex items-center
            m-5  bg-gradient-to-br from-orange-400 to-orange-500
            rounded-full
           hover:shadow-md hover:shadow-orange-400  cursor-pointer"
                  >
                    <FiTwitter className="w-full" />
                  </motion.div>
                </a>
                <a href={item?.instagramPage}>
                  <motion.div
                    whileTap={{ scale: 0.75 }}
                    className="w-12 min-w-[40px] h-12 min-h-[40px] flex items-center
            m-5  bg-gradient-to-br from-orange-400 to-orange-500
            rounded-full
           hover:shadow-md hover:shadow-orange-400  cursor-pointer"
                  >
                    <FiInstagram className="w-full" />
                  </motion.div>
                </a>
              </div>
            </div>

            <div className="app__footer-links_work">
              <h1
                className="mb-2 text-3xl font-semibold capitalize text-headingColor relative
          transition-all ease-in-out duration-100"
              >
                Working Hours
              </h1>
              <p className="">{item?.workingDays}</p>
              <p className="">{item?.workingHours}</p>
            </div>
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Footer;
