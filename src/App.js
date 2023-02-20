import React, { Suspense, useState, useEffect, useMemo } from 'react'
import './App.css'
import Goo from './Goo.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Desk from './Desk'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { PerspectiveCamera } from "three";
import Pc from './components/Pcpc'
import CameraControls from 'camera-controls'

CameraControls.install({ THREE })
const randomPos = (min = 5, max = -5) => Math.random() * (max - min) + min

function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(0, 0, 5)
    zoom ? look.set(focus.x, focus.y, focus.z - 0.2) : look.set(0, 0, 0)

    state.camera.position.lerp(pos, 0.5)
    state.camera.updateProjectionMatrix()

    controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
    return controls.update(delta)
  })
}

function Cloud({ momentsData, zoomToView }) {
  return momentsData.map(({ position, color }, i) => (
    <mesh key={i} position={position} onClick={(e) => zoomToView(e.object.position)}>
      <boxGeometry args={[0.1, 0.08, 0.003]} />
      <meshStandardMaterial color={color} />
    </mesh>
  ))
}

export default function App() {
  function CameraHelper() {
    const camera = new PerspectiveCamera(60, 1.77, 0.1, 2000)
    return <group position={[0, .8, 1.5]}>
      <cameraHelper args={[camera]} />
    </group>
  }
  
  const [zoom, setZoom] = useState(false)
  const [focus, setFocus] = useState({})
  const momentsArray = useMemo(() => Array.from({ length: 500 }, () => ({ color: 'red', position: [randomPos(), randomPos(), randomPos()] })), [])
  return (
    <div className='App'>
      <Canvas
        camera={{position: [0, .8, 1.5]}}
      >
        <OrbitControls enableZoom={false}/> 
        <pointLight position={[10, 10, 10]} />
        <ambientLight intensity={0.5} />
        <Suspense fallback={null}>
          <Pc zoomToView={(focusRef) => (setZoom(!zoom), setFocus(focusRef))}/>
        </Suspense>
        <CameraHelper />
        <Cloud momentsData={momentsArray} zoomToView={(focusRef) => (setZoom(!zoom), setFocus(focusRef))} />
        <Controls zoom={zoom} focus={focus} />
      </Canvas>
    {/* <div className='room'>
    </div>
      <div className='content'>
          <div className='screen head'>
            <p>{test}</p>
            <p>Hey there, Vincent here</p>
          </div>
          <div className='screen uh'>
            <p>Uh yeah my PC is still rendering the model</p>
          </div>
          <div className='lastScreen'>
            <div className='glass uh'>
              <p>Anyway, here's the usual 'about me'</p>
              <p className='aboutme'>I'm Vincent, a sophomore student in Singapore Management University studying Information Systems and Data Science & Analytics.</p>
            </div>
          </div>
          <div className='footer'>
            <div className='socialMedia'>
            <p>Hit me up!</p>
              <a href='https://github.com/vincentlewi'><img src={require('./socialMedia/github.png')}/></a>
              <a href='https://sg.linkedin.com/in/lewivincent'><img src={require('./socialMedia/linkedin.png')}/></a>
              <a href='https://instagram.com/vincentlewi/'><img src={require('./socialMedia/instagram.png')}/></a>
              <a href='mailto:vincentlewii@gmail.com'><img src={require('./socialMedia/email.png')}/></a>
            </div>
          </div>
      </div>
      <Desk /> */}
    </div>
  )
}