import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axiosInstance from "../interceptor";
import Loader from "./Loader";
import TaskStatus from "./TaskStatus";

export default function TaskDetails({ onClose, id }) {
  const [task, setTask] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch existing task data
    const fetchTask = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`tasks/${id}`);
        setTask(data.data);
        setLoading(false);
      } catch (err) {
        toast.error("Failed to fetch task data");
      }
    };
    fetchTask();
  }, [id]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center ${
          loading ? "hidden" : "block"
        }`}
      >
        <div className="bg-white max-w-[400px] lg:max-w-[600px] p-10 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Task Details
          </h2>
          <p className="mb-2">
            <span className="text-main-800 font-bold">Title:</span> {task.title}
          </p>
          <p className="mb-2">
            <span className="text-main-800 font-bold">Description:</span>{" "}
            {task.description}
          </p>
          <div className="mb-2 flex ">
            <span className="text-main-800 font-bold me-2">Status:</span>{" "}
            <TaskStatus status={task.status} />
          </div>
          <p className="mb-2">
            <span className="text-main-800 font-bold">Created:</span>{" "}
            {new Date(task.created_at).toLocaleDateString()}
          </p>
          <p className="mb-4">
            <span className="text-main-800 font-bold">Updated:</span>{" "}
            {new Date(task.updated_at).toLocaleDateString()}
          </p>
          <button
            className="px-6 py-2 bg-main-800 text-white rounded-lg hover:bg-main-700 focus:ring-4 focus:outline-none focus:ring-main-300"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
