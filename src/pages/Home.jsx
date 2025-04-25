import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const Home = () => {
  return (
    <div className="my-32">
      <div className="w-5/6 mx-auto mt-16">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide>
            <div
              className=" py-24 px-10 shadow-xl rounded-xl"
              style={{
                backgroundImage:
                  "url(https://i.postimg.cc/VkV0WnzY/close-up-cartoon-character-boy-reading-min.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-center space-y-4 ">
                <h1 className="text-3xl md:text-6xl text-gray-100 font-bold animate__animated animate__bounce animate__delay-2s">
                  IMMIGRATION AND VISA <br className="hidden md:block" />{" "}
                  CONSULTATION
                </h1>
                <p className="md:text-base font-semibold text-gray-100">
                  Expand your knowledge of grammar and sentence structure.{" "}
                  <br className="hidden md:block" />
                  Applying for a visa and getting the approval is tougher than
                  it looks. Illegal migration or illegal documents are
                  increasing day by day.
                </p>
                <button className="btn mt-5 text-xl">
                  Book Consulting Now
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className=" py-24 px-10 shadow-xl rounded-xl"
              style={{
                backgroundImage:
                  "url(https://i.postimg.cc/wT9Nq9Wd/close-up-man-smiling-while-reading-min.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-center space-y-4 ">
                <h1 className="text-3xl md:text-6xl text-gray-100 font-bold">
                  We Are the Most Trusted <br className="hidden md:block" />{" "}
                  Visa Consultancy Agency
                </h1>
                <p className="md:text-base font-semibold text-gray-100">
                  Applying for a visa and getting the approval is tougher than
                  it looks. Illegal migration or illegal documents are
                  increasing day by day.
                </p>
                <button className="btn mt-5 text-xl">
                  Book Consulting Now
                </button>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className=" py-24 px-10 shadow-xl rounded-xl"
              style={{
                backgroundImage:
                  "url(https://i.postimg.cc/htj7mpWy/front-view-man-reading-book-min.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-center space-y-4 ">
                <h1 className="text-3xl md:text-6xl text-gray-100 font-bold">
                  We make the Visa <br className="hidden md:block" /> process
                  fastrer and easier.
                </h1>
                <p className="md:text-base font-semibold text-gray-100">
                  Applying for a visa and getting the approval is tougher than
                  it looks. Illegal migration or illegal documents are
                  increasing day by day.
                </p>
                <button className="btn mt-5 text-xl">
                  Book Consulting Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="w-5/6 mx-auto mt-16">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
          Why Choose Us?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 space-y-2 border border-gray-300 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Expert Guidance</h2>
            <p>
              Our team of experts provides personalized guidance to ensure a
              smooth visa application process.
            </p>
          </div>
          <div className="p-5 space-y-2 border border-gray-300 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Comprehensive Services</h2>
            <p>
              We offer a wide range of services, including document review,
              application submission, and interview preparation.
            </p>
          </div>
          <div className="p-5 space-y-2 border border-gray-300 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Client Satisfaction</h2>
            <p>
              Our clients' satisfaction is our top priority. We strive to exceed
              expectations at every step of the process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
