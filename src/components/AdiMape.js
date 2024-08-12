import React, { useEffect, useState } from 'react';

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
