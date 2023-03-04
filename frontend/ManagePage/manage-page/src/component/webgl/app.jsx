import { Canvas } from "@react-three/fiber";
import { TorusGeometry, MeshBasicMaterial, Mesh, PointLight, AmbientLight } from "three";

import * as THREE from 'three';

const material = new THREE.MeshStandardMaterial({
  color: 'white',
  roughness: 0.5,
  metalness: 0.5,
});

function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <torusGeometry args={[10, 0.9, 30, 200, 65]} />
        <meshBasicMaterial attach="material" />
      </mesh>
    </Canvas>
  );
}

export default App;
