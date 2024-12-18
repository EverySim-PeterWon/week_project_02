import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { CurrentProjectLoad } from "./LocalStorageManage";
import * as THREE from "three";

const Scene = () => {
  const pointsRef = useRef();
  const linesRef = useRef();

  const CurrentProject = CurrentProjectLoad();
  const projectId = CurrentProject["id"];

  useEffect(() => {
    const verticesObj = localStorage.getItem("vertices");
    const elementsObj = localStorage.getItem("elements");

    // const localPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), -Center.x);
    // const helper = new THREE.PlaneHelper(localPlane, 200, 0xff0000);
    // this.scene.add(helper);

    if (verticesObj && elementsObj) {
      const verticesData = JSON.parse(verticesObj);
      const elementsData = JSON.parse(elementsObj);

      const filteredVertices = verticesData.filter(
        (v) => v.project_id === projectId
      );
      const filteredElements = elementsData.filter(
        (e) => e.project_id === projectId
      );

      const pointsGeometry = new THREE.BufferGeometry();
      const points = filteredVertices
        .map((v) => [parseFloat(v.x), parseFloat(v.y), parseFloat(v.z)])
        .flat();
      pointsGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(points, 3)
      );

      const pointsMaterial = new THREE.PointsMaterial({
        color: 0xff0000,
        size: 0.1,
      });
      const pointsMesh = new THREE.Points(pointsGeometry, pointsMaterial);
      pointsRef.current.add(pointsMesh);

      // 선 데이터 생성
      const linesGeometry = new THREE.BufferGeometry();
      const lines = [];
      filteredElements.forEach((e) => {
        const vertexA = verticesData.find((v) => v.pid === e.a);
        const vertexB = verticesData.find((v) => v.pid === e.b);
        const vertexC = verticesData.find((v) => v.pid === e.c);
        if (vertexA && vertexB) {
          lines.push(
            [
              vertexA.x,
              vertexA.y,
              vertexA.z,
              vertexB.x,
              vertexB.y,
              vertexB.z,
            ].flat()
          );
        }
        if (vertexB && vertexC) {
          lines.push(
            [
              vertexB.x,
              vertexB.y,
              vertexB.z,
              vertexC.x,
              vertexC.y,
              vertexC.z,
            ].flat()
          );
        }
        if (vertexC && vertexA) {
          lines.push(
            [
              vertexC.x,
              vertexC.y,
              vertexC.z,
              vertexA.x,
              vertexA.y,
              vertexA.z,
            ].flat()
          );
        }
      });
      const flatLines = lines.flat();
      linesGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(flatLines, 3)
      );

      const linesMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
      const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
      linesRef.current.add(linesMesh);
    }
  }, [projectId]);

  return (
    <>
      <group ref={pointsRef} />
      <group ref={linesRef} />
    </>
  );
};

// OrbitControls는 wheel 이벤트를 등록할 때 non-passive 리스너를 사용하기에
// 브러우저에서 경고가 발생함
const AppCanvas = () => {
  return (
    <div style={{ width: "100vw", height: "50vh" }}>
      <Canvas camera={{ position: [2, 2, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls enableZoom={true} enableRotate={true} enablePan={true} />
        <gridHelper args={[20, 20, 0x888888, 0x888888]} />
        <axesHelper args={[1.5]} />
        <Scene />
      </Canvas>
    </div>
  );
};

export default AppCanvas;
