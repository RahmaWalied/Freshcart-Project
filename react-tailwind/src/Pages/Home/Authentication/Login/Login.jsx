import React, { useContext } from "react";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "@fortawesome/fontawesome-free/css/all.min.css";
import toast from "../../../../../node_modules/react-hot-toast/src/index";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "./../../../../Context/AuthContext";

export default function Login() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let { setToken, checkUser } = useContext(authContext);

  // Validation
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][A-Za-z0-9]{5,}$/,
        "Password must start with capital letter,followed by 5 chars"
      ),
  });

  // data request
  async function sendDataToLogin(values) {
    const loadingError = toast.loading("🌟 Welcome back!");
    setLoading(true);
    try {
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };

      const { data } = await axios.request(options);
      console.log(data.token);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      checkUser();

      toast.success("Logged In SuccessFully");

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingError);
      setLoading(false);
    }
  }

  // store data
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: sendDataToLogin,
    validationSchema,
  });

  return (
    <>
      <form
        className="w-full max-w-md mx-auto mt-12 space-y-6 bg-white shadow-lg rounded-lg p-6"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="relative sm:text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-800 mb-8">
          Login Now
        </h2>

        {error && <h2 className="text-red-500 text-center">🚫{error}</h2>}
        {/* Email */}
        <div className="relative">
          <input
            type="email"
            id="email"
            required
            placeholder="Email"
            value={formik.values.email}
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="peer w-full h-12 pr-10 pl-3 pt-6 border border-darkPrimary rounded-md placeholder-transparent text-darkPrimary focus:outline-none focus:border-darkPrimary"
          />

          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
              {formik.errors.email}
            </p>
          )}
          <label
            htmlFor="email"
            className="absolute left-3 top-1 text-darkPrimary text-sm transition-all duration-200
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-darkPrimary
      peer-focus:top-1 peer-focus:text-sm peer-focus:text-darkPrimary bg-white px-1"
          >
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type="password"
            id="password"
            required
            placeholder="Password"
            value={formik.values.password}
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="peer w-full h-12 pr-10 pl-3 pt-6 border border-darkPrimary rounded-md placeholder-transparent text-darkPrimary focus:outline-none focus:border-darkPrimary"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
              {formik.errors.password}
            </p>
          )}
          <label
            htmlFor="password"
            className="absolute left-3 top-1 text-darkPrimary text-sm transition-all duration-200
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-darkPrimary
      peer-focus:top-1 peer-focus:text-sm peer-focus:text-darkPrimary bg-white px-1"
          >
            Password
          </label>
        </div>

        {/* Submit button */}
        <div className="flex justify-center items-center flex-col gap-2">
          <button
            disabled={loading}
            type="submit"
            className="px-8 h-12 bg-primary text-white rounded-md hover:bg-darkPrimary transition font-semibold"
          >
            {loading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Login"
            )}
          </button>

          <Link className="text-blue-600 underline" to={"/forgetPassword"}>
            Forget Password?
          </Link>
        </div>
      </form>
    </>
  );
}
