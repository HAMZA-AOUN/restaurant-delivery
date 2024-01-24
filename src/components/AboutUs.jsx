import React from "react";
import { Link } from "react-router-dom";
import c3 from "../img/c3.png";

const AboutUs = () => (
  <section
    className=" grid grid-cols-1 md:grid-cols-2 gap-2 w-full "
    id="aboutUs"
  >
    <div
      className=" flex-1 flex 
      justify-center w-full mt-20 lg:mt-20 md:mt-28 md:ml-6 lg:ml-4
        items-start flex-col"
    >
      <h1 className="   text-3xl font-bold capitalize text-orange-700">
        About Us
      </h1>
      <p
        className="p-5 pl-0 md:pb-0 lg:mb-4 text-3xl  capitalize font-extrabold text-orange-600 relative
 transition-all ease-in-out duration-100"
      >
        Enjoy Our History . . .
      </p>
      <p className="text-base w-full md:w-auto lg:w-full h-auto pl-0 p-5 lg:mb-5   ">
        Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit Auctor Sit .
        Auctor Sit Iaculis In Arcu. Vulputate Nulla Lobortis Mauris Eget Sit.
        Nulla Scelerisque Scelerisque Congue Ac Consequat, Aliquam Molestie
        Lectus Eu. Congue Iaculis Integer Curabitur Semper Sit Nunc. . .
      </p>
      <Link
        to={"/aboutUsPage"}
        className="bg-gradient-to-br from-orange-400 to-orange-500   w-auto h-auto p-2 md:mb-4
          rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
      >
        Know More
      </Link>
    </div>
    <div
      className=" pb-2 lg:pr-0 lg:w-full md:w-full md:ml-8 md:mt-10 lg:mt-10
       flex-1 flex flex-col items-start justify-center gap-6"
    >
      <img src={c3} alt="about_us" />
    </div>
  </section>
);

export default AboutUs;
