import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CurrentProjectUpdate } from "../LocalStorageManage";
import { ImportProjectData } from "../components/loadProjectDb.js";

function DynamicButtons({ onButtonClick, projectData }) {
  const [buttons, setButtons] = useState([]);
  const [selectedButton, setselectedButton] = useState(null);

  // Import project name from localStorage and make dynamic button information
  useEffect(() => {
    const projectObj = JSON.parse(localStorage.getItem("project"));

    if (projectObj) {
      const projNameArray = Object.entries(projectObj).map(([key, value]) => ({
        id: key,
        name: value[0],
      }));
      setButtons(projNameArray);
    }
  }, []);

  const handleButtonClick = (buttonLabel) => {
    console.log(`Button clicked: ${buttonLabel.name}`);
    setselectedButton(buttonLabel.id);
    if (onButtonClick) {
      onButtonClick(buttonLabel);
    }
  };

  return (
    <div>
      <div>
        {buttons.length > 0 ? (
          buttons.map((buttonLabel, index) => (
            <button
              key={index}
              onClick={() => handleButtonClick(buttonLabel)}
              style={{
                // Yellow background when selected
                backgroundColor:
                  selectedButton === buttonLabel.id ? "yellow" : "",
                color: selectedButton === buttonLabel.id ? "black" : "",
                border:
                  selectedButton === buttonLabel.id ? "2px solid black" : "",
              }}
            >
              {buttonLabel.name}
            </button>
          ))
        ) : (
          <p>NO PROJECT</p>
        )}
      </div>
    </div>
  );
}

function LoadProject({ setIsOpenProject }) {
  const navigate = useNavigate();
  const [disableButton, setDisableButton] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projectData, setProjectData] = useState(null);

  // 비동기 데이터 로드
  useEffect(() => {
    const fetchData = async () => {
      const data = await ImportProjectData();
      console.log(data);
      console.log(typeof data);
      setProjectData(data);
    };

    fetchData();
  }, []);

  const handleBackClick = () => {
    navigate("/home");
  };

  const handleMakeClick = () => {
    if (selectedProject) {
      CurrentProjectUpdate(selectedProject.id);
      setIsOpenProject(false);
      navigate("/workbench");
    }
  };

  const handleDynamicButtonClick = (project) => {
    setDisableButton(false);
    setSelectedProject(project);
  };

  return (
    <div>
      <button onClick={handleBackClick}>BACK</button>
      <h1>LOAD PROJECT</h1>
      <DynamicButtons
        onButtonClick={handleDynamicButtonClick}
        projectData={projectData}
      />
      <button onClick={handleMakeClick} disabled={disableButton}>
        MAKE PROJECT
      </button>
    </div>
  );
}

export default LoadProject;
