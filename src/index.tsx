import './i118';
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
import AngebotePage from './pages/AngebotePage';
import ContactPage from './pages/ContactPage';
import ServicePage from './pages/ServicePage';
import RoomPage2 from './pages/RoomPage2';
import FreizeitPage from './pages/FreizeitPage';
import UmgebungPage from './pages/UmgebungPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ProtectedAdminRoute from './components/ProtectedAdminRoute';
import AdminPage from './pages/AdminPage';
import LegalPage from './pages/LegalPage';
import {
  stornoDoc,
  hausordnungDoc,
  impressumDoc,
  datenschutzDoc,
  cookiesDoc
} from './data/legalContent';
import NotFoundPage from './pages/NotFoundPage';

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

        <Route path="/apartment-166" element={<RoomPage2 key="apt1" apartmentId="1" />} />
        <Route path="/apartment-172" element={<RoomPage2 key="apt2" apartmentId="2" />} />
        <Route
          path="/angebote"
          element={<AngebotePage />}
        ></Route>
        <Route path="/freizeit" element={<FreizeitPage />} />
        <Route path="/umgebung" element={<UmgebungPage />} />
        <Route path="/service" element={<ServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/stornobedingungen" element={<LegalPage doc={stornoDoc} />} />
        <Route path="/hausordnung" element={<LegalPage doc={hausordnungDoc} />} />
        <Route path="/impressum" element={<LegalPage doc={impressumDoc} />} />
        <Route path="/datenschutz" element={<LegalPage doc={datenschutzDoc} />} />
        <Route path="/cookies" element={<LegalPage doc={cookiesDoc} />} />
        <Route path="/wilena" element={<AdminLoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>,
  // </React.StrictMode>
);
