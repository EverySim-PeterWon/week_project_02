import React, { useState, useEffect } from "react";
import { CurrentProjectLoad } from "./LocalStorageManage";

export function ElementsInput() {
  // Dynamic Button for vertices
  function DynamicButtons({ onSelectVertex, disabledVertices, projectId }) {
    const [buttons, setButtons] = useState([]);

    // Import vertices id from localStorage and make dynamic button information
    useEffect(() => {
      const projectObj = JSON.parse(localStorage.getItem("vertices"));
      if (projectObj) {
        const filteredVertices = projectObj.filter(
          (vertex) => vertex.project_id === projectId
        );
        const pidKeys = filteredVertices.map((vertex) => vertex.pid);
        setButtons(pidKeys);
      }
    }, [projectId]);

    return (
      <div>
        <p>Vertex list</p>
        {buttons.length > 0 ? (
          buttons.map((buttonLabel, index) => (
            <button
              key={index}
              onClick={() => onSelectVertex(buttonLabel)}
              disabled={
                disabledVertices.includes(buttonLabel) ||
                disabledVertices.length >= 3
              }
            >
              {`Vertex${buttonLabel}`}
            </button>
          ))
        ) : (
          <p>NO VERTEX</p>
        )}
      </div>
    );
  }

  const CurrentProject = CurrentProjectLoad();
  const projectId = CurrentProject["id"];

  const [element, setElement] = useState({ a: "", b: "", c: "" });
  const [elements, setElements] = useState([]);
  const [error, setError] = useState("");
  const [editableInput, setEditableInput] = useState({
    a: true,
    b: true,
    c: true,
  });
  const [disabledVertices, setDisabledVertices] = useState([]);

  useEffect(() => {
    const loadedElements = JSON.parse(localStorage.getItem("elements"));
    if (loadedElements) {
      const filteredElements = loadedElements.filter(
        (element) => element.project_id === projectId
      );
      setElements(filteredElements);
    }
  }, [projectId]);

  const handleSelectVertex = (vertex) => {
    // debug log
    // console.log("Selected vertex:", vertex);
    // console.log("Disabled vertices before update:", disabledVertices);
    if (disabledVertices.length >= 3) {
      return;
    }

    if (editableInput.a && !element.a) {
      setElement((prev) => ({ ...prev, a: vertex }));
      setEditableInput((prev) => ({ ...prev, a: false }));
    } else if (editableInput.b && !element.b) {
      setElement((prev) => ({ ...prev, b: vertex }));
      setEditableInput((prev) => ({ ...prev, b: false }));
    } else if (editableInput.c && !element.c) {
      setElement((prev) => ({ ...prev, c: vertex }));
      setEditableInput((prev) => ({ ...prev, c: false }));
    }

    setDisabledVertices((prev) => {
      const updated = [...prev, vertex];
      // debug log
      console.log("Updated disabled vertices:", updated);
      return updated;
    });
  };

  const handleInputClick = (name) => {
    setEditableInput((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!element.a || !element.b || !element.c) {
      setError("Choose 3 vertices");
      return;
    }

    // Add pid to vertex information and update to localStorage
    const newElement = {
      eid: elements.length,
      a: parseInt(element.a, 10),
      b: parseInt(element.b, 10),
      c: parseInt(element.c, 10),
      project_id: projectId,
    };
    let localStorageElements =
      JSON.parse(localStorage.getItem("elements")) || [];
    localStorageElements.push(newElement);

    const updatedElements = [...elements, newElement];
    setElements(updatedElements);

    localStorage.setItem("elements", JSON.stringify(localStorageElements));
    // Initialize input and vertex buttons
    setElement({ a: "", b: "", c: "" });
    setEditableInput({ a: true, b: true, c: true });
    setDisabledVertices([]);
    setError("");
  };

  return (
    <div>
      <h2>Add Elements</h2>
      <DynamicButtons
        onSelectVertex={handleSelectVertex}
        disabledVertices={disabledVertices}
        projectId={projectId}
      />
      <h3>Elements</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="a"
          value={element.a}
          placeholder="First vertex"
          disabled={!editableInput.a}
          onClick={() => handleInputClick("a")}
          readOnly
        />
        <input
          type="text"
          name="b"
          value={element.b}
          placeholder="Second vertex"
          disabled={!editableInput.b}
          onClick={() => handleInputClick("b")}
          readOnly
        />
        <input
          type="text"
          name="c"
          value={element.c}
          placeholder="Third vertex"
          disabled={!editableInput.c}
          onClick={() => handleInputClick("c")}
          readOnly
        />
        <button type="submit">Add Elements</button>
      </form>
      <div>
        <ul>
          {elements.map((e, index) => (
            <li key={index}>
              {`elements ${index} - eid: ${e.eid}, <${e.a}, ${e.b}, ${e.c}>`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
