import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadCV from './components/UploadCV';
import CVRanking from './components/CVRanking';
import Login from './pages/loginPage/login';
import SignUp from './pages/signupPage/signup';
import Navbar from './components/navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './hooks/useAuth';

function App() {
  const [rankings, setRankings] = useState<{ name: string; score: number }[]>([]);

  const fetchRankings = async () => {
    try {
      const res = await fetch("http://localhost:8001/rankings");
      const data = await res.json();
      setRankings(data);
    } catch (err) {
      console.error("❌ Sıralama verisi alınamadı:", err);
    }
  };

  useEffect(() => {
    fetchRankings();
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <div style={{
                minHeight: '100vh',
                backgroundColor: '#f5f5f5',
                padding: '2rem 0'
              }}>
                <div style={{
                  maxWidth: '1200px',
                  margin: '0 auto',
                  padding: '0 1rem'
                }}>
                  <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginBottom: '2rem'
                  }}>
                    CV Analiz Sistemi
                  </h1>
                  <UploadCV onUploadSuccess={fetchRankings} />
                  <CVRanking rankings={rankings} />
                </div>
              </div>
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
