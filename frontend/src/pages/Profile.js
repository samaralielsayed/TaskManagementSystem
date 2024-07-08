import { useEffect, useState } from "react";
import axiosInstance from "../interceptor";
import { Formik } from "formik";
import { MdOutlineEdit, MdOutlinePhone } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoCameraOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const Profile = ({ handleLog }) => {
  const [userData, setUserData] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [disabled, setDisabled] = useState({
    fName: true,
    lName: true,
    phone: true,
    email: true,
  });
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/users/userProfile`);
        setUserData(data.data);
        setImagePreview(data.data.image);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    })();
  }, []);

  const validate = (values) => {
    const errors = {};
    if (!values.fname) {
      errors.fname = "First name is required";
    }
    if (!values.lname) {
      errors.lname = "Last name is required";
    }
    if (!/^\d{11}$/i.test(values.phone)) {
      errors.phone = "Invalid phone number";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const onSubmit = async (
    { fname, lname, phone, email },
    { setSubmitting }
  ) => {
    const formData = new FormData();
    formData.append("firstname", fname);
    formData.append("lastname", lname);
    formData.append("phone", phone);
    formData.append("email", email);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      setLoading(true);
      await axiosInstance.put(`/users/userProfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated");
      setLoading(false);
      // Refresh user data after update
      const { data } = await axiosInstance.get(`/users/userProfile`);
      setUserData(data.data);
      setImagePreview(data.data.image);
    } catch (err) {
      console.log(err);
      toast.error("Error updating profile");
    }
    setSubmitting(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const toggleDisable = (property) => {
    setDisabled((prev) => ({ ...prev, [property]: !prev[property] }));
  };
  if (!userData || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="h-screen">
          <Loader />
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center mt-20">
      <label
        htmlFor="uploadFile"
        className="flex flex-col items-center cursor-pointer"
      >
        <div className="relative w-32 h-32">
          <img
            src={imagePreview == "1.jpg" ? "/defultImage.png" : imagePreview}
            alt="user"
            className="rounded-full object-cover w-full h-full"
          />
          <div className="absolute bottom-0 right-0 rounded-full w-10 h-10 bg-gray-600 flex items-center justify-center">
            <IoCameraOutline color="white" size={"22px"} />
          </div>
        </div>
        <input
          type="file"
          id="uploadFile"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
      <Formik
        initialValues={{
          email: userData.email,
          fname: userData.firstname,
          lname: userData.lastname,
          phone: userData.phone,
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
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mt-4 text-main-800"
          >
            <div className="mb-4">
              <label className="block font-semibold mb-2">First Name</label>
              <div className="flex items-center gap-2 border rounded p-2">
                <FaRegUser />
                <input
                  type="text"
                  name="fname"
                  className="flex-1 disabled:opacity-50 border-none outline-none"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.fname}
                  disabled={disabled.fName}
                />
                <MdOutlineEdit
                  size={25}
                  onClick={() => toggleDisable("fName")}
                  className="cursor-pointer"
                />
              </div>
              {touched.fname && errors.fname && (
                <div className="text-red-500">{errors.fname}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Last Name</label>
              <div className="flex items-center gap-2 border rounded p-2">
                <FaRegUser />
                <input
                  type="text"
                  name="lname"
                  className="flex-1   disabled:opacity-50 border-none outline-none"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lname}
                  disabled={disabled.lName}
                />
                <MdOutlineEdit
                  size={25}
                  onClick={() => toggleDisable("lName")}
                  className="cursor-pointer"
                />
              </div>
              {touched.lname && errors.lname && (
                <div className="text-red-500">{errors.lname}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block  font-semibold  mb-2">Phone</label>
              <div className="flex items-center gap-2 border rounded p-2">
                <MdOutlinePhone />
                <input
                  type="text"
                  name="phone"
                  className="flex-1 disabled:opacity-50 border-none outline-none"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  disabled={disabled.phone}
                />
                <MdOutlineEdit
                  size={25}
                  onClick={() => toggleDisable("phone")}
                  className="cursor-pointer"
                />
              </div>
              {touched.phone && errors.phone && (
                <div className="text-red-500">{errors.phone}</div>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-semibold mb-2">Email</label>
              <div className="flex items-center gap-2 border rounded p-2">
                <AiOutlineMail />
                <input
                  type="text"
                  name="email"
                  className="flex-1 border-none disabled:opacity-50 outline-none"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  disabled={disabled.email}
                />
                <MdOutlineEdit
                  size={25}
                  onClick={() => toggleDisable("email")}
                  className="cursor-pointer"
                />
              </div>
              {touched.email && errors.email && (
                <div className="text-red-500">{errors.email}</div>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-main-800  text-white py-2 rounded mt-4"
              disabled={isSubmitting}
            >
              Save Changes
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
