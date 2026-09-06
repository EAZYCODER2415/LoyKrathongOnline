import React from 'react';
import Background from './components/Background.jsx';
import Lantern from './components/Lantern.jsx';
import LanternForm from './components/LanternForm.jsx';
import { useState, useEffect, useCallback } from 'react';

function App() {
  const [lanterns, setLanterns] = useState([]);
  const [lanternCount, setLanternCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', wish: '' });
  const [selectedLantern, setSelectedLantern] = useState(null);

  const handleFadeComplete = useCallback((id) => {
    setLanterns(previousLanterns => previousLanterns.map(item => (
      item.id === id ? {
        ...item,
        phase: 'looping',
        topOff: Math.round(window.innerHeight * 0.42),
        hidden: false
      } : item
    )));
  }, []);

  // Load from localStorage on initial render
  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem('lanternCount')) || 0;
    const savedLanterns = JSON.parse(localStorage.getItem('lanterns')) || [];
    const loopingLanterns = savedLanterns.map(lantern => ({
      ...lantern,
      phase: 'looping',
      topOff: Math.round(window.innerHeight * 0.42),
      hidden: false,
      xPosition: lantern.xPosition ?? Math.floor(Math.random() * 70) + 15
    }));

    setLanternCount(savedCount);
    setLanterns(loopingLanterns);
  }, []);

  // Save to localStorage whenever lanterns or count change
  useEffect(() => {
    localStorage.setItem('lanternCount', lanternCount);
    localStorage.setItem('lanterns', JSON.stringify(lanterns));
  }, [lanternCount, lanterns]);

  const handleReleaseLantern = (name, wish) => {
    const newId = lanternCount + 1;
    const newLantern = {
      id: newId,
      name: name,
      wish: wish,
      topOff: window.innerHeight + 40,
      xPosition: Math.floor(Math.random() * 70) + 15,
      phase: 'large',
      hidden: false
    };

    setLanterns(previousLanterns => [...previousLanterns, newLantern]);
    setLanternCount(newId);
    setShowForm(false);
    setFormData({ name: '', wish: '' });
  };

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <Background />
      <main className="app-container">
        <header className="app-header">
          <div className="eyebrow">A digital river of wishes</div>
          <h1>Loy Krathong <span>Online</span></h1>
          <p className="intro">Release a little light into the night and make a wish.</p>
          <div className="stats" aria-label="Festival activity">
            <div className="stat">
              <strong>{lanternCount}</strong>
              <span>lanterns released</span>
            </div>
            <div className="stat-divider" aria-hidden="true" />
            <div className="stat">
              <strong>0</strong>
              <span>krathongs created</span>
            </div>
          </div>
        </header>

        <div className="lanterns-container">
          {lanterns.filter(lantern => !lantern.hidden).map(lantern => (
            <Lantern
              key={lantern.id}
              lantern={lantern}
              onFadeComplete={handleFadeComplete}
              onLanternClick={setSelectedLantern}
            />
          ))}
        </div>

        <div className="ui-controls">
          <div className="start-buttons">
            <button
              onClick={handleToggleForm}
              className="lantern-button"
            >
              <span className="button-icon" aria-hidden="true">↑</span>
              <span>Release a lantern</span>
            </button>
            <button
              className="krathong-button"
              disabled // Krathong feature not implemented yet
            >
              <span className="button-icon" aria-hidden="true">✦</span>
              <span>Create a krathong</span>
            </button>
          </div>
        </div>

        {showForm && (
          <div className="lantern-form-overlay" onClick={handleToggleForm}>
            <div className="lantern-form" onClick={e => e.stopPropagation()}>
              <LanternForm
                showForm={showForm}
                onToggleForm={handleToggleForm}
                formData={formData}
                onFormChange={setFormData}
                onSubmit={handleReleaseLantern}
              />
            </div>
          </div>
        )}

        {selectedLantern && (
          <div className="lantern-detail-overlay" onClick={() => setSelectedLantern(null)}>
            <section
              className="lantern-detail-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="lantern-detail-title"
              onClick={event => event.stopPropagation()}
            >
              <div className="detail-kicker">A wish carried by light</div>
              <h2 id="lantern-detail-title">{selectedLantern.name}</h2>
              <p>{selectedLantern.wish}</p>
              <button type="button" onClick={() => setSelectedLantern(null)}>Close</button>
            </section>
          </div>
        )}
      </main>
    </>
  );
}

export default App;