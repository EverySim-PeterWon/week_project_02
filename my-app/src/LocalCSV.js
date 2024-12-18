import React from "react";
import * as dfd from "danfojs";

export function handleCSVDanfo() {
  // Save dataframe
  const [dataFrame, setDataFrame] = React.useState(null);
  // File path of dataframe
  const [outputFilePath, setOutputFilePath] = React.useState("");

  const projCSVpath = "../data/";
  const verticesCSV = `${projCSVpath}vertices.csv`;
  const elementsTriCSV = `${projCSVpath}elements_tri.csv`;
  const elementsQuadCSV = `${projCSVpath}elements_quad.csv`;

  const readCSV = async (filePath) => {
    const csvFilePath = require(filePath);
    try {
      const df_vertices = await dfd.readCSV({ csvFilePath });
      console.log("DataFrame Loaded");
      df_vertices.print();
      setDataFrame(df_vertices);
    } catch (error) {}
  };

  const exportCSV = () => {
    if (dataFrame) {
      const outputFileName = "vertices.csv";
      dfd.toCSV(dataFrame, {
        fileName: outputFileName,
        download: true,
      });
      setOutputFilePath(outputFileName);
    } else {
      console.error("No data to export");
    }
  };

  React.useEffect(() => {
    readCSV();
  }, []);

  return (
    <div>
      <h3>CSV file handler test with danfo.js</h3>
    </div>
  );
}
