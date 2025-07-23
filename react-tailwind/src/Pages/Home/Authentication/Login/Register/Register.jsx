import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export default function Register() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validation
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][A-Za-z0-9]{5,}$/,
        "Password must start with capital letter,followed by 5 chars"
      ),

    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Please confirm your password"),

    phone: Yup.string()
      .matches(/^(\+2){0,1}01[0125][0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone is required"),
  });

  // data request

  async function sendDataToRegister(values) {
    const loadingError = toast.loading(
      "🚀 Rockets warming up... almost there!"
    );
    setLoading(true);
    try {
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };

      const { data } = await axios.request(options);
      console.log(data);
      toast.success("Register SuccessFully");
      setTimeout(() => {
        navigate("/login");
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: sendDataToRegister,
    validationSchema,
  });

  return (
    <>
      <form
        className="w-full max-w-md mx-auto mt-12 space-y-6 bg-white shadow-lg rounded-lg p-6"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="relative sm:text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-800 mb-8">
          Register Now
        </h2>

        {error && <h2 className="text-red-500 text-center">🚫{error}</h2>}

        {/* UserName */}
        <div className="relative">
          <input
            type="text"
            id="username"
            required
            placeholder=" "
            value={formik.values.name}
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="peer w-full h-12 pr-10 pl-3 pt-6 border border-darkPrimary rounded-md placeholder-transparent text-darkPrimary focus:outline-none focus:border-darkPrimary"
          />

          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
              {formik.errors.name}
            </p>
          )}
          <label
            htmlFor="username"
            className="absolute left-3 top-1 text-darkPrimary text-sm transition-all duration-200
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-darkPrimary
      peer-focus:top-1 peer-focus:text-sm peer-focus:text-darkPrimary bg-white px-1"
          >
            Username
          </label>
        </div>

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

        {/* RePassword */}
        <div className="relative">
          <input
            type="password"
            id="repassword"
            required
            placeholder="Re-enter Password"
            value={formik.values.rePassword}
            name="rePassword"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="peer w-full h-12 pr-10 pl-3 pt-6 border border-darkPrimary rounded-md placeholder-transparent text-darkPrimary focus:outline-none focus:border-darkPrimary"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
              {formik.errors.rePassword}
            </p>
          )}
          <label
            htmlFor="repassword"
            className="absolute left-3 top-1 text-darkPrimary text-sm transition-all duration-200
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-darkPrimary
      peer-focus:top-1 peer-focus:text-sm peer-focus:text-darkPrimary bg-white px-1"
          >
            Re-enter Password
          </label>
        </div>

        {/* Phone */}
        <div className="relative">
          <input
            type="tel"
            id="phone"
            required
            placeholder="Phone Number"
            value={formik.values.phone}
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="peer w-full h-12 pr-10 pl-3 pt-6 border border-darkPrimary rounded-md placeholder-transparent text-darkPrimary focus:outline-none focus:border-darkPrimary"
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
              {formik.errors.phone}
            </p>
          )}
          <label
            htmlFor="phone"
            className="absolute left-3 top-1 text-darkPrimary text-sm transition-all duration-200
      peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-darkPrimary
      peer-focus:top-1 peer-focus:text-sm peer-focus:text-darkPrimary bg-white px-1"
          >
            Phone Number
          </label>
        </div>

        {/* Submit button */}
        <button
          disabled={loading}
          type="submit"
          className="px-8 h-12 mx-auto block bg-primary text-white rounded-md hover:bg-darkPrimary transition font-semibold"
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "🚀 Register"
          )}
        </button>
      </form>
    </>
  );
}
