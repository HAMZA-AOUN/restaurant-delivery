import React from "react";
import { useStateValue } from "../context/StateProvider";
import { GiCampCookingPot, GiCube } from "react-icons/gi";
import { MdDirectionsBike } from "react-icons/md";

const MyOrders = () => {
  const [{ orders, user }, dispatch] = useStateValue();
  //const myOrders = orders.map((item) => (item.email = user.email));

  return (
    <div className=" w-full min-h-screen items-center justify-center ">
      <p
        className="text-2xl mb-8 mt-4 font-semibold capitalize text-headingColor relative
         before:absolute before:rounded-lg before:content
          before:w-16 before:h-1 before:-bottom-2 before:left-0 
          before:bg-gradient-to-tr from-orange-400 to-orange-600
           transition-all ease-in-out duration-100 mr-auto"
      >
        My Orders :
      </p>

      <div className=" ">
        {orders && orders.length > 0 && orders ? (
          orders.map(
            (item) =>
              item.email === user.email && (
                <div
                  key={item?.id}
                  className="mt-4 p-5 w-full h-auto  bg-white rounded-md shadow-md"
                >
                  <div className="flex justify-end items-end"> </div>
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
                </div>
              )
          )
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

export default MyOrders;
