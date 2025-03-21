import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const VisaDetails = () => {
  const { id } = useParams();
  const [visaDetails, setVisaDetails] = useState({});
  const {
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
    fetch(`http://localhost:5000/visa/${id}`)
      .then((response) => response.json())
      .then((data) => setVisaDetails(data));
  }, []);

  return (
    <div className="my-20">
      <h1 className="text-4xl font-bold text-center">Visa Details</h1>
      <div className="mx-auto max-w-2xl space-y-2 mt-10 p-5 border border-gray-300 bg-gray-100 rounded-lg">
        <h2 className="text-2xl font-semibold">{country_name}</h2>
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
        <p>
          <span className="font-semibold text-lg">Description:</span>{" "}
          {description}
        </p>
        <p><span className="font-semibold text-lg">Application method:</span> {application_method}</p>
        <p className="font-semibold text-lg">Required documents:</p>
        <ul className="list-disc ml-8">
          {required_documents.map((doc, index) => (
            <li key={index}>{doc}</li>
          ))}
        </ul>
        <button className="btn bg-lime-300 mt-5">Apply For Visa</button>
      </div>
    </div>
  );
};

export default VisaDetails;
