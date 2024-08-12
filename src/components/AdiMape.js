import React, { useEffect, useState } from 'react';

// var mape_map = require('./mape_map.html');
const AdiMape = () => {

  return (
    <div className='App'>
      <iframe 
        src='mape_map.html'
        style={{ width: '100%', height: '100%', border: 'none' }}
      ></iframe>
    </div>
  );
};

export default AdiMape;
