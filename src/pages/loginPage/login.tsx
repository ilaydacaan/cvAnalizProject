import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig.ts';
import { useNavigate, Link } from 'react-router-dom';
import { 
  pageStyles,
  formContainerStyles,
  titleStyles,
  inputGroupStyles,
  labelStyles,
  inputStyles,
  buttonStyles,
  switchButtonStyles,
  errorStyles
} from './style';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Önceki hataları temizle
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); // Ana sayfaya yönlendir
    } catch (err) {
      setError('Giriş başarısız. Lütfen e-posta ve şifrenizi kontrol edin.'); // Daha genel bir hata mesajı
      console.error(err); // Konsola detaylı hatayı yazdır
    }
  };

  return (
    <div style={pageStyles}>
      <div style={formContainerStyles}>
        <h2 style={titleStyles}>Giriş Yap</h2>
        
        {error && <div style={errorStyles}>{error}</div>}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={inputGroupStyles}>
            <label style={labelStyles} htmlFor="email">E-posta</label>
            <input 
              id="email"
              type="email"
              placeholder="ornek@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={inputStyles as React.CSSProperties}
            />
          </div>
          <div style={inputGroupStyles}>
            <label style={labelStyles} htmlFor="password">Şifre</label>
            <input 
              id="password"
              type="password"
              placeholder="Şifreniz"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyles as React.CSSProperties}
            />
          </div>
          <button type="submit" style={buttonStyles}>Giriş Yap</button>
        </form>
        <Link to="/signup" style={switchButtonStyles}>Hesabınız yok mu? Kayıt olun</Link>
      </div>
    </div>
  );
}
