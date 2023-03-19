import React from "react";

export default function Register() {





  return (
    <>
      <div className="h-screen flex justify-center items-center bg-gradient-to-tr from-slate-300">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div className="w-full lg:w-1/2 bg-signup bg-cover bg-center bg-no-repeat flex justify-center items-center">
              <div className="text-center">
              <h1 className="text-white text-3xl">Welcome</h1>
                <p className="text-white">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Molestiae aliquid praesentium distinctio temporibus voluptate
                  et id pariatur quisquam quibusdam dignissimos.
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-16 px-12 ">
              <h2 className="text-black text-3xl mb-4">Register</h2>
              <p className="mb-4 text-black">Create your account</p>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-400 py-1 px-2 bg-transparent rounded"
                />
                <input
                  type="email"
                  placeholder="example@mail.com"
                  className="w-full border border-gray-400 py-1 px-2 bg-transparent rounded"
                />
                <input
                  type="text"
                  placeholder="Password"
                  className="w-full border border-gray-400 py-1 px-2 bg-transparent rounded"
                />
                <input
                  type="text"
                  placeholder="Confirm Password"
                  className="w-full border border-gray-400 py-1 px-2 bg-transparent rounded"
                />
                <button className="text-white btn capitalize text-lg">Signup</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mx-auto h-screen flex justify-center items-center bg-gradient-to-tr from-gray-400">
        <form className="w-2/4">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full bg-transparent border text-black "
            />
            <input
              type="email"
              placeholder="example@mail.com"
              className="input input-bordered w-full bg-transparent border text-black "
            />
            <input
              type="password"
              placeholder="Enter Password"
              className="input input-bordered w-full bg-transparent border text-black "
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="input input-bordered w-full bg-transparent border text-black"
            />
            <button className="btn">Signup</button>
          </div>
        </form>
      </div> */}
    </>
  );
}
