import React, { useState } from "react";
import Swal from "sweetalert2";

const AddVisa = () => {
  const [formData, setFormData] = useState({
    country_image: "",
    country_name: "",
    visa_type: "",
    processing_time: "",
    required_documents: [],
    description: "",
    age_restriction: "",
    fee: "",
    validity: "",
    application_method: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        required_documents: [...formData.required_documents, value],
      });
    } else {
      setFormData({
        ...formData,
        required_documents: formData.required_documents.filter(
          (doc) => doc !== value
        ),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/visa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        Swal.fire({
          title: "Visa added successfully!",
          icon: "success",
          draggable: true,
        });
        e.target.reset();
        // console.log("Visa added:", await response.json());
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add visa. Please try again.",
        });
      }
    } catch (error) {
      // console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 m-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Add Visa Information
        </h2>

        {/* Country Image */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Country Image URL:
          </label>
          <input
            type="text"
            name="country_image"
            value={formData.country_image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Country Name */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Country Name:
          </label>
          <input
            type="text"
            name="country_name"
            value={formData.country_name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Visa Type */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Visa Type:
          </label>
          <select
            name="visa_type"
            value={formData.visa_type}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Visa Type</option>
            <option value="Tourist Visa">Tourist Visa</option>
            <option value="Student Visa">Student Visa</option>
            <option value="Business Visa">Business Visa</option>
          </select>
        </div>

        {/* Processing Time */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Processing Time:
          </label>
          <input
            type="text"
            name="processing_time"
            value={formData.processing_time}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Required Documents */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Required Documents:
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="required_documents"
                value="Valid passport"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Valid Passport
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="required_documents"
                value="Visa application form"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Visa Application Form
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="required_documents"
                value="Recent passport-sized photograph"
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              Recent Passport-Sized Photograph
            </label>
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
          />
        </div>

        {/* Age Restriction */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Age Restriction:
          </label>
          <input
            type="number"
            name="age_restriction"
            value={formData.age_restriction}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Fee */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fee:
          </label>
          <input
            type="number"
            name="fee"
            value={formData.fee}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Validity */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Validity:
          </label>
          <input
            type="text"
            name="validity"
            value={formData.validity}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Application Method */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Application Method:
          </label>
          <input
            type="text"
            name="application_method"
            value={formData.application_method}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Visa
        </button>
      </form>
    </div>
  );
};

export default AddVisa;
