import { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Dark mode toggle

  const handleCheck = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json();
      setResult(data);
      setShowPopup(true);
    } catch (error) {
      console.error('Error fetching preview:', error);
      alert('Error fetching preview. Try another link.');
    } finally {
      setIsLoading(false);
    }
  };

  const openPopup = () => {
    if (result) setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const theme = {
    background: darkMode ? '#121212' : 'linear-gradient(to right, #e0eafc, #cfdef3)',
    text: darkMode ? '#ffffff' : '#000000',
    inputBg: darkMode ? '#1e1e1e' : 'rgba(255, 255, 255, 0.9)',
    popupBg: darkMode ? '#1e1e1e' : '#fff',
    popupText: darkMode ? '#fff' : '#000',
    placeholder: darkMode ? '#aaa' : '#555'
  };

  return (
    <>
      <Head>
        <title>Phishing Link Detector</title>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
      </Head>

      <div style={{
        minHeight: '100vh',
        background: theme.background,
        fontFamily: 'Poppins, sans-serif',
        color: theme.text,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        animation: 'fadeIn 1s ease-in-out',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}>
        {/* Toggle Button */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            background: 'transparent',
            border: 'none',
            fontSize: '22px',
            cursor: 'pointer',
            color: theme.text
          }}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* Info Icon Top Right */}
        <div
          onClick={openPopup}
          title="Show last result"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            cursor: 'pointer',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.text}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ transition: 'transform 0.2s ease, stroke 0.2s ease' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)';
              e.currentTarget.style.stroke = '#007bff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.stroke = theme.text;
            }}
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        </div>

        {/* Title */}
        <h2 style={{
          fontSize: '32px',
          marginBottom: '20px',
          fontWeight: '600',
          textAlign: 'center'
        }}>
          🛡️ Phishing Link Detector
        </h2>

        {/* Input Box with Embedded Send Button */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
        }}>
          <input
            type="text"
            placeholder="Enter a link to check..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 50px 14px 16px',
              fontSize: '16px',
              borderRadius: '30px',
              border: 'none',
              outline: 'none',
              background: theme.inputBg,
              color: theme.text,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'box-shadow 0.3s ease-in-out',
            }}
          />

          <button
            onClick={handleCheck}
            disabled={isLoading}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#007bff',
              border: 'none',
              color: '#fff',
              fontSize: '18px',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(-50%) scale(1)')}
          >
            ➤
          </button>
        </div>

        {isLoading && <p style={{ marginTop: '20px' }}>⏳ Fetching preview...</p>}

        {/* Result Popup */}
        {showPopup && (
          <div style={popupStyle.overlay}>
            <div style={{
              ...popupStyle.modal,
              background: theme.popupBg,
              color: theme.popupText
            }}>
              {result?.data?.title ? (
                <>
                  <h3>🔍 Link Preview</h3>
                  <p><strong>Title:</strong> {result.data?.title || 'N/A'}</p>
                  <p><strong>Description:</strong> {result.data?.description || 'Not available'}</p>
                  <p><strong>Site:</strong> {result.data?.siteName || result.data?.domain || 'Unknown'}</p>
                  <p><strong>Media Type:</strong> {result.data?.mediaType || 'Unknown'}</p>
                  <p><strong>Full URL:</strong> {result.data?.url}</p>
                  <p><strong>Risk Level:</strong> {result.data?.riskLevel}</p>
                  <p><strong>Status:</strong> {result.data?.status}</p>
                  {result.data?.images && (
                    <img src={result.data.images[0]} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />
                  )}
                </>
              ) : (
                <>
                  <h3>⚠️ Preview Not Available</h3>
                  <p>This link may be restricted, private, or lacking metadata.</p>
                  <p><strong>Status:</strong> {result?.data?.status || 'Unknown'}</p>
                  <p><strong>Risk Level:</strong> {result?.data?.riskLevel || 'Suspicious'}</p>
                </>
              )}
              <button onClick={closePopup} style={popupStyle.closeButton}>Close</button>
            </div>
          </div>
        )}

        {/* Fade-in animation keyframe */}
        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          ::placeholder {
            color: ${theme.placeholder};
          }
        `}</style>
      </div>
    </>
  );
}

const popupStyle = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  modal: {
    padding: '30px',
    borderRadius: '10px',
    width: '360px',
    textAlign: 'left',
    animation: 'fadeIn 0.5s ease-in-out'
  },
  closeButton: {
    marginTop: '20px',
    padding: '8px 16px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '6px'
  }
};
