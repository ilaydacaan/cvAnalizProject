export const navbarStyles = {
  backgroundColor: '#004d40', // Koyu camgöbeği - projenin ana rengiyle uyumlu
  padding: '1rem 2rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  color: 'white'
};

export const navLinksStyles = {
  display: 'flex',
  gap: '1.5rem' // Linkler arasında boşluk
};

export const navLinkStyles = {
  color: 'white', // Link rengi beyaz
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '500' as '500',
  transition: 'color 0.3s ease-in-out',
  ':hover': {
    color: '#b2dfdb', // Hover rengi açık camgöbeği
  }
};

export const logoStyles = {
  fontSize: '1.5rem',
  fontWeight: '700' as '700',
  color: 'white',
  textDecoration: 'none'
};
