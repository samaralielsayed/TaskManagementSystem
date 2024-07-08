import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { IoLockClosedOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-toastify";
import axiosInstance from "../interceptor";
import { FaRegUser } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const validate = (values) => {
    const errors = {};
    if (!values.firstname) {
      errors.firstname = "First name is required*";
    } else if (!/^[a-zA-Z ]{2,30}$/i.test(values.firstname)) {
      errors.firstname = "Invalid Name";
    }
    if (!values.lastname) {
      errors.lastname = "Last name is required*";
    } else if (!/^[a-zA-Z ]{2,30}$/i.test(values.lastname)) {
      errors.lastname = "Invalid Name";
    }
    if (!values.email) {
      errors.email = "Email is required*";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.com$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password is required*";
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(values.password)
    ) {
      errors.password =
        "Invalid password, minimum 8 characters, at least one letter and one number";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required*";
    }
    if (values.confirmPassword && values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords must match";
    }
    return errors;
  };

  const onSubmit = async (
    { firstname, lastname, password, email },
    { setSubmitting }
  ) => {
    try {
      await axiosInstance.post(
        "/users/register",
        {
          firstname,
          lastname,
          password,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/login");
      toast.success("You are registered successfully");
    } catch (err) {
      toast.error("Email already exists");
    }
    setSubmitting(false);
  };

  return (
    <div className="flex  justify-center lg:h-screen lg:overflow-hidden min-h-screen ">
      <div className="w-full my-3  relative p-4 md:p-16 lg:p-16 md:w-3/4 lg:w-1/2 flex flex-col justify-center">
        <img
          src="/logo.svg"
          className="absolute top-0  w-16 h-16 left-4 lg:left-16"
          alt="hh"
        />
        <h3 className="ml-2 mb-1 font-bold text-gray-700 text-3xl mt-[50px] lg:mt-0">
          Sign up
        </h3>
        <h5 className="ml-2 text-xs text-main-400 font-semibold mb-16">
          Please enter your details
        </h5>
        <Formik
          initialValues={{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
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
              <div className="flex md:justify-between flex-wrap md:flex-nowrap gap-0 md:gap-2 text-white">
                <div className="w-full md:w-1/2 my-6 md:my-0">
                  <div className="flex items-center gap-2 rounded-full bg-main-300  p-2">
                    <FaRegUser color="white" />
                    <input
                      type="text"
                      name="firstname"
                      placeholder="First Name"
                      className="border-0 outline-none placeholder:text-slate-200 bg-main-300 w-full"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstname}
                    />
                  </div>
                  <div className="text-red-500 text-sm ms-2">
                    {touched.firstname && errors.firstname}
                  </div>
                </div>
                <div className="w-full md:w-1/2 ">
                  <div className="flex items-center gap-2 rounded-full bg-main-300  p-2">
                    <FaRegUser color="white" />
                    <input
                      type="text"
                      name="lastname"
                      placeholder="last Name"
                      className="border-0 outline-none placeholder:text-slate-200 bg-main-300  w-full"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastname}
                    />
                  </div>
                  <div className="text-red-500 text-sm ms-2">
                    {touched.lastname && errors.lastname}
                  </div>
                </div>
              </div>
              <div className="my-6">
                <div className="flex items-center gap-2 border rounded-full bg-main-300 my-1 px-3 py-1">
                  <AiOutlineMail color="white" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="border-0 outline-none focus:bg-main-300 placeholder:text-slate-200 w-full bg-main-300"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                </div>
                <div className="text-red-500 text-sm ml-2">
                  {touched.email && errors.email}
                </div>
              </div>
              <div className="my-6">
                <div className="flex items-center gap-2 border rounded-full bg-main-300 my-1 px-3 py-1">
                  <IoLockClosedOutline color="white" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="border-0 outline-none focus:ring-0 placeholder:text-slate-200 w-full bg-main-300"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                </div>
                <div className="text-red-500 text-sm ml-2">
                  {touched.password && errors.password}
                </div>
              </div>
              <div className="mb-6">
                <div className="flex items-center gap-2 rounded-full bg-main-300  my-1 p-2">
                  <IoLockClosedOutline color="white" />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder='Confirm Password"'
                    className="border-0 outline-none focus:bg-main-300 placeholder:text-slate-200  bg-main-300 w-full"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                </div>
                <div className="text-red-500 text-sm ms-2">
                  {touched.confirmPassword && errors.confirmPassword}
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-main-800 border rounded-full p-2 text-white disabled:opacity-50 my-2"
                disabled={isSubmitting}
              >
                Sign up
              </button>
              <div className="text-sm font-bold text-main-400  mt-2 ms-2">
                Already have an account? &nbsp;
                <span
                  className="cursor-pointer text-main-800 "
                  onClick={() => navigate("/login", { replace: true })}
                >
                  Login
                </span>
              </div>
            </form>
          )}
        </Formik>
      </div>
      <div className="hidden lg:block w-1/3 lg:w-1/2">
        <img src="/signUp.svg" alt="signup" />
      </div>
    </div>
  );
};

export default Register;
