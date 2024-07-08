import { RiDeleteBin5Line } from "react-icons/ri";

export default function ConfirmDelete({ onClose, onConfirm, title }) {
  return (
    <>
      <div className=" fixed bg-gray-900 inset-0 bg-opacity-50 z-50 flex justify-center items-center ">
        <div
          className="bg-gray-50
        w-[500px]  h-80 rounded-3xl flex-col flex justify-center items-center "
        >
          <div className="rounded-full bg-main-100 p-4 text-white mb-8">
            <RiDeleteBin5Line className="h-9 w-9" />
          </div>
          <h2 className="text-3xl text-main-800  ">Are you sure?</h2>
          <p className=" text-main-400 my-2">
            You want to delete Task
            <span className=" text-red-500"> {title}</span>
          </p>
          <div>
            <button
              className="px-7 py-2 bg-main-800 text-white rounded-lg hover:bg-main-800/70 focus:ring-4 focus:outline-none focus:ring-main-800/50 me-4"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="mt-4 px-7 py-2  rounded-lg border focus:ring-[#C90000]/80  hover:bg-[#C90000]/60 text-[#C90000] hover:text-white  border-[#C90000] focus:ring-5 focus:outline-none"
              onClick={() => {
                onConfirm();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
