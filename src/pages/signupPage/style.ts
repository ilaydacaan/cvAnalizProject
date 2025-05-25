export const pageStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#e0f7fa',
  padding: '2rem 0'
};

export const formContainerStyles = {
  width: '100%',
  maxWidth: '450px',
  padding: '2.5rem',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.08)',
  display: 'flex',
  flexDirection: 'column' as 'column',
  gap: '2rem'
};

export const titleStyles = {
  fontSize: '1.8rem',
  fontWeight: '700' as '700',
  textAlign: 'center' as 'center',
  color: '#00796b',
  marginBottom: '1.5rem'
};

export const inputGroupStyles = {
  display: 'flex',
  flexDirection: 'column' as 'column',
  gap: '0.6rem'
};

export const labelStyles = {
  display: 'block',
  fontSize: '0.9rem',
  fontWeight: '500' as '500',
  color: '#424242',
  marginBottom: '0.2rem'
};

export const inputStyles = {
  width: '100%',
  padding: '0.9rem 1rem',
  border: '1px solid #b0bec5',
  borderRadius: '8px',
  fontSize: '1rem',
  transition: 'border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  ':focus': {
    outline: 'none',
    borderColor: '#00796b',
    boxShadow: '0 0 0 0.2rem rgba(0, 121, 107, 0.25)',
  }
};

export const buttonStyles = {
  backgroundColor: '#00796b',
  color: 'white',
  padding: '1rem 1.5rem',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1.1rem',
  fontWeight: '600' as '600',
  cursor: 'pointer',
  marginTop: '1rem',
  transition: 'background-color 0.3s ease-in-out',
  ':hover': {
    backgroundColor: '#004d40',
  }
};

export const switchButtonStyles = {
  backgroundColor: 'transparent',
  color: '#00796b',
  padding: '0.75rem',
  border: 'none',
  fontSize: '0.9rem',
  cursor: 'pointer',
  textAlign: 'center' as 'center',
  marginTop: '0.5rem'
};

export const errorStyles = {
  backgroundColor: '#ffebee',
  color: '#c62828',
  padding: '0.75rem',
  borderRadius: '4px',
  marginBottom: '1rem',
  fontSize: '0.875rem',
  textAlign: 'center' as 'center'
};
