import PublicHeader from "../components/PublicHeader";
import Footer from "../components/Footer";
import { FiArrowRight, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Welcome() {
  return (
    <main className="overflow-hidden">
      <PublicHeader />
      <HeroSection1 />
      <HeroSection2 />
      <Footer />
    </main>
  );
}

const HeroSection1 = () => {
  const [alert, setAlert] = useState(true);
  return (
    <section className="bg-white mt-24">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        {alert && <AlertLink />}
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
          Connect. Collaborate. Create
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 ">
          Opening the artist’s creation journey to foster artist-fan community{" "}
        </p>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          {/* ActionButtons */}
          <Link
            to="/register"
            className="btn btn-gradient py-3 px-5 text-base font-medium text-center text-white rounded-lg focus:ring-4 focus:ring-primary-300 "
          >
            <span>Register</span>
            <FiArrowRight className="ml-2 align-baseline text-xl" />
          </Link>
          <Link
            to="/login"
            className="btn py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100"
          >
            <span>Login</span>
          </Link>
          {/* ActionButtons */}
        </div>
        {/* <FeaturedIn /> */}
      </div>
    </section>
  );
};

const AlertLink = () => {
  return (
    <Link
      to=""
      className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-primary-50 rounded-full hover:bg-gray-200"
      role="alert"
    >
      <span className="text-xs bg-primary-600 rounded-full bg-gradient-to-r from-primary-50 to-primary-500 bg-clip-text text-transparent px-4 py-1.5 mr-1">
        New
      </span>{" "}
      <span className="text-xs sm:text-sm font-medium">
        TracksHub is out! See what&apos;s new
      </span>
      <FiChevronRight className="ml-2 align-baseline text-lg" />
    </Link>
  );
};

const FeaturedIn = () => {
  return (
    <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
      <span className="font-semibold text-gray-400 uppercase">FEATURED IN</span>
      <p className="text-red-500 mt-8">
        ------------------------ !pending ------------------------
      </p>
      <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
        <FeaturedLink />
        <FeaturedLink />
        <FeaturedLink />
      </div>
    </div>
  );
};

const FeaturedLink = () => {
  return (
    <Link
      to=""
      className="mr-5 mb-5 lg:mb-0 hover:text-gray-800 dark:hover:text-gray-400"
    >
      {/* svg here */}
    </Link>
  );
};

const HeroSection2 = () => {
  return (
    <section className="bg-gray-900 text-white body-font">
      <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
        <HeroLeft />
        <HeroRight />
      </div>
    </section>
  );
};

const HeroLeft = () => {
  return (
    <div className="lg:flex-grow flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="tracking-wide text-3xl md:text-5xl xl:text-6xl mb-4 font-bold">
        Cloud storage & workflow tools for musicians.
      </h1>
      <p className="mb-8 leading-relaxed text-gray-400">Sync your sound</p>
      <div className="flex justify-center">
        <button className="inline-flex text-white bg-primary-500 py-2 px-4 focus:outline-none hover:bg-opacity-80 rounded text-sm">
          Get started
        </button>
      </div>
    </div>
  );
};

const HeroRight = () => {
  return (
    <div
      id="pattern"
      className="w-32 sm:w-40 lg:max-w-xl lg:w-full md:w-32 xl:w-5/6 bg-contain bg-no-repeat md:ml-48 xl:mr-16"
    >
      <div className="w-full flex gap-3 justify-center ">
        <img
          className="object-cover object-center rounded-xl "
          alt="hero"
          src="https://placehold.co/175x115"
        />
        <img
          className="object-cover object-center rounded-xl"
          alt="hero"
          src="https://placehold.co/175x115"
        />
      </div>
      <div className="w-full h- flex gap-2 justify-center items-center my-2">
        <img
          className="object-cover object-center rounded-xl"
          alt="hero"
          src="https://placehold.co/175x115"
        />
        <img
          className="object-cover object-center rounded-xl"
          alt="hero"
          src="https://placehold.co/175x115"
        />
        <img
          className="object-cover object-center rounded-xl"
          alt="hero"
          src="https://placehold.co/175x115"
        />
      </div>
      <div className="w-full flex gap-3 justify-center">
        <img
          className="object-cover object-center rounded-xl"
          alt="hero"
          src="https://placehold.co/175x115"
        />
        <img
          className="object-cover object-center rounded-xl"
          alt="hero"
          src="https://placehold.co/175x115"
        />
      </div>
      <div className="w-full flex gap-3 justify-center my-2">
        <img
          className="object-cover object-center rounded-xl"
          alt="hero"
          src="https://placehold.co/175x115"
        />
      </div>
    </div>
  );
};
