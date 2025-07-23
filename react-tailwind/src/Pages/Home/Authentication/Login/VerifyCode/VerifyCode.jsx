import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function VerifyCode() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validation
  const validationSchema = Yup.object({
    resetCode: Yup.string().required("resetCode is required"),
  });

  // data request
  async function sendDataToForget(values) {
    const loadingError = toast.loading(
      "🧠 Thinking... lets make sure its really you!"
    );
    setLoading(true);
    try {
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };

      const { data } = await axios.request(options);
      console.log(data);
      toast.success("💚 You nailed it! The code is spot on.");
      setTimeout(() => {
        navigate("/resetpassward");
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
    },
    onSubmit: sendDataToForget,
    validationSchema,
  });

  return (
    <>
      <form
        className="w-full max-w-md mx-auto mt-12 space-y-6 bg-white shadow-lg rounded-lg p-6"
        onSubmit={formik.handleSubmit}
      >
        <h2 className="relative sm:text-3xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-gray-800 mb-8">
          Verify Code
        </h2>

        {error && <h2 className="text-red-500 text-center">🚫{error}</h2>}
        {/* Email */}
        <div className="relative">
          <input
            type="text"
            placeholder="Reset Code"
            value={formik.values.resetCode}
            name="resetCode"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="peer w-full h-12 pr-10 pl-3 pt-6 border border-darkPrimary rounded-md placeholder-transparent text-darkPrimary focus:outline-none focus:border-darkPrimary"
          />

          {formik.errors.resetCode && formik.touched.resetCode && (
            <p className="text-red-500 text-sm mt-2 ml-1 flex items-center gap-1">
              {formik.errors.resetCode}
            </p>
          )}
          <label
            htmlFor="email"
            className="absolute left-3 top-1 text-darkPrimary text-sm transition-all duration-200
        peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-darkPrimary
        peer-focus:top-1 peer-focus:text-sm peer-focus:text-darkPrimary bg-white px-1"
          >
            Verify Code
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
              "🔑 Send Reset Link"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
