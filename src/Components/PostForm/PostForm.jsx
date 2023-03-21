import React from "react";

function PostForm() {
  return (
    <>
      <div>
        <div className="md:grid ">
          <div className="mt-5  md:mt-0">
            <form action="#" method="POST">
              <div className="shadow sm:overflow-hidden sm:rounded-md">
                <div className="space-y-6  px-4 py-5 sm:p-6">
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium leading-6 "
                    >
                      Title
                    </label>
                    <div className="mt-2">
                      <input
                        id="title"
                        type="text"
                        className="input input-bordered focus:outline-none w-full border-gray-200  bg-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 "
                    >
                      Description
                    </label>
                    <div className="mt-2 ">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        className="resize-none bg-transparent border-gray-200 mt-1 block w-full rounded-md border input-bordered sm:p-1.5 sm:text-sm sm:leading-6 focus:outline-none"
                        placeholder="Brief description for your post"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium leading-6 ">
                      Cover photo
                    </label>
                    <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 "
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-300">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                          >
                            <span>Upload Image</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              accept="image/jpg, image/jpeg , image/png"
                              className="sr-only"
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-300">PNG, JPG, JPEG</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostForm;
