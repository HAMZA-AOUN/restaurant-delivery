import React from "react";
import Footer from "../components/Footer/Footer";
import { Link } from "react-router-dom";

import { useStateValue } from "../context/StateProvider";
const AboutUsPage = () => {
  const [{ aboutUsPage }] = useStateValue();
  return (
    <div
      className=" w-full h-auto flex flex-col items-center justify-center "
      id="home"
    >
      {aboutUsPage && aboutUsPage.length > 0 ? (
        aboutUsPage.map((item) => (
          <section
            key={item?.id}
            className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
            id="aboutUs"
          >
            <div
              className=" flex-1 flex 
      justify-center w-full mt-20 lg:mt-20 md:mt-28
        items-start flex-col"
            >
              <h1 className="   text-3xl font-bold capitalize text-orange-700">
                {item?.title1}
              </h1>
              <p
                className="p-5 pl-0 md:pb-0 lg:mb-4 text-3xl  capitalize font-extrabold text-orange-600 relative
 transition-all ease-in-out duration-100"
              >
                {item?.title2}
              </p>
              <p className="text-base w-full md:w-auto lg:w-full h-auto pl-0 p-5 lg:mb-5   ">
                {item?.describtion}
              </p>
            </div>
            <div className=" md:ml-10  lg:m-5 md:mt-20  md:w-full md:m-5 md:pr-4 lg:w-full flex-1 flex flex-col items-start justify-center gap-6">
              <img
                className="w-full rounded-3xl"
                src={item?.imageAsset}
                alt="love1"
              />
            </div>
          </section>
        ))
      ) : (
        <div></div>
      )}
      <Footer />
    </div>
  );
};

export default AboutUsPage;
