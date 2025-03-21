import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const AllVisas = () => {
    const [visas, setVisas] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        fetch("http://localhost:5000/visa")
        .then((response) => response.json())
        .then((data) => setVisas(data));
    },[]);

    const handleClickDetails = (id) => {
        navigate(`/visa-details/${id}`);
    }

    return (
        <div className='my-20 w-5/6 mx-auto'>
            <h1 className='text-4xl font-bold text-center'>All Visas</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10'>
            {
                visas.map((visa) => (
                    <div key={visa._id} className='p-5 space-y-2 border border-gray-300 bg-gray-100 rounded-lg shadow-md'>
                        <h2 className='text-2xl font-semibold'>{visa.country_name}</h2>
                        <p><span className='font-semibold text-lg'>Visa type:</span> {visa.visa_type}</p>
                        <p><span className='font-semibold text-lg'>Processing time:</span> {visa.processing_time}</p>
                        <p><span className='font-semibold text-lg'>Age restriction:</span> {visa.age_restriction}</p>
                        <p><span className='font-semibold text-lg'>Fee:</span> ${visa.fee}</p>
                        <p><span className='font-semibold text-lg'>Validity:</span> {visa.validity}</p>
                        {/* <p>Application method: {visa.application_method}</p> */}
                        {/* <p>Required documents:</p>
                        <ul>
                            {visa.required_documents.map((doc, index) => (
                                <li key={index}>{doc}</li>
                            ))}
                        </ul> */}
                        <button onClick={() => {handleClickDetails(visa._id)}} className='btn bg-lime-300 mt-5'>See Details</button>
                    </div>
                ))
            }
            </div>
        </div>
    );
};

export default AllVisas;