import UploadCV from './UploadCV';
import CVRanking from './CVRanking';

function App() {
  const sampleRankings = [
    { name: 'utku.pdf', score: 68.0 },
    { name: 'ilayda.pdf', score: 67.0 },
    { name: 'kadir.pdf', score: 49.0 },
    { name: 'ilayda-link.pdf', score: 48.0 }
  ];

  return (
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
        <UploadCV />
        <CVRanking rankings={sampleRankings} />
      </div>
    </div>
  );
}

export default App; 