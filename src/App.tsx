import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.scss';
import ScrollToTop from './hooks/ScrollTop';

export const App: React.FC = () => {
  return (
    <div className="App">
      <ScrollToTop />
      <Outlet />
    </div>
  );
}

export default App;
