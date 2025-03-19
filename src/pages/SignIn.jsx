import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../auth/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignIn = () => {
  const { signIn, setUser, googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // reset error message
    setErrorMessage("");

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        // console.log(user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        setUser(user);
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };
  return (
    <div className="flex justify-center items-center py-18">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-center text-3xl font-bold">Sign In</h1>
          <form onSubmit={handleSignIn} className="fieldset relative">
            <label className="fieldset-label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="fieldset-label">Password</label>
            <input
              name="password"
              type={showPass ? "text" : "password"}
              className="input"
              placeholder="Password"
            />
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
            <div>
              <Link
                to="/login/forgetpassword"
                state={{ email: email }}
                className="link link-hover"
              >
                Forgot password?
              </Link>
            </div>
            <button className="btn btn-neutral mt-4">Login</button>
          </form>
          <button onClick={handleGoogleSignIn} className="btn btn-neutral mt-2">
            <FcGoogle /> Login
          </button>
          <button
            onClick={() => setShowPass(!showPass)}
            className="text-lg absolute top-44 right-11"
          >
            {showPass ? <FaEyeSlash /> : <FaEye />}
          </button>
          <p>
            Don't have an account? Please{" "}
            <Link
              to="/signup"
              className="underline cursor-pointer text-blue-600 text-base font-semibold"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
