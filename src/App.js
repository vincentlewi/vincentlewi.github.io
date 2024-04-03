import React, { Suspense, useState, useEffect, useMemo } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Pc from './components/Pc'
import CameraControls from 'camera-controls'

CameraControls.install({ THREE })
const randomPos = (min = 10, max = -10) => Math.random() * (max - min) + min

function Controls({ zoom, focus, pos = new THREE.Vector3(), look = new THREE.Vector3() }) {
  const camera = useThree((state) => state.camera)
  const gl = useThree((state) => state.gl)
  const controls = useMemo(() => new CameraControls(camera, gl.domElement), [])
  return useFrame((state, delta) => {
    zoom ? pos.set(focus.x, focus.y, focus.z + 0.2) : pos.set(0, 2.5, 4)
    zoom ? look.set(focus.x, focus.y, focus.z - 3.5) : look.set(0, 0, 0)

    state.camera.position.lerp(pos, 0.5)
    state.camera.updateProjectionMatrix()

    controls.setLookAt(state.camera.position.x, state.camera.position.y, state.camera.position.z, look.x, look.y, look.z, true)
    return controls.update(delta)
  })
}

function Cloud({ momentsData, zoomToView }) {
  return momentsData.map(({ position, color }, i) => (
    <mesh key={i} position={position} onClick={(e) => zoomToView(e.object.position)}>
      <boxGeometry args={[0.02, 0.02, 0.02]} />
      <meshStandardMaterial color={color} />
    </mesh>
  ))
}

export default function App() {
  useEffect(() => {
    function handleEscapeKey(event) {
      if (event.code === 'Escape') {
        setZoom(false)
        setFocus({})
      }
    }
  
    document.addEventListener('keydown', handleEscapeKey)
    return () => document.removeEventListener('keydown', handleEscapeKey)
  }, [])

  const [zoom, setZoom] = useState(true)
  const [focus, setFocus] = useState({x: -0.42, y: 0.9, z: 0.7})
  const momentsArray = useMemo(() => Array.from({ length: 2500 }, () => ({ color: '#bda799', position: [randomPos(), randomPos(), randomPos()] })), [])
  return (
    <div className='App'>
      <Canvas
        camera={{position: [-0.19, 0.9, 0.7]}}
      >
        <OrbitControls enableZoom={false}/> 
        <pointLight position={[10, 10, 10]} />
        <ambientLight intensity={0.4} />
        <Suspense fallback={null}>
          <Pc zoomToView={(focusRef) => (setZoom(!zoom), setFocus(focusRef))} zoom={zoom}/>
          {/* <Paper zoomToView={(focusRef) => (setZoom(!zoom), setFocus(focusRef))}/> */}
        </Suspense>
        <Cloud momentsData={momentsArray} zoomToView={(focusRef) => (setZoom(!zoom), setFocus(focusRef))} />
        <Controls zoom={zoom} focus={focus} />
      </Canvas>
    </div>
  )
}