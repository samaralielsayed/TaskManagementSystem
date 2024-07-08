import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import Button from "../components/Button";
import { FaArrowLeftLong } from "react-icons/fa6";
const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname != "/not-found") {
      navigate("/not-found", { replace: true });
    }
  }, []);
  return (
    <div className="flex h-screen justify-center items-center flex-col overflow-hidden">
      <div className="mt-28">
        <Button name="Back to Home" icon={FaArrowLeftLong} navigate="/" />
      </div>
      <img className=" w-1/2" src="/notFoundDark.svg" alt="" />
    </div>
  );
};

export default NotFound;
