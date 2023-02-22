// import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import metal from "./download.jpg";
import * as THREE from "three";
import { random } from "lodash";




function Circle(props) {
  
  const [clicked, click] = useState(false)

  const [isfall, setfall] = useState(false)

  // const [ref] = useBox(() => ({ mass: 0, position: [0, 5, 0], ...props }))
  const ref = useRef()
  const base = new THREE.TextureLoader().load(metal);

  const time = useRef(0);
  // const isActiveRef = useRef(isActive);
  const timeMod = useMemo(() => random(0.1, 4, true), []);

  console.log(props.visible);

  // useFrame((state, delta) => {
    

  // })

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 0 : 1}
      onClick={(event) => click(!clicked)}
    >
     

      <torusGeometry 
        castShadow
        receiveShadow 
        args={[10, 0.9, 30, 200, 65]}></torusGeometry>
      {/* <boxGeometry args={[3, 3, 3]} /> */}
      <meshBasicMaterial attach="material" map={base} />
    </mesh>
  )
}


export default Circle;