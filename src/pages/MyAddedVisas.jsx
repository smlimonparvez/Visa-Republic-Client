import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Swal from "sweetalert2";

const MyAddedVisas = () => {
  const { user, setLoading, setVisas, visas } = useContext(AuthContext);
  // const [visas, setVisas] = useState([]);
  const [selectedVisa, setSelectedVisa] = useState(null);
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

  // Fetch visas added by the logged-in user
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/my-visa?userEmail=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setVisas(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching visas:", error);
          setLoading(false);
        });
    }
  }, [user]);

  // Handle Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/visa/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your added visa has been deleted.",
                icon: "success",
              });
              setVisas(visas.filter((visa) => visa._id !== id)); // Remove from UI
            }
          })
          .catch((error) => console.error("Error deleting visa:", error));
      }
    });
  };

  // Handle Update modal
  const handleModal = (visa) => {
    setSelectedVisa(visa); // Set the selected visa for the update modal
  };

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

  // send data to the server and database
  // Submit Updated Visa
  const handlesubmitUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/visa/${selectedVisa._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Visa updated successfully!",
            icon: "success",
            draggable: true,
          });

          // Update UI
          setVisas(
            visas.map((v) =>
              v._id === formData._id ? { ...v, ...formData } : v
            )
          ); 
          setSelectedVisa(null); // Close modal
        }
      })
      .catch((error) => console.error("Error updating visa:", error));
  };

  return (
    <div className="p-4">
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
                onClick={() => handleModal(visa)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Update
              </button>
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

      {/* Update Modal */}
      {selectedVisa && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-100 p-6 rounded-lg w-full max-w-md my-8 max-h-[90vh] overflow-auto">
            <form
              onSubmit={handlesubmitUpdate}
              className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl"
            >
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Update Visa Information
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
                  // defaultValue={selectedVisa.country_name}
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
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setSelectedVisa(null)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedVisas;
