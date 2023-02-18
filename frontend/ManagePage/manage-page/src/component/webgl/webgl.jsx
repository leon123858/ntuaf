import React, { useEffect, useRef, useState } from 'react'
import Ring from './ring'
import { Canvas } from '@react-three/fiber'
import { Physics, usePlane } from '@react-three/cannon'
import * as THREE from "three";

// import { count } from 'console'

function Plane(props) {
    const [ref] = usePlane(() => ({ mass: 0, ...props }), useRef())
    return (
      <mesh ref={ref}>
        <planeGeometry args={[25, 25]} />
        <meshStandardMaterial />
      </mesh>
    )
}


const Index=()=>{

    const seconds =8;

    // const [rotation,setRotation] = useState([0, 0, 0]);

    // const [angle, setangle] = useState(rotation);

    const [counter,setCounter] = useState(0)

    const [remainseconds, setRemainSecond] = useState(0)
    // const P = 
    const array = [false,false,false,false,false,false,false,false];
    const [ringposition,setposition] = useState()

    const [myarray,setarray] = useState(array);

    const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3( 80, 35, -60 ),
        new THREE.Vector3( 30, -30, -60 ),
        new THREE.Vector3(-30, -30, -60 ),
        new THREE.Vector3( -60, 35, -60 )
    );

    const points = curve.getPoints( 7 );

    // console.log("rotation",rotation);

    console.log("points",points);
    // console.log("ring1",myarray[0]);

    useEffect(()=>{
        const countdown = seconds;

        const startTome = Date.now();
        // console.log("remian",remainseconds,"s")
        const countDownTimer = setInterval(() =>{
            const pastSeconds = parseInt((Date.now() - startTome)/500)
            const remain = (countdown - pastSeconds)

            setRemainSecond(remain < 0 ? 0 : remain);

            setCounter((count => count + 1));

            array[7-remain] =true;

            setarray(array);

            // const curAngle = rotation;

            // console.log("currrent angle",curAngle);

            // setangle([Math.PI/curAngle[0],curAngle[1],curAngle[2]])

            // setRotation(curAngle+[0.9,0,0])


            console.log("counter", counter);
            console.log("remian",remain,"s")


            if(remain <=0){
                clearInterval(countDownTimer)
            }
        },500)
    },[seconds])


    return(
        <div
            style={{
                height: "60vh",
            }}
        >
            <Canvas camera={{ position: [0, 0, 0], fov: 1000 }} >
                <ambientLight intensity={1} />
                <Physics colliders="cuboid">
                    <mesh>
                        {/* <Plane position={[0, 0, -15]} rotation-z={1} scale={[1, 1, 1]} /> */}
                        <Ring position={points[0]} rotation={[Math.PI / 0.9, 0, 0]} visible ={myarray[0]}/>
                        <Ring position={points[1]}  rotation={[Math.PI / 1.5, 0, 0]} visible ={myarray[1]}/>
                        <Ring position={points[2]}  rotation={[Math.PI / 2.3, 2.5, 0]} visible ={myarray[2]}/>
                        <Ring position={points[3]}  rotation={[Math.PI / 2.8, 2.5, 0]} visible ={myarray[3]}/>
                        <Ring position={points[4]} rotation={[Math.PI / 3.1, 2.5, 0]} visible ={myarray[4]}/>
                        <Ring position={points[5]} rotation={[Math.PI / 4.5, 2.5, 0]} visible ={myarray[5]}/>
                        <Ring position={points[6]} rotation={[Math.PI / 5.5, 2.5, 0]} visible ={myarray[6]}/>
                        <Ring position={points[7]} rotation={[Math.PI / 6.4, 2.5, 0]} visible ={myarray[7]}/>
                     </mesh>
                    {/* <Debug /> */}
                </Physics>
                
            </Canvas> 
        </div>
    )
}
export default Index;