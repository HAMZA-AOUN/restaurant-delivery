import React from "react";
import { useStateValue } from "../context/StateProvider.js";

const Chef = () => {
  const [{ chefInfo }, dispatch] = useStateValue();

  return (
    <>
      {chefInfo && chefInfo.length > 0 ? (
        chefInfo.map((item) => (
          <section
            key={item?.id}
            className=" grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
          >
            <div className=" pb-2 lg:pr-0 lg:w-460 flex-1 flex flex-col items-start justify-center gap-6">
              <img src={item?.chefPhoto} alt="cheff_photo" />
            </div>

            <div
              className=" flex-1 flex 
    justify-center w-full  mt-20 lg:mt-60 md:mt-28 md:ml-10 lg:ml-4    items-start flex-col"
            >
              <h1 className="   text-3xl font-bold capitalize text-orange-700">
                Chef's Word
              </h1>
              <p
                className="p-5 pl-0 lg:mb-4 text-3xl  capitalize font-extrabold text-orange-600 relative
 transition-all ease-in-out duration-100"
              >
                What We Believe In . . .
              </p>
              <p className="text-base w-full md:w-auto lg:w-full h-auto p-5 pl-0 lg:mb-5   ">
                {item?.chefWord}
              </p>
              <p className="ml-8 mt-4 text-xl font-serif">{item?.chefName}</p>
              <img
                src={item?.chefSignature}
                alt="sign"
                className="w-40 m-2 ml-4 mb-4 lg:w-56 lg:mt-2 "
              />
            </div>
          </section>
        ))
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Chef;
