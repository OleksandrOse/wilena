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


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<VillachPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />

          {/* <Route path="/phones" element={<CatalogList title="Mobile Phones" />} />
          <Route path="/phones/*" element={<ProductDetailsPage />} />
          <Route path="/tablets" element={<CatalogList title="Tablets" />} />
          <Route path="/tablets/*" element={<ProductDetailsPage />} /> */}
          {/* <Route
            path="/accessories"
            element={<CatalogList title="Accessories" />}
          /> */}
          {/* <Route path="/accessories/*" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<FavouritesPage />} />

          <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </Router>,
  // </React.StrictMode>
);
