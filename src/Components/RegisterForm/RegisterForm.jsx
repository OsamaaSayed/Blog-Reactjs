import axios from "axios";
import Joi from "joi";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const registerHandler = async (data) => {
    console.log(data);

    try {
      const res = await axios.post("http://localhost:3010/register", data);
      console.log(res);
      const token = res.data.accessToken;
      localStorage.setItem("token", token);
      
    } catch (error) {
      console.log(error);
    }
  };

  console.log(errors);

  // *******State********
  // const [user, setUser] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirm_password: "",
  // });

  // // ********Handlers*********
  // // get user object
  // function getUser(e) {
  //   //deep clone
  //   const myUser = { ...user };
  //   //edit
  //   myUser[e.target.name] = e.target.value;
  //   //update state
  //   setUser(myUser);
  //   console.log(myUser);
  // }

  // // submitting the form
  // async function formSubmit(e) {
  //   e.preventDefault();

  //   const validationResponse = validateRegisterForm();
  //   if (validationResponse.error) {

  //   } else {

  //     try {
  //       const data = await axios.post("http://localhost:3010/register", user);
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error);
  //     }

  //   }
  // }

  return (
    <>
      <div className="h-screen flex justify-center items-center bg-gradient-to-tr from-slate-300">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
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
              <h2 className="text-black text-3xl mb-4">Register</h2>
              <p className="mb-4 text-black">Create your account</p>
              <form onSubmit={handleSubmit(registerHandler)}>
                <div className="flex flex-col gap-2">
                  <input
                    {...register("username", {
                      required: "Required",
                      minLength: { value: 5, message: "Min length is 5" },
                      maxLength: { value: 30, message: "Max length is 30" },
                    })}
                    // onChange={getUser}
                    type="text"
                    placeholder="Full Name"
                    name="username"
                    className="w-full border border-gray-400 py-1 px-2 bg-transparent rounded text-black"
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
                    // onChange={getUser}
                    type="email"
                    placeholder="example@mail.com"
                    name="email"
                    className="w-full border border-gray-400 py-1 px-2 bg-transparent rounded text-black"
                  />
                  <p className="text-red-600">{errors.email?.message}</p>
                  <input
                    {...register("password", {
                      required: "Required",
                      minLength: { value: 5, message: "Min length is 5" },
                    })}
                    // onChange={getUser}
                    type="text"
                    placeholder="Password"
                    name="password"
                    className="w-full border border-gray-400 py-1 px-2 bg-transparent rounded text-black"
                  />
                  <p className="text-red-600">{errors.password?.message}</p>
                  <input
                    {...register("confirm_password", { required: "Required" })}
                    // onChange={getUser}
                    type="text"
                    placeholder="Confirm Password"
                    name="confirm_password"
                    className="w-full border border-gray-400 py-1 px-2 bg-transparent rounded text-black"
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
                    className="text-white btn capitalize text-lg"
                  >
                    Signup
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
