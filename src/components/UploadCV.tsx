import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8001';

type UploadCVProps = {
  onUploadSuccess: () => void;
};

const UploadCV: React.FC<UploadCVProps> = ({ onUploadSuccess }) => {
  const [result, setResult] = useState<{ best_cv: string; score: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    const files = (e.currentTarget.cvfiles as HTMLInputElement).files;
    if (!files) return;

    setLoading(true);
    setError(null);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const res = await axios.post(`${API_URL}/analyze-cvs/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          console.log(`Yükleme ilerlemesi: ${percentCompleted}%`);
        },
      });

      console.log('Backend yanıtı:', res.data);
      setResult(res.data);

      // 🎯 Dosya yüklendikten sonra App.tsx'teki sıralamayı yenile
      onUploadSuccess();

    } catch (err) {
      console.error('CV analiz hatası:', err);
      if (axios.isAxiosError(err)) {
        setError(`Hata: ${err.response?.data?.detail || err.message}`);
      } else {
        setError(err instanceof Error ? err.message : 'CV analizi sırasında bir hata oluştu');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFolderSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const path = (file as any).webkitRelativePath || file.name;
      const folderName = path.split('/')[0];
      setSelectedFolder(folderName);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <form onSubmit={handleUpload} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '8px' }}>
            📁 CV Klasörü Seçin:
          </label>
          <input 
            type="file" 
            name="cvfiles" 
            multiple 
            required
            //@ts-ignore
            webkitdirectory=""
            //@ts-ignore
            directory=""
            onChange={handleFolderSelect}
            style={{
              marginRight: '10px',
              padding: '8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              width: '100%'
            }}
          />
          {selectedFolder && (
            <div style={{ marginTop: '8px', color: '#666' }}>
              Seçilen Klasör: {selectedFolder}
            </div>
          )}
        </div>
        <button 
          type="submit" 
          disabled={loading}
          style={{
            padding: '8px 16px',
            backgroundColor: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            width: '100%'
          }}
        >
          {loading ? 'Analiz Ediliyor...' : 'CV Analiz Et'}
        </button>
      </form>

      {error && (
        <div style={{
          color: 'red',
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#ffebee',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}

      {result && result.best_cv && (
        <div style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '4px'
        }}>
          <h3>🏆 En İyi CV: {result.best_cv}</h3>
          <p>Skor: {result.score}</p>
        </div>
      )}
    </div>
  );
};

export default UploadCV;
