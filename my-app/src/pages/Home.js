import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleNewClick = () => {
    navigate("/new-project");
  };

  const handleLoadClick = () => {
    navigate("/load-project");
  };

  return (
    <div>
      <button onClick={handleNewClick}>NEW PROJECT</button>
      <button onClick={handleLoadClick}>LOAD PROJECT</button>
    </div>
  );
};

export default Home;
