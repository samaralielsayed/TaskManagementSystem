import React from "react";
import { MdPendingActions } from "react-icons/md";
import { TbProgressHelp } from "react-icons/tb";
import { MdOutlineTaskAlt } from "react-icons/md";
export default function TaskStatus({ status }) {
  return (
    <>
      {status === "Completed" && (
        <p className="text-green-700 mt-2 md:mt-0">
          <MdOutlineTaskAlt className="w-6 h-6 inline-block me-2" />
          {status}
        </p>
      )}
      {status === "Pending" && (
        <p className="text-[#d29072] mt-2 md:mt-0 ">
          <MdPendingActions className="w-6 h-6 inline-block me-2" />
          {status}
        </p>
      )}
      {status === "In Progress" && (
        <p className="text-[#5b9ad5]  mt-2 md:mt-0">
          <TbProgressHelp className="w-6 h-6 inline-block me-2" />
          {status}
        </p>
      )}
    </>
  );
}
