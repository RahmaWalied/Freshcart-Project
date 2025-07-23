import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext, useState } from "react";
import axios from "axios";
import { cartContext } from "./../../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CheckOut({ totalPrice }) {
  const { cart, getLoggedUserCart } = useContext(cartContext);
  const navigate = useNavigate();
  let [pay, setPay] = useState("cash");

  const validationSchema = Yup.object({
    details: Yup.string().required("must be required"),
    phone: Yup.string()
      .required("must be required")
      .matches(/^(\+2){0,1}01[0125][0-9]{8}$/, "Invalid Egyptian phone number"),
    city: Yup.string().required("must be required").min(2, "at least two chars"),
  });

  const formik = useFormik({
    initialValues: { details: "", phone: "", city: "" },
    validationSchema,
    onSubmit: (values) => {
      if (pay === "cash") {
        payCash(values);
      } else {
        payOnline(values);
      }
    },
  });

  async function payOnline(values) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart?._id}?url=${window.location.origin}`,
        { shippingAddress: values },
        { headers: { token: localStorage.getItem("token") } }
      );

      if (data?.session?.url) {
        localStorage.setItem("orderSuccess", "true");
        window.location.href = data.session.url;
      } else {
        console.error("Online session URL missing:", data);
      }
    } catch (error) {
      console.error(
        "Error during online checkout:",
        error?.response?.data || error.message
      );
    }
  }

  async function payCash(values) {
    try {
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cart?._id}`,
        { shippingAddress: values },
        { headers: { token: localStorage.getItem("token") } }
      );

      if (data?.status === "success") {
        localStorage.setItem("orderSuccess", "true");
        navigate("/allorders");
        getLoggedUserCart();
      } else {
        console.error("Cash order response unexpected:", data);
      }
    } catch (error) {
      console.error(
        "Error during cash checkout:",
        error?.response?.data || error.message
      );
    }
  }

  return (
    <div className="container max-w-[535px] mt-12">
      <span className="block mt-12 mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>
      <h2 className="text-center my-2 font-bold text-lg Outfit">Check Out</h2>
      <span className="block mx-auto w-[200px] rounded-full h-[2px] bg-primary"></span>

      <form
        onSubmit={formik.handleSubmit}
        id="checkOut"
        className="w-full p-8 border border-gray-300 rounded-lg duration-700 target:border-darkPrimary flex flex-col gap-6 mt-12"
      >
        <h3 className="font-bold text-lg -ml-2">Cart totals</h3>

        <div className="flex gap-4 items-center">
          <span className="font-bold">Total :</span>
          <span className="text-primary font-semibold">${totalPrice} USD</span>
        </div>

        {/* city input */}
        <div>
          <input
            className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
            autoComplete="off"
            type="text"
            placeholder="Enter Your City Name"
            name="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.city && formik.touched.city && (
          <p className="text-red-600 font-bold text-sm -my-3 ">must be required</p>
        )}

        {/* phone input */}
        <div>
          <input
            className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
            autoComplete="off"
            type="tel"
            placeholder="Enter Your Phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <p className="text-red-600 font-bold text-sm -my-3 ">must be required</p>
        )}

        {/* details input */}
        <div>
          <textarea
            className="p-2 w-full rounded-xl border-1 border-primary focus:border-darkPrimary focus:border-2"
            placeholder="Details"
            name="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        {formik.errors.details && formik.touched.details && (
          <p className="text-red-600 font-bold text-sm -my-3 ">must be required</p>
        )}

        <div className="flex max-md:flex-col gap-4 justify-between items-center">
          {/* Cash Order */}
          <button
            onClick={() => {
              setPay("cash");
            }}
            type="submit"
            value="cash"
            className="btn cursor-pointer bg-primary hover:bg-darkPrimary text-white flex py-2 text-nowrap items-center justify-center gap-2 rounded-2xl w-1/2 transition-all duration-300"
          >
            <span>Cash Order</span>
          </button>

          {/* Online Order */}
          <button
            onClick={() => {
              setPay("online");
            }}
            type="submit"
            value="online"
            className="btn cursor-pointer flex py-2 text-nowrap items-center justify-center gap-2 hover:text-white hover:bg-darkPrimary bg-white text-darkPrimary w-1/2 rounded-2xl transition-all duration-300"
          >
            <span>Online Order</span>
          </button>
        </div>
      </form>
    </div>
  );
}
