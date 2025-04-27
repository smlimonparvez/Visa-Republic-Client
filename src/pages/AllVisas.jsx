import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AllVisas = () => {
  const [visas, setVisas] = useState([]);
  const [filterVisaType, setFilterVisaType] = useState("All Visa");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://rs9-a10-server.vercel.app/visa")
      .then((response) => response.json())
      .then((data) => setVisas(data));
  }, []);

  const handleFilterChange = (e) => {
    setFilterVisaType(e.target.value);
  };

  const filteredVisa =
    filterVisaType === "All Visa"
      ? visas
      : visas.filter((visa) => visa.visa_type === filterVisaType);
  const visaTypes = [...new Set(visas.map((visa) => visa.visa_type))];

  const handleClickDetails = (id) => {
    navigate(`/visa-details/${id}`);
  };

  return (
    <div className="my-20 w-5/6 mx-auto">
      <h1 className="text-4xl font-bold text-center">All Visas</h1>
      <div className="flex flex-col md:flex-row gap-2 justify-between items-center mt-10">
        <h1 className="font-semibold text-lg">Filter visa based types:</h1>
        <select
          onChange={handleFilterChange}
          value={filterVisaType}
          className="select select-bordered w-1/2 md:w-1/5"
        >
          <option value="All Visa">All Visa</option>
          {visaTypes.map((visaType, index) => (
            <option key={index} value={visaType}>
              {visaType}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
        {filteredVisa.map((visa) => (
          <div
            key={visa._id}
            className="p-5 space-y-2 border border-gray-300 bg-gray-100 rounded-lg shadow-md"
          >
            <img
              src={visa.country_image}
              alt={visa.country_name}
              className="w-full rounded-lg h-40"
            />
            <h2 className="text-2xl font-semibold">{visa.country_name}</h2>
            <p>
              <span className="font-semibold text-lg">Visa type:</span>{" "}
              {visa.visa_type}
            </p>
            <p>
              <span className="font-semibold text-lg">Processing time:</span>{" "}
              {visa.processing_time}
            </p>
            <p>
              <span className="font-semibold text-lg">Age restriction:</span>{" "}
              {visa.age_restriction}
            </p>
            <p>
              <span className="font-semibold text-lg">Fee:</span> ${visa.fee}
            </p>
            <p>
              <span className="font-semibold text-lg">Validity:</span>{" "}
              {visa.validity}
            </p>
            <button
              onClick={() => {
                handleClickDetails(visa._id);
              }}
              className="btn bg-lime-300 mt-5"
            >
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllVisas;
