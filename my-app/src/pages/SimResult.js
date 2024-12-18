import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SimExec from "../Simulation";

const Result = () => {
  const navigate = useNavigate();

  const stopPyScript = () => {
    if (window.pyscript && window.pyscript.interpreter) {
      console.log("Stopping PyScript...");
      window.pyscript.interpreter.destroy(); // PyScript 중단
    }
  };

  useEffect(() => {
    // 페이지 이동 시 PyScript 중단
    return () => {
      stopPyScript();
    };
  }, []);

  const handleHomeClick = () => {
    stopPyScript();
    navigate("/home");
  };

  return (
    <div>
      <button onClick={handleHomeClick}>HOME</button>
      <SimExec />
    </div>
  );
};

export default Result;
