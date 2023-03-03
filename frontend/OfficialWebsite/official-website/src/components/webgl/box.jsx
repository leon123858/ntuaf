// import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

function Box(props) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef()
  // Hold state for hovered and clicked events
//   const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
//   useFrame((state, delta) => (ref.current.rotation.z += delta))
  useFrame((state, delta) => (ref.current.rotation.y += delta))

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
    //   onPointerOver={(event) => hover(true)}
    >
    {/* <boxGeometry args={[1, 1, 1]} /> */}
      <torusGeometry args={[10, 1.1, 30, 200]}></torusGeometry>
      <meshBasicMaterial color = {0xffff00 } />
    </mesh>
  )
}


export default Box;