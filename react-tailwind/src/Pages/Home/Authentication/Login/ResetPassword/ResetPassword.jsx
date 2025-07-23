import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { authContext } from "../../../../../Context/AuthContext";

export default function ResetPassword() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(authContext);

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][A-Za-z0-9]{5,}$/,
        "Password must start with capital letter, followed by at least 5 characters"
      ),
  });

  // Submit function
  async function sendDataToLogin(values) {
    const loadingError = toast.loading("🔄 Resetting Password...");
    setLoading(true);
    try {
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: {
          email: values.email,
          newPassword: values.newPassword,
        },
      };

      const { data } = await axios.request(options);
      localStorage.setItem("token", data.token);
      setToken(data.token);

      toast.success("✅ Password Changed Successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Error occurred");
    } finally {
      toast.dismiss(loadingError);
      setLoading(false);
    }
  }

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
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
          Reset Password
        </h2>

        {error && <h2 className="text-red-500 text-center">🚫 {error}</h2>}

        {/* Email */}
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="peer w-full h-12 pr-10 pl-3 pt-6 border border-darkPrimary rounded-md placeholder-transparent text-darkPrimary focus:outline-none focus:border-darkPrimary"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm mt-2 ml-1">
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

        {/* New Password */}
        <div className="relative">
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            required
            placeholder="New Password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="peer w-full h-12 pr-10 pl-3 pt-6 border border-darkPrimary rounded-md placeholder-transparent text-darkPrimary focus:outline-none focus:border-darkPrimary"
          />
          {formik.errors.newPassword && formik.touched.newPassword && (
            <p className="text-red-500 text-sm mt-2 ml-1">
              {formik.errors.newPassword}
            </p>
          )}
          <label
            htmlFor="newPassword"
            className="absolute left-3 top-1 text-darkPrimary text-sm transition-all duration-200
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-darkPrimary
              peer-focus:top-1 peer-focus:text-sm peer-focus:text-darkPrimary bg-white px-1"
          >
            New Password
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
              "Reset Password"
            )}
          </button>

          <Link className="text-blue-600 underline" to="/forgetPassword">
            Forget Password?
          </Link>
        </div>
      </form>
    </>
  );
}
