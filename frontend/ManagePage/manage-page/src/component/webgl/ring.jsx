// import { createRoot } from 'react-dom/client'
import React, { useRef, useState, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Physics, usePlane, useBox } from '@react-three/cannon'
import metal from "./Material_2084.webp"
import * as THREE from "three";
import { random } from "lodash";
import { MeshBasicMaterial } from 'three';




function Circle(props) {
  
  const [clicked, click] = useState(false)

  const [isfall, setfall] = useState(false)

  
  // const [ref] = useBox(() => ({ mass: 0, position: [0, 5, 0], ...props }))
  const ref = useRef()
  const base = new THREE.TextureLoader().load(metal);

  const time = useRef(0);
  // const isActiveRef = useRef(isActive);
  const timeMod = useMemo(() => random(0.1, 4, true), []);
  const myMaterial = new MeshBasicMaterial({ color: 'green' });
  console.log(props.visible);

  const KnotShaderMaterial = {
    uniforms: {
      u_time: { type: "f", value: 0 }
    },
    vertexShader: `
      precision mediump float;
      varying vec2 vUv;
      void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
          gl_Position = projectionMatrix * mvPosition;
          vUv = uv;
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float u_time;
  
      void main() {
        vec2 uv = vUv;
        float cb = floor((uv.x + u_time) * 40.);
        gl_FragColor = vec4(mod(cb, 2.0),mod(cb, 2.0),mod(cb, 2.0),0.5);
      }
    `
  };

  const MarbleShaderMaterial = {
    uniforms: {
      u_time: { type: "f", value: 0 },
      u_frequency: { type: "f", value: 2.0 },
      u_amplitude: { type: "f", value: 1.0 },
      u_color: { type: "vec3", value: new THREE.Color(0xffffff) },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float u_time;
      uniform float u_frequency;
      uniform float u_amplitude;
      uniform vec3 u_color;
      
      float marble(vec2 p, float freq, float amp, float time) {
        float n = sin((p.x + time) * freq) * amp;
        n += sin((p.y + time) * freq) * amp;
        return n;
      }
    
      void main() {
        vec2 uv = vUv * 5.0; // Adjust the scale of the texture
        float time = u_time * 0.5; // Adjust the speed of the texture
        
        // Calculate the noise value
        float noiseValue = marble(uv, u_frequency, u_amplitude, time);
        
        // Use the noise value to modulate the color
        vec3 color = mix(u_color, vec3(0.0), pow(abs(noiseValue), 3.0));
        gl_FragColor = vec4(color, 1.0);
      }
    `
  };
  
  

  // useFrame((state, delta) => {
    

  // })

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 0 : 1}
      onClick={(event) => click(!clicked)}
    >
      <ambientLight intensity={0.2} />
      <directionalLight />
      <torusGeometry 
        castShadow
        receiveShadow 
        args={[10, 0.9, 30, 80, 65]}
        //1.8, 1.2, 48, 64
        // material={myMaterial}
      ></torusGeometry>
      {/* <boxGeometry args={[3, 3, 3]} /> */}
      {/* <meshBasicMaterial attach="material" map={base} metalness={0.2} roughness={1.0} /> */}
      <shaderMaterial attach="material" args={[MarbleShaderMaterial]} metalness={0.2} roughness={1.0} />

    </mesh>
  )
}


export default Circle;