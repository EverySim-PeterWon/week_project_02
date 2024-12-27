import React, { useState } from "react";
import { runSolver } from "../api/solverApi";

export const Result = () => {
  const [plotUrl, setPlotUrl] = useState("");

  const handleRunSolver = async () => {
    try {
      const data = await runSolver(1);
      console.log("Solver Response: ", data);
      if (data.success) {
        const imgUrl = `http://localhost:4000/${data.url}`;
        setPlotUrl(imgUrl);
      } else {
        alert("Solver execution failed.");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <button onClick={handleRunSolver}>RUN</button>
      {plotUrl && <img src={plotUrl} alt="Result Plot" />}
    </div>
  );
};
