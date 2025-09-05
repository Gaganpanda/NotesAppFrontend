import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignOut = () => {
  let navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("user");
    navigate("/");
  }, [navigate]);

  return null; // no UI needed
};

export default SignOut;
