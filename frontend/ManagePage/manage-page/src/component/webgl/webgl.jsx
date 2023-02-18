import React, { useEffect, useRef, useState } from 'react'
import Ring from './ring'
import { Canvas } from '@react-three/fiber'
import { Physics, usePlane } from '@react-three/cannon'
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
    const [counter,setCounter] = useState(0)

    const [remainseconds, setRemainSecond] = useState(0)
    // const P = 
    const array = [true,false,false,false,false,false,false,false];
    const [ringposition,setposition] = useState()

    const [myarray,setarray] = useState(array);

    // console.log("ring1",myarray[0]);

    useEffect(()=>{
        const countdown = seconds;

        const startTome = Date.now();
        // console.log("remian",remainseconds,"s")
        const countDownTimer = setInterval(() =>{
            const pastSeconds = parseInt((Date.now() - startTome)/1000)
            const remain = (countdown - pastSeconds)

            setRemainSecond(remain < 0 ? 0 : remain);

            setCounter((count => count + 1));

            array[8-remain] =true;

            setarray(array);


            console.log("counter", counter);
            console.log("remian",remain,"s")


            if(remain <=0){
                clearInterval(countDownTimer)
            }
        },1000)
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
                        <Ring position={[80, 35, -60]} visible ={myarray[0]}/>
                        <Ring position={[60, 15, -60]}  rotation={[Math.PI / 1.5, 0, 0]} visible ={myarray[1]}/>
                        <Ring position={[40, -5, -60]}  rotation={[Math.PI / 2.3, 2.5, 0]}visible ={myarray[2]}/>
                        <Ring position={[15, -20, -60]} visible ={myarray[3]}/>
                        <Ring position={[-10, -10, -60]} rotation={[Math.PI / 3.1, 2.5, 0]} visible ={myarray[4]}/>
                        <Ring position={[-30, 10, -60]} rotation={[Math.PI / 4.5, 2.5, 0]} visible ={myarray[5]}/>
                        <Ring position={[-40, 20, -60]} rotation={[Math.PI / 5,5, 2.5, 0]} visible ={myarray[6]}/>
                        <Ring position={[-60, 35, -60]} rotation={[Math.PI / 6.4, 2.5, 0]} visible ={myarray[7]}/>
                     </mesh>
                    {/* <Debug /> */}
                </Physics>
                
            </Canvas> 
        </div>
    )
}
export default Index;