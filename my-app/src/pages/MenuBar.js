import { useNavigate } from "react-router-dom";

export function MenuBarMain({
  isOpenProject,
  setIsOpenProject,
  isOpenResult,
  setIsOpenResult,
}) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    setIsOpenProject(true);
    setIsOpenResult(true);
    navigate("/home");
  };

  const handleNewClick = () => {
    setIsOpenProject(true);
    setIsOpenResult(true);
    navigate("/new-project");
  };

  const handleLoadClick = () => {
    setIsOpenProject(true);
    setIsOpenResult(true);
    navigate("/load-project");
  };

  const handleProjectClick = () => {
    setIsOpenProject(false);
    setIsOpenResult(true);
    navigate("/workbench");
  };

  const handleExecuteClick = () => {
    setIsOpenResult(false);
    alert("Execute analysis");
    navigate("/result");
  };

  const handleResultClick = () => {
    setIsOpenResult(false);
    navigate("/result");
  };

  const projectObj = localStorage.getItem("project");
  let project_count = 0;
  let time_recent = "NONE";
  if (projectObj) {
    const projNameArray = Object.values(JSON.parse(projectObj)).map(
      (item) => item[0]
    );
    const projTimeArray = Object.values(JSON.parse(projectObj)).map(
      (item) => item[1]
    );
    project_count = projNameArray.length;
    time_recent = new Date(Math.max(...projTimeArray)).toDateString();
  }

  return (
    <header>
      <ul id="menu-bar" style={{ display: "flex", alignItems: "center" }}>
        <button onClick={handleHomeClick}>HOME</button>
        <button onClick={handleNewClick}>NEW</button>
        <button onClick={handleLoadClick}>LOAD</button>
        <button onClick={handleProjectClick} disabled={isOpenProject}>
          PROJECT
        </button>
        <button onClick={handleExecuteClick} disabled={isOpenProject}>
          EXECUTE
        </button>
        <button onClick={handleResultClick} disabled={isOpenResult}>
          RESULT
        </button>
        <div>
          <p> Number of Project: {project_count}</p>
          <p> Recent work time: {time_recent}</p>
        </div>
      </ul>
    </header>
  );
}
