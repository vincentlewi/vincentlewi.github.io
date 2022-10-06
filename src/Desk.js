import React from 'react'

export default function Desk() {
  const vh = document.documentElement.clientHeight
  const vw = document.documentElement.clientWidth
  return (
    <div style={{
      height:2.87*vh,
      position: 'absolute',
      top: 0,
    }}>
    <model-viewer 
        style = {{
          height: vh, 
          width: vw,
          position: 'sticky',
          top: 0,
          zIndex: -100
        }}
        alt="Desk" 
        src={require("./desk2.glb")}
        disable-zoom
        shadow-intensity="1" 
        shadow-softness=".8"
        exposure='.1'
        camera-orbit="calc(-1.5rad + env(window-scroll-y) * 4rad) calc(0deg + env(window-scroll-y) * 180deg) calc(5m - env(window-scroll-y) * 10m)" 
        >
    </model-viewer>
    </div>
  )
}
        