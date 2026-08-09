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
import { VillachPage } from './pages/VillachPage';
import { PiranPage } from './pages/PiranPage';
import PiranPage1 from './pages/PiranPage1';
import RoomPage from './pages/RoomPage';
import RoomPage1 from './pages/RoomPage1';
import { Room } from './types/Room';
import AngebotePage from './pages/AngebotePage';
import ContactPage from './pages/ContactPage';
import ServicePage from './pages/ServicePage';
import RoomPage2 from './pages/RoomPage2';
import FreizeitPage from './pages/FreizeitPage';
import UmgebungPage from './pages/UmgebungPage';

const rooms: Room[] = [
  {
    id: '1',
    title: 'Room1',
    subtitle: 'string',
    guests: 3,
    beds: '2',
    size: '20m²',
    amenities: ['WiFi', 'TV'],
    images: ['room1_1.jpg', 'room1_2.jpg'],
    basePrice: 120,
    availability: [{ date: '2026-02-10', booked: false }],
  },
  {
    id: '2',
    title: 'Room2',
    subtitle: 'string',
    guests: 2,
    beds: '1',
    size: '18m²',
    amenities: ['WiFi'],
    images: ['room2_1.jpg', 'room2_2.jpg'],
    basePrice: 100,
    availability: [{ date: '2026-02-10', booked: true }],
  },
];


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
