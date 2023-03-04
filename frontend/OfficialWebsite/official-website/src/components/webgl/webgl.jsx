import React from 'react'
import Box from './box'
import { Canvas } from '@react-three/fiber'



const Index=()=>{
    return(
        <Canvas>
            {/* <ambientLight /> */}
            <pointLight position={[0, 0, -10]} />
            <mesh>
                <Box position={[0, 0, -10]} />
            </mesh>
            {/* <Box position={[1.2, 0, 0]} /> */}
        </Canvas> 
    )
}
export default Index;