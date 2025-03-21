import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, Routes } from "react-router";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ErrorPage from "../pages/ErrorPage";
import AddVisa from "../pages/AddVisa";
import AllVisas from "../pages/AllVisas";
import MyAddedVisas from "../pages/MyAddedVisas";
import PrivateRoute from "./PrivateRoute";
import MyVisaApplications from "../pages/MyVisaApplications";


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="all-visas" element={<AllVisas />} />
        <Route
          path="add-visa"
          element={
            <PrivateRoute>
              <AddVisa />
            </PrivateRoute>
          }
        />
        <Route
          path="my-added-visas"
          element={
            <PrivateRoute>
              <MyAddedVisas />
            </PrivateRoute>
          }
        />
        <Route
          path="my-visa-applications"
          element={
            <PrivateRoute>
              <MyVisaApplications />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
