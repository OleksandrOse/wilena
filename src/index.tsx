import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import './index.scss';
import App from './App';
import { HomePage } from './pages/homePage';

import { Room } from './types/Room';
import AngebotePage from './pages/AngebotePage';
import ContactPage from './pages/ContactPage';
import ServicePage from './pages/ServicePage';
import RoomPage2 from './pages/RoomPage2';
import FreizeitPage from './pages/FreizeitPage';
import UmgebungPage from './pages/UmgebungPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="/apartment1" element={<RoomPage2 key="apt1" apartmentId="1" />} />
        <Route path="/apartment2" element={<RoomPage2 key="apt2" apartmentId="2" />} />
        <Route
          path="/angebote"
          element={<AngebotePage />}
        ></Route>
        <Route path="/freizeit" element={<FreizeitPage />} />
        <Route path="/umgebung" element={<UmgebungPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* <Route path="/accessories/*" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<FavouritesPage />} />

          <Route path="*" element={<NotFoundPage />} /> */}

      </Route>
    </Routes>
  </Router>,
  // </React.StrictMode>
);
