import React from 'react';
import { Outlet } from 'react-router-dom';


import './App.scss';

export const App: React.FC = () => {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
