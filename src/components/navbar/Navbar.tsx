// src/components/Navbar.tsx
import { Link } from 'react-router-dom';
import {
  navbarStyles,
  navLinksStyles,
  navLinkStyles,
  logoStyles
} from './style';

export default function Navbar() {
  return (
    <nav style={navbarStyles as React.CSSProperties}>
      <Link to="/" style={logoStyles as React.CSSProperties}>CV Analiz</Link>
      <div style={navLinksStyles as React.CSSProperties}>
        <Link to="/" style={navLinkStyles as React.CSSProperties}>Ana Sayfa</Link>
        <Link to="/login" style={navLinkStyles as React.CSSProperties}>Giriş Yap</Link>
        <Link to="/signup" style={navLinkStyles as React.CSSProperties}>Kayıt Ol</Link>
      </div>
    </nav>
  );
}
