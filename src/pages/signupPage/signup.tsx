import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig';
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

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Önceki hataları temizle
    try {
      // Firebase Authentication işlemi
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Firestore'a sadece güvenli alanları kaydediyoruz
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date().toISOString()
      });

      navigate('/login'); // Başarılı kayıt sonrası login sayfasına yönlendir
    } catch (err: any) {
      setError('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin veya daha sonra tekrar deneyin.'); // Daha genel bir hata mesajı
      console.error(err); // Konsola detaylı hatayı yazdır
    }
  };

  return (
    <div style={pageStyles}>
      <div style={formContainerStyles}>
        <h2 style={titleStyles}>Kayıt Ol</h2>

        {error && <div style={errorStyles}>{error}</div>}

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
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
              placeholder="Şifreniz (en az 6 karakter)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={inputStyles as React.CSSProperties}
            />
          </div>
          <button type="submit" style={buttonStyles}>Kayıt Ol</button>
        </form>
        <Link to="/login" style={switchButtonStyles}>Zaten hesabınız var mı? Giriş yapın</Link>
      </div>
    </div>
  );
}
