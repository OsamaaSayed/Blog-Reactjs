import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

// BACKEND API
import { BASE_URL } from './../../Service/API';


export default function RegisterForm() {
  // BACKEND API


  // ********** States ***********
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  // ********** Handlers ***************
  const registerHandler = async (user) => {
    console.log(user.gender);
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${BASE_URL}/v1/users/sign-up`,
        user
      );
      console.log(data);
      const token = data.data.access_token;
      const userId = data.data.user._id;
      const username = data.data.user.username;
      const gender = data.data.user.gender;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("gender", gender);
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log("error", error);
      setLoading(false);

      toast.error(`${error.response.data.message} 😞`, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  console.log(errors);

  return (
    <>
      <div className="flex justify-center items-center mt-28 mb-11">
        <div className="container mx-auto">
          <div className="bg-formColor flex flex-col lg:flex-row w-10/12 lg:w-8/12 rounded-xl mx-auto shadow-xl overflow-hidden">
            <div  className=" w-full h-[35rem] lg:w-1/2 bg-signup bg-cover bg-center bg-no-repeat flex justify-center items-center">
              <div className="text-center">
                <h1 className="text-white text-3xl">Welcome</h1>
                <p className="text-white">
                  Start exploring our website today, and discover a world of
                  knowledge and inspiration that will help you achieve your
                  goals and live your best life
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-4 px-12 h-[32rem]">
              <h2 className="text-3xl mb-4">Register</h2>
              <p className="mb-4">Create your account</p>
              <form onSubmit={handleSubmit(registerHandler)}>
                <div className="flex flex-col gap-2">
                  <input
                    {...register("username", {
                      required: "Name is required",
                      minLength: { value: 5, message: "Min length is 5" },
                      maxLength: { value: 20, message: "Max length is 20" },
                    })}
                    type="text"
                    placeholder="Full Name"
                    name="username"
                    className="w-full border border-gray-400 py-1 px-2 bg-transparent rounded"
                  />
                  <p className="text-red-600">{errors.username?.message}</p>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Please enter a valid email format",
                      },
                    })}
                    type="email"
                    placeholder="example@mail.com"
                    name="email"
                    className="w-full border border-gray-400 py-1 px-2 bg-transparent rounded"
                  />
                  <p className="text-red-600">{errors.email?.message}</p>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: { value: 5, message: "Min length is 5" },
                    })}
                    type="text"
                    placeholder="Password"
                    name="password"
                    className="w-full border border-gray-400 py-1 px-2 bg-transparent rounded"
                  />
                  <p className="text-red-600">{errors.password?.message}</p>
                  <input
                    {...register("confirm_password", { required: "Confirm Password is required" })}
                    type="text"
                    placeholder="Confirm Password"
                    name="confirm_password"
                    className="w-full border border-gray-400 py-1 px-2 bg-transparent rounded"
                  />
                  {watch("confirm_password") !== watch("password") &&
                  getValues("confirm_password") ? (
                    <p className="text-red-600">Password doesn't match</p>
                  ) : null}
                  <p className="text-red-600">
                    {errors.confirm_password?.message}
                  </p>


                  <select
                    {...register("gender", { required: "Gender is required" })}
                    name="gender"
                    className="select select-bordered select-sm w-full bg-formColor border-gray-400 focus:outline-none"
                  >
                    <option disabled selected>
                      Gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                  <p className="text-red-600">{errors.gender?.message}</p>


                  <button
                    type="submit"
                    className={`${
                      loading ? "loading" : ""
                    } text-white btn btn-primary capitalize text-lg cursor-pointer`}
                  >
                    Signup
                  </button>
                  <div className="flex gap-2">
                    <span>Already have an account?</span>
                    <Link to="/login" className="link link-primary">
                      Login
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        limit={1}
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
    </>
  );
}
