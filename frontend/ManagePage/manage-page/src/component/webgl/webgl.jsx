import React, { useEffect, useRef, useState } from 'react'
import Ring from './ring'
import { Canvas , DirectionalLight, Shadow } from '@react-three/fiber'
import { Physics, usePlane } from '@react-three/cannon'
import * as THREE from "three";
import { TorusGeometry, MeshStandardMaterial, Mesh } from 'three';

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

    const seconds2 =50;

    const rotataArr = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]]

    const [rotations,setRotations] = useState(rotataArr);
    const [rotation ,setRotation ] = useState([0,0,0]);

    const [counter,setCounter] = useState(0)

    const [remainseconds, setRemainSecond] = useState(0)
    // const P = 
    const array = [true,false,false,false,false,false,false,false];
    const [ringposition,setposition] = useState()

    const [myarray,setarray] = useState(array);

    const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3( -60, -20, -60 ),
        new THREE.Vector3( -30, 50, -60 ),
        new THREE.Vector3( 30, 50, -60 ),
        new THREE.Vector3( 60, -20, -60 ),
    );

    const curve2 = new THREE.CubicBezierCurve3(
        new THREE.Vector3( -60, -20, -60 ),
        new THREE.Vector3( -30, 50, -60 ),
        new THREE.Vector3( 30, 50, -60 ),
        new THREE.Vector3( 60, -20, -60 ),
    );
    

    const points = curve.getPoints( 7 );

    const points2 = curve2.getPoints( 71 );

    // console.log("curve2",points2);
    const [curPoints,setPoints] = useState(points2[0]);

    console.log("rotation",rotations);

    // console.log("points",points);
    // console.log("ring1",myarray[0]);

    // useEffect(()=>{
    //     const countdown = seconds;

    //     const startTome = Date.now();
    //     // console.log("remian",remainseconds,"s")
    //     const countDownTimer = setInterval(() =>{
    //         const pastSeconds = parseInt((Date.now() - startTome)/500)
    //         const remain = (countdown - pastSeconds)

    //         setRemainSecond(remain < 0 ? 0 : remain);

    //         setCounter((count => count + 1));

    //         array[7-remain] =true;

    //         setarray(array);

    //         console.log("counter", counter);
    //         console.log("remian",remain,"s")

    //         if(remain <=0){
    //             clearInterval(countDownTimer)
    //         }
    //     },500)
    // },[seconds])



    useEffect(()=>{
        const countdown = 71;

        const startTome = Date.now();
        // console.log("remian",remainseconds,"s")
        const countDownTimer = setInterval(() =>{
            const pastSeconds = parseInt((Date.now() - startTome)/50)
            const remain = (countdown - pastSeconds)
            console.log("remain%10 = ",remain%10);
            const curRotate = [0.3+pastSeconds*0.1,pastSeconds*0.1,0]
            setRotation(curRotate);
            if(remain%10==0){
                // array[7-remain/9] =true;
                setarray(prevArray => {
                    const newArray = [...prevArray]; // create a copy of the previous array
                    prevArray[7-remain/10] =true; // update the value at index 1
                    return newArray; // return the updated array
                });

                setRotations(prevArray => {
                    const newArray = [...prevArray]; // create a copy of the previous array
                    prevArray[7-remain/10] =curRotate; // update the value at index 1
                    return newArray; // return the updated array
                });
            }
            setRemainSecond(remain < 0 ? 0 : remain);
            setPoints(points2[countdown-remain]);
            if(remain <=0){
                clearInterval(countDownTimer)
            }
        },50)
    },[seconds])


    return(
        <div
            style={{
                // width: "50vw",
                height: "60vh",
                background : "gray",
            }}
        >
            <Canvas camera={{ position: [0,0,0] }} shadows >
                <ambientLight intensity={1} />
                <spotLight intensity={0.5} position={[-60, -20, -60]} />
                <Physics colliders="cuboid">
                    <mesh castShadow receiveShadow>
                        {/* <Plane position={[0, 0, -15]} rotation-z={1} scale={[1, 1, 1]} /> */}
                        <Ring position={curPoints} rotation={rotation} visible ={myarray[0]}/>

                        <Ring position={points[0]} rotation={rotations[0]} visible ={myarray[0]}/>
                        <Ring position={points[1]} rotation={rotations[1]} visible ={myarray[1]}/>
                        <Ring position={points[2]} rotation={rotations[2]} visible ={myarray[2]}/>
                        <Ring position={points[3]} rotation={rotations[3]} visible ={myarray[3]}/>
                        <Ring position={points[4]} rotation={rotations[4]} visible ={myarray[4]}/>
                        <Ring position={points[5]} rotation={rotations[5]} visible ={myarray[5]}/>
                        <Ring position={points[6]} rotation={rotations[6]} visible ={myarray[6]}/>
                        <Ring position={points[7]} rotation={rotations[7]} visible ={myarray[7]}/>
                    </mesh>
                    {/* <Debug /> */}
                </Physics>
                
            </Canvas> 
        </div>
    )
}
export default Index;