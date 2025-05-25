import React from 'react';

interface CVRanking {
  name: string;
  score: number;
}

interface CVRankingProps {
  rankings: CVRanking[];
}

const CVRanking: React.FC<CVRankingProps> = ({ rankings }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginTop: '2rem'
    }}>
      {rankings.map((cv, index) => (
        <div
          key={cv.name}
          style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '1.5rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 'bold'
            }}>
              {cv.name}
            </span>
            <span style={{
              backgroundColor: '#e3f2fd',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              fontSize: '0.875rem',
              fontWeight: 'medium'
            }}>
              #{index + 1}
            </span>
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1976d2'
          }}>
            {cv.score.toFixed(1)}
          </div>
          <div style={{
            fontSize: '0.875rem',
            color: '#666'
          }}>
            Puan
          </div>
        </div>
      ))}
    </div>
  );
};

export default CVRanking; 