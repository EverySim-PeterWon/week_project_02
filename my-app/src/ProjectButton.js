import React from "react";

export function SelectNewButton({ onClick }) {
  return (
    <div>
      <button onClick={onClick}>NEW PROJECT</button>
    </div>
  );
}

export function SelectLoadButton({ onClick }) {
  return (
    <div>
      <button onClick={onClick}>LOAD PROJECT</button>
    </div>
  );
}

export function SelectButton({ onClick, buttonName }) {
  return (
    <div>
      <button onClick={onClick}>{buttonName}</button>
    </div>
  );
}

export function SelectLoadProjButton({ projName }) {
  return (
    <div>
      <button>{projName}</button>
    </div>
  );
}
