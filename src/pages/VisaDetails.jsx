import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../auth/AuthProvider";

const VisaDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [visaDetails, setVisaDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visaModal, setVisaModal] = useState(null);

  const {
    country_image,
    country_name,
    visa_type,
    processing_time,
    required_documents = [],
    description,
    age_restriction,
    fee,
    validity,
    application_method,
  } = visaDetails;

  useEffect(() => {
    fetch(`https://rs9-a10-server.vercel.app/visa/${id}`)
      .then((response) => response.json())
      .then((data) => setVisaDetails(data));
  }, []);

  const openModal = (visa) => {
    setVisaModal(visa);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setVisaModal(null);
  };

  const handleApplyVisa = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const date = e.target.date.value;
    const fee = e.target.fee.value;

    // console.log(firstName, lastName, email, date, fee);
    const visaApplication = {
      firstName,
      lastName,
      email,
      date,
      fee,
      userEmail: user?.email,
      visaId: id,
    };

    // send data to the server
    try {
      const response = await fetch("https://rs9-a10-server.vercel.app/visa-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(visaApplication),
      });
      // .then((response) => response.json())
      // .then((data) => {
      if (response.ok) {
        Swal.fire({
          title: "Successfully Applied!",
          icon: "success",
          draggable: true,
        });
        e.target.reset();
        setVisaModal(null); // close modal
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add visa application. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
      });
    }
  };
  return (
    <div className="my-16">
      <h1 className="text-4xl font-bold text-center">Visa Details</h1>
      <div className="w-5/6 mx-auto max-w-2xl space-y-2 mt-10 p-5 border border-gray-300 bg-gray-100 rounded-lg">
        <img
          src={country_image}
          alt={country_name}
          className="w-full rounded-lg"
        />
        <h2 className="text-3xl font-semibold mt-4">{country_name}</h2>
        <p>
          <span className="font-semibold text-lg">Visa type:</span> {visa_type}
        </p>
        <p>
          <span className="font-semibold text-lg">Processing time:</span>{" "}
          {processing_time}
        </p>
        <p>
          <span className="font-semibold text-lg">Age restriction:</span>{" "}
          {age_restriction}
        </p>
        <p>
          <span className="font-semibold text-lg">Fee:</span> ${fee}
        </p>
        <p>
          <span className="font-semibold text-lg">Validity:</span> {validity}
        </p>
        <p className="font-semibold text-lg">Required documents:</p>
        <ul className="list-disc ml-8">
          {required_documents.map((doc, index) => (
            <li key={index}>{doc}</li>
          ))}
        </ul>
        <p>
          <span className="font-semibold text-lg">Description:</span>{" "}
          {description}
        </p>
        <p>
          <span className="font-semibold text-lg">Application method:</span>{" "}
          {application_method}
        </p>
        <button
          onClick={() => openModal(visaDetails)}
          className="btn bg-lime-300 mt-5"
        >
          Apply For Visa
        </button>
      </div>
      {/* modal for apply visa */}
      {isModalOpen && visaModal && (
        <div className="fixed inset-0 bg-opacity-70 flex justify-center items-center">
          <div className="bg-white p-5 rounded-lg max-w-md w-full shadow-lg">
            <h2 className="text-2xl font-semibold text-center">
              Apply for visa
            </h2>
            <form
              onSubmit={handleApplyVisa}
              className="mt-5 space-y-3 flex flex-col justify-center items-center"
            >
              <input
                name="firstName"
                type="text"
                placeholder="First Name"
                className="input"
                required
              />
              <input
                name="lastName"
                type="text"
                placeholder="Last Name"
                className="input"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input"
                required
              />
              <input
                name="date"
                type="text"
                placeholder="Applied Date"
                className="input"
                required
              />
              <input
                name="fee"
                type="text"
                placeholder="Fee"
                className="input"
                required
              />
              <div className="flex justify-between w-4/6 mt-5">
                <button className="btn bg-lime-300">Apply</button>
                <button onClick={closeModal} className="btn bg-lime-300">
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      ;
    </div>
  );
};

export default VisaDetails;
