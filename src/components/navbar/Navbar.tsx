// src/components/Navbar.tsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      backgroundColor: '#ffffff',
      padding: '1rem 2rem',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          textDecoration: 'none',
          color: '#333',
          fontSize: '1.25rem',
          fontWeight: 'bold'
        }}>
          CV Analiz
        </Link>

        <div style={{
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Çıkış Yap
            </button>
          ) : (
            <>
              <Link
                to="/login"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#007bff',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontWeight: '500'
                }}
              >
                Giriş Yap
              </Link>
              <Link
                to="/signup"
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px',
                  fontWeight: '500'
                }}
              >
                Kayıt Ol
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
