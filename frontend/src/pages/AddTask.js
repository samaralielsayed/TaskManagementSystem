import { Formik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { IoLockClosedOutline } from "react-icons/io5";
import { TbFileDescription } from "react-icons/tb";
import { toast } from "react-toastify";
import axiosInstance from "../interceptor";
import { useEffect, useState } from "react";
import NotFound from "./NotFound";

const AddTask = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [NotTask, setNotTask] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    status: "",
  });

  useEffect(() => {
    if (id) {
      // Fetch existing task data
      const fetchTask = async () => {
        try {
          setLoading(true);
          const { data } = await axiosInstance.get(`tasks/${id}`);
          console.log(data, "llluyt");
          setInitialValues({
            title: data.data.title,
            description: data.data.description,
            status: data.data.status,
          });
          setLoading(false);
        } catch (err) {
          if (err.response.status == 404) {
            setNotTask(true);
          }
          toast.error("Failed to fetch task data");
        }
      };
      fetchTask();
    }
  }, [id]);

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Title is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    if (!values.status) {
      errors.status = "Status is required";
    }
    return errors;
  };

  const onSubmit = async (
    { title, description, status },
    { setSubmitting }
  ) => {
    try {
      if (id) {
        await axiosInstance.put(
          `tasks/${id}`,
          {
            title,
            description,
            status,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Task updated successfully");
      } else {
        await axiosInstance.post(
          "tasks",
          {
            title,
            description,
            status,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Task added successfully");
      }
      navigate("/");
    } catch (err) {
      toast.error(err.response.data?.message);
    }
    setSubmitting(false);
  };
  if (NotTask) {
    return (
      <div className="flex items-center justify-center flex-col w-full h-screen">
        <NotFound />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center flex-col w-full h-screen">
      <h3 className="font-link font-bold text-gray-700 text-3xl">
        {id ? "Edit Task" : "Add Task"}
      </h3>
      <p className="border-2 border-main-800 w-28 mt-2"></p>
      <p className="border-2 border-main-800 w-20 mb-2 md:mb-20 mt-1"></p>
      <div className="flex-col-reverse md:flex-row flex lg:overflow-hidden items-start justify-center w-3/4">
        <div className="w-full relative bg-main-50 p-4 md:p-16 lg:p-16 md:w-3/4 lg:w-1/2 flex flex-col slide-in-left">
          <Formik
            initialValues={initialValues}
            enableReinitialize
            validate={validate}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit} className="text-white">
                <div className="mb-6">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="border-0 outline-none focus:ring-0  rounded-full px-4 py-2 placeholder:text-slate-200 w-full bg-main-300 text-md p-2.5"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />

                  <div className="text-red-500 text-sm ml-2">
                    {touched.title && errors.title}
                  </div>
                </div>
                <div className="mb-6">
                  <textarea
                    name="description"
                    placeholder="Description"
                    className="border-0 outline-none focus:ring-0 px-4 pt-3 placeholder:text-slate-200 w-full rounded-full  bg-main-300 "
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  <div className="text-red-500 text-sm ml-2">
                    {touched.description && errors.description}
                  </div>
                </div>
                <div className="mb-6">
                  <select
                    name="status"
                    className="w-full bg-main-300 text-md rounded-3xl px-4 p-2.5"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.status}
                  >
                    <option value="">Select Status</option>
                    <option value="Completed">Completed</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Pending">Pending</option>
                  </select>

                  <div className="text-red-500 text-sm ml-2">
                    {touched.status && errors.status}
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-main-800 border rounded-full p-2 text-white disabled:opacity-50 my-2"
                  disabled={isSubmitting}
                >
                  {id ? "Update" : "Add"}
                </button>
              </form>
            )}
          </Formik>
        </div>
        <div className="block lg:w-1/4 w-full slide-in-right">
          <img src="/f.svg" className="md:h-[420px] h-[200px]" alt="Task" />
        </div>
      </div>
    </div>
  );
};

export default AddTask;
