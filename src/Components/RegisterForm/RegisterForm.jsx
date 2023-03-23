import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

export default function RegisterForm() {

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
    setLoading(true);
    try {
      const {data} = await axios.post("http://localhost:3001/v1/users/sign-up", user);
      console.log(data);
      const token = data.data.access_token;
      const username = data.data.user.username;
      localStorage.setItem('username',username);
      localStorage.setItem("token", token);
      setLoading(false);
      navigate('/')
    } catch (error) {
      console.log('error',error);
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
      <div className="h-screen flex justify-center items-center">
        <div className="container mx-auto">
          <div className="bg-formColor flex flex-col lg:flex-row w-10/12 lg:w-8/12 rounded-xl mx-auto shadow-xl overflow-hidden">
            <div className="w-full  h-[32rem] lg:w-1/2 bg-signup bg-cover bg-center bg-no-repeat flex justify-center items-center">
              <div className="text-center">
                <h1 className="text-white text-3xl">Welcome</h1>
                <p className="text-white">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Molestiae aliquid praesentium distinctio temporibus voluptate
                  et id pariatur quisquam quibusdam dignissimos.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-12 px-12 h-[32rem]">
              <h2 className="text-3xl mb-4">Register</h2>
              <p className="mb-4">Create your account</p>
              <form onSubmit={handleSubmit(registerHandler)}>
                <div className="flex flex-col gap-2">
                  <input
                    {...register("username", {
                      required: "Required",
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
                      required: "Required",
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
                      required: "Required",
                      minLength: { value: 5, message: "Min length is 5" },
                    })}
                    type="text"
                    placeholder="Password"
                    name="password"
                    className="w-full border border-gray-400 py-1 px-2 bg-transparent rounded"
                  />
                  <p className="text-red-600">{errors.password?.message}</p>
                  <input
                    {...register("confirm_password", { required: "Required" })}
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
