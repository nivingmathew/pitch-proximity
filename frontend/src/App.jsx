import { useState } from 'react';

function App() {
  const [selectedYear, setSelectedYear] = useState(2008);

  return (
      <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
        <h1>PitchProximity</h1>

        {/* Mock Question for Card 4 */}
        <div style={{ margin: '30px 0', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <h2>When did Arsenal complete the Invincibles season?</h2>
        </div>

        {/* The Core Slider Component */}
        <div style={{ margin: '20px 0' }}>
          <h3>Selected Year: <span style={{ color: '#007bff' }}>{selectedYear}</span></h3>
          <input
              type="range"
              min="1990"
              max="2026"
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              style={{ width: '80%', cursor: 'pointer' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%', margin: '0 auto', fontSize: '12px' }}>
            <span>1990</span>
            <span>2026</span>
          </div>
        </div>

        <button style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer' }}>
          Lock Answer
        </button>
      </div>
  );
}

export default App;