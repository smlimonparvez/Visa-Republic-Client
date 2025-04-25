import React, { useContext } from "react";
import { AuthContext } from "../auth/AuthProvider";

const MyVisaApplications = () => {
  const { visas } = useContext(AuthContext);
  console.log(visas);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Added Visas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {visas.map((visa) => (
          <div key={visa._id} className="border p-4 rounded-lg shadow-md">
            <img
              src={visa.country_image}
              alt={visa.country_name}
              className="w-full h-32 object-cover mb-2"
            />
            <h2 className="text-xl font-bold">{visa.country_name}</h2>
            <p>Visa Type: {visa.visa_type}</p>
            <p>Processing Time: {visa.processing_time}</p>
            <p>Fee: ${visa.fee}</p>
            <p>Validity: {visa.validity}</p>
            <p>Application Method: {visa.application_method}</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleDelete(visa._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyVisaApplications;
