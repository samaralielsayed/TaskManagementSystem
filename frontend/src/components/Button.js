import React from "react";
import { useNavigate } from "react-router-dom";

export default function Button(props) {
  const { name, icon, navigate } = props;
  const navigatee = useNavigate();

  return (
    <>
      <div
        className="flex justify-start mb-7"
      >
        <button
          type="button"
          onClick={() => {
            navigatee(navigate);
          }}
          className={`text-white px-4  lg:px-8 bg-main-800   rounded-3xl right-0 hover:bg-main-800/90 focus:ring-4  font-medium text-sm  py-2.5 inline-flex items-center justify-center`}
        >
          {icon && React.createElement(icon, { className: "w-5 h-5 me-2" })}
          {name}
        </button>
      </div>
    </>
  );
}
