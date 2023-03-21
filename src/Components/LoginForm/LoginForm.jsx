import React, { useState } from "react";
import { useForm } from "react-hook-form";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.min.css";

export default function LoginForm() {
  // ********** States ***********
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  // ********** Handlers ***************
  const loginHandler = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3010/login", data);
      console.log(res);
      const token = res.data.accessToken;
      localStorage.setItem("token", token);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      toast.error(`${error.response.data} 😞`, {
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
            <div className="w-full lg:w-1/2 py-12 px-12 h-[32rem]">
              <h2 className="text-3xl mb-4">Login</h2>
              <p className="mb-4">Enter with your account</p>
              <form onSubmit={handleSubmit(loginHandler)}>
                <div className="flex flex-col gap-2">
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

                  <button
                    type="submit"
                    className={`${
                      loading ? "loading" : ""
                    } text-white btn btn-primary capitalize text-lg cursor-pointer`}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>

            <div className="w-full h-[32rem] lg:w-1/2 bg-signup bg-cover bg-center bg-no-repeat flex justify-center items-center">
              <div className="text-center">
                <h1 className="text-white text-3xl">Welcome Back</h1>
                <p className="text-white">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Molestiae aliquid praesentium distinctio temporibus voluptate
                  et id pariatur quisquam quibusdam dignissimos.
                </p>
              </div>
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
