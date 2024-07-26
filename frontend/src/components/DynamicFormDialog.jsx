import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import useAxios from "axios-hooks";
import Loading from "./Loading";
import Modal from "./Modal";
import axiosInstance from "../config/axiosInstance";

export default function DynamicForm({
  title,
  btn,
  btnCss,
  formConfig,
  url,
  schema,
  defaultValues,
  handleClose,
  handleModal,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const [{ data: dataResponse, loading, error }, handleSubmitData] = useAxios(
    {
      url: `${url}`,
      axios: axiosInstance,
      method: "POST",
    },
    { manual: true }
  );

  const onSubmit = async (data) => {
    console.log("Data")
    try {
      const response = await handleSubmitData({
        data: data,
      });
      handleModal({
        loading: false,
        title: `${title} Notification`,
        desc: response.data.message,
        isError: false,
        isOpen: true,
      });
    } catch (error) {
      handleModal({
        loading: false,
        title: `${title} Notification`,
        desc: error.response.data.errors[0].message,
        isError: true,
        isOpen: true,
      });
    }
    handleClose(false);
  };

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      clearErrors("image");
  
      if (fileRejections.length) {
        setError("image", {
          type: "manual",
          message: fileRejections[0].errors[0].message,
        });
        setPreviewUrl(null);
        return;
      }
  
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setValue("image", [file]); 
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
      }
    },
    [setValue, setError, clearErrors]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/gif",
    maxSize: 2 * 1024 * 1024,
  });

  useEffect(() => {console.log("Error:" , error)})

  const renderField = (key, config) => {
    switch (config.field) {
      case "input":
        return (
          <div key={key} className="sm:col-span-4">
            <label
              htmlFor={key}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {config.label}
            </label>
            <div className="mt-2">
              <input
                id={key}
                {...register(key, {
                  valueAsNumber: config.type === "number",
                })}
                type={config.type}
                placeholder={config.placeholder}
                disabled={config.disable}
                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors[key] && (
                <p className=" transform mt-2 text-sm text-red-600">
                  {errors[key]?.message}
                </p>
              )}
            </div>
          </div>
        );

      case "textarea":
        return (
          <div key={key} className="sm:col-span-4">
          <label
            htmlFor={key}
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            {config.label}
          </label>
          <div className="mt-2">
            <textarea
              id={key}
              {...register(key, )}
              type={config.type}
              placeholder={config.placeholder}
              disabled={config.disable}
              className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors[key] && (
              <p className=" transform mt-2 text-sm text-red-600">
                {errors[key]?.message}
              </p>
            )}
          </div>
        </div>
        )
      case "select":
        return (
          <div key={key} className="sm:col-span-4">
            <label
              htmlFor={key}
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              {config.label}
            </label>
            <div className="mt-2">
              <select
                id={key}
                {...register(key)}
                disabled={config.disable}
                className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                {config.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors[key] && (
                <p className=" transform mt-2 text-sm text-red-600">
                  {errors[key]?.message}
                </p>
              )}
            </div>
          </div>
        );

        case "image":
          return (
            <div key={key} className="sm:col-span-4">
              <label
                htmlFor={key}
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {config.label}
              </label>
              <div className="mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-5">
                {previewUrl ? (
                  <div className="relative w-full h-64">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setPreviewUrl(null);
                        setValue("image", []); // Đặt lại thành mảng rỗng
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                    >
                      X
                    </button>
                  </div>
                ) : (
                  <div
                    {...getRootProps()}
                    className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 w-full"
                  >
                    <input {...getInputProps()} />
                    <div className="text-center">
                      <PhotoIcon
                        aria-hidden="true"
                        className="mx-auto h-12 w-12 text-gray-300"
                      />
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                      </label>
                      <p className="pl-1">or drag and drop</p>
                      <p className="text-xs leading-5 text-gray-600">
                        PNG, JPG, GIF up to 2MB
                      </p>
                    </div>
                  </div>
                )}
                {errors.image && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>
          );
      default:
        return null;
    }
  };


  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);


  return (
    <>
      <Dialog open={true} onClose={() => {}} className="relative z-50 w-[60vw]">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto px-3 py-8">
          <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div>
                <div className="text-start sm:mt-5">
                  <DialogTitle
                    as="h3"
                    className="text-center text-base font-semibold leading-6 text-gray-900"
                  >
                    {title}
                  </DialogTitle>
                  <div className="">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-8 px-10 py-5"
                    >
                      <div className="space-y-6">
                        {Object.keys(formConfig).map((key) =>
                          renderField(key, formConfig[key])
                        )}
                      </div>

                      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                        <button
                          type="submit"
                          className={`${btnCss}bg-blue-200 inline-flex w-full justify-center rounded-md py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2`}
                        >
                          {btn}
                        </button>
                        <button
                          onClick={() => handleClose(false)}
                          className="mt-3 inline-flex w-full justify-center rounded-md bg-white py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
