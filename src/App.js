import React from 'react'
import './App.css'
import Goo from './Goo.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Desk from './Desk'

export default function App() {
  return (
    <div className='App'>
      <div className='content'>
          <div className='screen head'>
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
      <Desk />
    </div>
  )
}