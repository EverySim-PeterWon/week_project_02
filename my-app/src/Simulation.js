import React, { useEffect } from "react";

function SimExec() {
  useEffect(() => {
    const scriptCore = document.createElement("script");
    scriptCore.src = "https://pyscript.net/releases/2024.4.1/core.js";
    scriptCore.type = "module";
    document.body.appendChild(scriptCore);

    const linkCSS = document.createElement("link");
    linkCSS.rel = "stylesheet";
    linkCSS.href = "https://pyscript.net/releases/2024.4.1/core.css";
    document.head.appendChild(linkCSS);

    return () => {
      document.body.removeChild(scriptCore);
      document.head.removeChild(linkCSS);
    };
  }, []);

  return (
    <div>
      <py-script src="/euler_equation.py"></py-script>
    </div>
  );
}

export default SimExec;
