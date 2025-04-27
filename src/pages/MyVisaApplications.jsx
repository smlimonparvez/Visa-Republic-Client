import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthProvider";
import Swal from "sweetalert2";

const MyVisaApplications = () => {
  const { user, setLoading } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  
  useEffect(() => {
    // console.log(user?.email);
    if (user?.email) {
      fetch(`http://localhost:5000/my-visa-application?userEmail=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setApplications(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching visa applications:", error);
          setLoading(false);
        });
    }
  }, [user]);

  const handleCancel = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/visa-application/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Canceled!",
                text: "Your added visa has been Canceled.",
                icon: "success",
              });
              setApplications(
                applications.filter((application) => application._id !== id)
              ); // Remove from UI
            }
          })
          .catch((error) => console.error("Error deleting visa:", error));
      }
    });
  };
  return (
    <div className="my-16">
      <h1 className="text-4xl font-bold mb-10 text-center">
        My Visa Applications
      </h1>
      <div className="w-5/6 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {applications.map(
          (application) => (
            // console.log(application),
            (
              <div
                key={application._id}
                className="border p-4 rounded-lg shadow-md space-y-2"
              >
                <img
                  src={application.country_image}
                  alt={application.country_name}
                  className="w-full object-cover mb-2"
                />
                <h2 className="text-xl font-bold mt-5">
                  {application.country_name}
                </h2>
                <p>
                  <span className="font-semibold">Applicant's Name:</span> {application.firstName}{" "}
                  {application.lastName}
                </p>
                <p><span className="font-semibold">Applicant's Email:</span> {application.email}</p>
                <p><span className="font-semibold">Applied Date:</span> {application.date}</p>
                <p><span className="font-semibold">Visa Type:</span> {application.visa_type}</p>
                <p><span className="font-semibold">Processing Time:</span> {application.processing_time}</p>
                <p><span className="font-semibold">Fee:</span> ${application.fee}</p>
                <p><span className="font-semibold">Validity:</span> {application.validity}</p>
                <p><span className="font-semibold">Application Method:</span> {application.application_method}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleCancel(application._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )
          )
        )}
      </div>
    </div>
  );
};

export default MyVisaApplications;
