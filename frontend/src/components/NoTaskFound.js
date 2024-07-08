import React from "react";
function NoTaskFound() {
  return (
    <div className="h-96  w-full mt-10  flex justify-center items-center flex-col ">
      <p className="sm:text-xl  text-main-400 font-link  lg:text-2xl font-bold ">
        Not Found Tasks Please Add Tasks
      </p>
      <img src="/noTask.svg" alt="" className={`h-96 `} />
    </div>
  );
}

export default NoTaskFound;
