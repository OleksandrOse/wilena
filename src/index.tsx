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

          <Route path="/piran" element={<PiranPage1/>} >
            <Route path="/piran/:roomId" element={<RoomPage1 rooms={rooms} />} />
          </Route>
          {/* <Route path="/phones/*" element={<ProductDetailsPage />} />
          <Route path="/tablets" element={<CatalogList title="Tablets" />} />
          <Route path="/tablets/*" element={<ProductDetailsPage />} /> */}
          <Route
            path="/villach"
            element={<VillachPage />}
          >
            {/* <Route path=":roomId" element={<RoomPage1 rooms={rooms} />} /> */}
          </Route>
          <Route
            path="/angebote"
            element={<AngebotePage />}
          ></Route>
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
