// Вставити у Footer замість блоку Bankverbindung (IBAN/BIC/банк видалити повністю).
// import { Link } from 'react-router-dom';

import { Link } from "react-router-dom";

<div className="footer__legal">
  <p className="footer__legal-title">RECHTLICHES &amp; INFORMATIONEN</p>
  <ul className="footer__legal-list">
    <li><Link to="/stornobedingungen">Buchungs- &amp; Stornobedingungen</Link></li>
    <li><Link to="/hausordnung">Hausordnung</Link></li>
    <li><Link to="/impressum">Impressum</Link></li>
    <li><Link to="/datenschutz">Datenschutz</Link></li>
  </ul>
</div>

/* SCSS (у стилі Footer):
.footer__legal { margin-top: 24px; }
.footer__legal-title { font-size: 11px; letter-spacing: .16em; color: rgba(245,240,232,.5); margin-bottom: 10px; }
.footer__legal-list { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px 20px; }
.footer__legal-list a { font-size: 13px; color: rgba(245,240,232,.75); text-decoration: none; transition: color .2s; }
.footer__legal-list a:hover { color: #c9a24d; }
*/
