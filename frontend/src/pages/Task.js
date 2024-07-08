import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../components/Button";
import { CiSquarePlus } from "react-icons/ci";
import { MdEdit, MdDelete, MdOutlineTaskAlt } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { TbProgressHelp } from "react-icons/tb";
import axiosInstance from "../interceptor";
import Skeleton from "react-loading-skeleton";
import ConfirmDelete from "../components/ConfirmDelete";
import { Link } from "react-router-dom";
import NoTaskFound from "../components/NoTaskFound";
import TaskDetails from "../components/TaskDetails";
import { FaRegEye } from "react-icons/fa";
import TaskStatus from "../components/TaskStatus";
export default function Task() {
  const [tasks, setTasks] = useState([]);

  const [status, setStatus] = useState("");
  const [renderDelete, setRenderDelete] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [limit, setLimit] = useState(0);
  const arrOfCards = [];
  const [idDelete, setIdDelete] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showModalDetailsTask, setShowModalDetailsTask] = useState(false);
  const [NotTask, setNotTask] = useState(false);
  for (let i = 0; i < limit; i++) {
    arrOfCards.push(i);
  }

  useEffect(() => {
    getAllTasks();
  }, [renderDelete, status]);

  const getAllTasks = async () => {
    try {
      let data;
      setLoading(true);
      if (status && status !== "All") {
        data = await axiosInstance.get(`/tasks/status?status=${status}`);
        setLoading(false);
      } else {
        setLoading(true);
        data = await axiosInstance.get(`/tasks`);
        setLoading(false);
      }
      setLimit(data.data.data.length);
      setTasks(data.data.data);
    } catch (err) {
      if (err.response.status == 404) {
        console.log("tasks", tasks.length);
        setTasks([]);
        setNotTask(true);
      }
      console.log(err.response?.data || err.message, "err");
    }
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const deleteTask = async (id) => {
    await axiosInstance.delete(`/tasks/${id}`);
    setRenderDelete(!renderDelete);
    toast("Task deleted successfully");
  };

  return (
    <>
      <div className="mb-10 mt-20 mx-10 md:mx-20 lg:mx-52  flex justify-center items-center flex-col ">
        <div className="flex justify-between items-start w-full">
          <Button name="Add Task" icon={CiSquarePlus} navigate="/tasks/add" />
          <select
            className="border  border-main-50 bg-main-50 text-main-400  font-bold text-md rounded-3xl px-4 lg:px-8 p-2.5"
            onChange={handleStatusChange}
            value={status}
          >
            <option value="">All</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {NotTask && tasks.length == 0 ? (
          <NoTaskFound />
        ) : (
          <div className="bg-main-50 w-full p-8 rounded-3xl text-main-800 ">
            {isLoading
              ? arrOfCards.map((num) => (
                  <Skeleton className="rounded-xl py-7 px-5 my-3" />
                ))
              : tasks.map((task) => (
                  <div
                    className="bg-slate-50 rounded-xl py-3 px-5 my-5"
                    key={task.id}
                  >
                    <div className="flex justify-between">
                      <div className="md:flex-row flex  items-center flex-col ">
                        <div className="me-7">
                          <p className="font-bold">{task.title}</p>
                          <p>
                            {new Date(task.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <TaskStatus status={task.status} />
                      </div>
                      <div className="flex flex-col md:flex-row items-start">
                        <button
                          className="me-3  p-2 rounded-xl bg-main-50 "
                          onClick={() => {
                            setIdDelete(task.id);
                            setShowModalDetailsTask(true);
                          }}
                        >
                          <FaRegEye className=" w-6 h-6 text-main-800 " />
                        </button>
                        <Link
                          to={`/tasks/edit/${task.id}`}
                          className="p-2 me-3 rounded-xl bg-main-50 my-2 md:my-0"
                        >
                          <MdEdit className="w-6 h-6 text-main-800 " />
                        </Link>
                        <button
                          className=" p-2 rounded-xl bg-main-50 "
                          onClick={() => {
                            setSelectedName(task.title);
                            setIdDelete(task.id);
                            setShowModal(true);
                          }}
                        >
                          <MdDelete className=" w-6 h-6 text-red-400 " />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        )}
        {showModal && (
          <ConfirmDelete
            title={selectedName}
            onClose={() => setShowModal(false)}
            onConfirm={() => {
              deleteTask(idDelete);
              setShowModal(false);
            }}
          />
        )}
        {showModalDetailsTask && (
          <TaskDetails
            id={idDelete}
            onClose={() => setShowModalDetailsTask(false)}
          />
        )}
      </div>
    </>
  );
}
