import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedYear, setSelectedYear] = useState(2008);

    // Function to fetch a new random question from Spring Boot
    const fetchQuestion = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8080/api/question/random');
            setQuestion(response.data);
        } catch (err) {
            console.error('Error fetching question:', err);
            setError('Failed to connect to backend. Is Spring Boot running?');
        } finally {
            setLoading(false);
        }
    };

    // Fetch question automatically on page load
    useEffect(() => {
        fetchQuestion();
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <h1>PitchProximity</h1>

            {/* Loading State */}
            {loading && <p>Loading question from backend...</p>}

            {/* Error State */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Question Card */}
            {!loading && !error && question && (
                <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #007bff', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
                    <p style={{ fontSize: '12px', color: '#6c757d', fontWeight: 'bold' }}>QUESTION #{question.id}</p>
                    <h2 style={{ fontSize: '18px', color: '#333' }}>{question.eventDescription}</h2>
                </div>
            )}

            {/* Slider Control */}
            <div style={{ margin: '30px 0' }}>
                <h3>Your Guess: <span style={{ color: '#007bff', fontSize: '24px' }}>{selectedYear}</span></h3>
                <input
                    type="range"
                    min="1990"
                    max="2026"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666' }}>
                    <span>1990</span>
                    <span>2026</span>
                </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                    onClick={fetchQuestion}
                    style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                     Next Question
                </button>
                <button
                    style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                     Lock Answer
                </button>
            </div>
        </div>
    );
}

export default App;