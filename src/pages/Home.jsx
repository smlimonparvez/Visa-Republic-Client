import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link, useNavigate } from "react-router";

const Home = () => {
  const [limitedVisa, setLimitedVisa] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/visa-limited")
      .then((response) => response.json())
      .then((data) => setLimitedVisa(data));
  }, []);

  const handleClickDetails = (id) => {
    navigate(`/visa-details/${id}`);
  };

  return (
    <div className="my-16">
      <div className="w-5/6 mx-auto mt-16">
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          <SwiperSlide>
            <div
              className=" py-24 px-10 shadow-xl rounded-xl"
              style={{
                backgroundImage:
                  "url(https://i.postimg.cc/DyKgBggR/green-card-passport-assortment-top-view.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-center space-y-4 ">
                <h1 className="text-3xl md:text-6xl text-base-300 font-bold animate__animated animate__bounce animate__delay-2s">
                  IMMIGRATION AND VISA <br className="hidden md:block" />{" "}
                  CONSULTATION
                </h1>
                <p className="md:text-base font-semibold text-gray-100">
                  Expand your knowledge of grammar and sentence structure.{" "}
                  <br className="hidden md:block" />
                  Applying for a visa and getting the approval is tougher than
                  it looks. <br className="hidden md:block" /> Illegal migration
                  or illegal documents are increasing day by day.
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
                  "url(https://i.postimg.cc/1tnHY7b1/visa-application-form-tablet.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-center space-y-4 ">
                <h1 className="text-3xl md:text-6xl text-gray-700 font-bold">
                  We Are the Most Trusted <br className="hidden md:block" />{" "}
                  Visa Consultancy Agency
                </h1>
                <p className="md:text-base font-semibold text-gray-100">
                  Applying for a visa and getting the approval is tougher than
                  it looks. <br className="hidden md:block" />
                  Illegal migration or illegal documents are increasing day by
                  day.
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
                backgroundImage: "url(https://i.postimg.cc/nrq1njHd/27957.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="text-center space-y-4 ">
                <h1 className="text-3xl md:text-6xl text-gray-700 font-bold">
                  We make the Visa <br className="hidden md:block" /> process
                  fastrer and easier.
                </h1>
                <p className="md:text-base font-semibold text-gray-100">
                  Applying for a visa and getting the approval is tougher than
                  it looks. <br className="hidden md:block" /> Illegal migration
                  or illegal documents are increasing day by day.
                </p>
                <button className="btn mt-5 text-xl">
                  Book Consulting Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      {/* limited visa */}
      <h1 className="text-3xl md:text-5xl font-bold text-center mt-10">
        Visa Cards
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 w-5/6 mx-auto">
        {limitedVisa.map((visa) => (
          <div
            key={visa._id}
            className="p-5 space-y-2 border border-gray-300 bg-gray-100 rounded-lg shadow-md"
          >
            <img
              src={visa.country_image}
              alt={visa.country_name}
              className="w-full rounded-lg"
            />
            <h2 className="text-2xl font-semibold mt-5">{visa.country_name}</h2>
            <p>
              <span className="font-semibold text-lg">Visa type:</span>{" "}
              {visa.visa_type}
            </p>
            <p>
              <span className="font-semibold text-lg">Processing time:</span>{" "}
              {visa.processing_time}
            </p>
            <p>
              <span className="font-semibold text-lg">Fee:</span> ${visa.fee}
            </p>
            <p>
              <span className="font-semibold text-lg">Validity:</span>{" "}
              {visa.validity}
            </p>
            <p>
              <span className="font-semibold text-lg">Application Method:</span>{" "}
              {visa.application_method}
            </p>
            <button
              onClick={() => {
                handleClickDetails(visa._id);
              }}
              className="btn rounded-lg mt-5 text-lg bg-lime-300 hover:bg-lime-400"
            >
              See Details
            </button>
          </div>
        ))}
      </div>

      {/* see all visa */}
      <div className="flex items-center justify-center mt-10">
          <Link
            to="/all-visas"
            className="btn text-lg bg-lime-300 hover:bg-lime-400"
          >
            See All The Visa
          </Link>
        </div>

      {/* why choose us */}
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

      {/* testimonials */}
      <div className="w-5/6 mx-auto mt-16">
        <h1 className="text-3xl md:text-5xl font-bold text-center mb-10">
          Client Testimonials
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="p-5 space-y-2 border border-gray-300 bg-gray-100 rounded-lg shadow-md">
            <p>
              "I had a great experience with this visa consultancy. They made
              the process so easy and stress-free!"
            </p>
            <h2 className="text-xl font-semibold">John Doe</h2>
          </div>
          <div className="p-5 space-y-2 border border-gray-300 bg-gray-100 rounded-lg shadow-md">
            <p>
              "The team was very knowledgeable and helped me every step of the
              way. I highly recommend their services!"
            </p>
            <h2 className="text-xl font-semibold">Jane Smith</h2>
          </div>
          <div className="p-5 space-y-2 border border-gray-300 bg-gray-100 rounded-lg shadow-md">
            <p>
              "I was impressed with their professionalism and attention to
              detail. They made my visa application a breeze!"
            </p>
            <h2 className="text-xl font-semibold">Michael Johnson</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
