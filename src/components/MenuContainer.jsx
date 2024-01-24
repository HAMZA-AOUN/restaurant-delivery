import React, { useEffect, useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { motion } from "framer-motion";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/StateProvider";

const MenuContainer = () => {
  const [filter1, setFilter] = useState("chicken");
  const [query, setQuery] = useState("");

  const [{ foodItems, categories }, dispatch] = useStateValue();
  /**   */

  const search = (data) => {
    if (query.length == 1) {
      return data;
    }
    if (query.length == 0 || query.length > 1) {
      return (data || []).filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.price.toLowerCase().includes(query) ||
          item.calories.toLowerCase().includes(query)
      );
    }
  };

  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p
          className="text-2xl font-semibold capitalize text-headingColor relative
         before:absolute before:rounded-lg before:content
          before:w-16 before:h-1 before:-bottom-2 before:left-0 
          before:bg-gradient-to-tr from-orange-400 to-orange-600
           transition-all ease-in-out duration-100 mr-auto"
        >
          Our Hot Dishes
        </p>

        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter1 === category.urlParamName ? "bg-cartNumBg" : "bg-card"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-cartNumBg `}
                onClick={() => setFilter(category.urlParamName)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter1 === category.urlParamName
                      ? "bg-white"
                      : "bg-cartNumBg"
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter1 === category.urlParamName
                        ? "text-textColor"
                        : "text-white"
                    } group-hover:text-textColor text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter1 === category.urlParamName
                      ? "text-white"
                      : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full lg:w-656 p-1 border-2 border-gray-300 flex items-center gap-2 rounded-lg">
          <input
            type="string"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search"
            className="w-full h-full text-lg bg-transparent outline-none border-none
             placeholder:text-gray-400 text-textColor"
          />
        </div>

        <div className="w-full">
          <RowContainer
            flag={false}
            data={search(foodItems)?.filter((n) => n.category == filter1)}
          />
        </div>
      </div>
    </section>
  );
};

export default MenuContainer;
