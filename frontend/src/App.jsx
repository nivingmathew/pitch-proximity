import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    // Login State
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Game State
    const [question, setQuestion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedYear, setSelectedYear] = useState(2008);

    // 1. Check for token on page load
    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setIsLoggedIn(true);
            fetchQuestion();
        }
    }, []);

    // 2. Handle the Login Button Click
    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/login', { username });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username);
            setIsLoggedIn(true);
            fetchQuestion();
        } catch (err) {
            console.error('Login failed', err);
            alert('Login failed. Check if Spring Boot is running!');
        }
    };

    // 3. Fetch a question from the backend
    const fetchQuestion = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8080/api/question/random');
            setQuestion(response.data);
        } catch (err) {
            console.error('Error fetching question:', err);
            setError('Failed to connect to backend.');
        } finally {
            setLoading(false);
        }
    };

    // ==========================================
    // UI 1: THE LOGIN SCREEN (If not logged in)
    // ==========================================
    if (!isLoggedIn) {
        return (
            <div style={{ padding: '50px', textAlign: 'center', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
                <h1>⚽ PitchProximity</h1>
                <p>Enter a username to join the arena:</p>
                <div style={{ marginTop: '20px' }}>
                    <input
                        type="text"
                        placeholder="e.g. Invincible99"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{ padding: '10px', fontSize: '16px', width: '60%', marginRight: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <button
                        onClick={handleLogin}
                        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}
                    >
                        Enter Game
                    </button>
                </div>
            </div>
        );
    }

    // ==========================================
    // UI 2: THE MAIN GAME SCREEN (If logged in)
    // ==========================================
    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
            <h1>⚽ PitchProximity</h1>
            <p>Playing as: <strong>{username}</strong></p>

            {loading && <p>Loading question from backend...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && question && (
                <div style={{ margin: '20px 0', padding: '20px', border: '1px solid #007bff', borderRadius: '8px', backgroundColor: '#f8f9fa' }}>
                    <p style={{ fontSize: '12px', color: '#6c757d', fontWeight: 'bold' }}>QUESTION #{question.id}</p>
                    <h2 style={{ fontSize: '18px', color: '#333' }}>{question.eventDescription}</h2>
                </div>
            )}

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

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                    onClick={fetchQuestion}
                    style={{ padding: '10px 15px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    🔄 Next Question
                </button>
                <button
                    style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    🔒 Lock Answer
                </button>
                <button
                    onClick={() => { localStorage.clear(); setIsLoggedIn(false); setUsername(''); }}
                    style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default App;