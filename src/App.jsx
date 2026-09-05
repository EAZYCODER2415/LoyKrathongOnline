import React from 'react';
import Background from './components/Background.jsx';
import Lantern from './components/Lantern.jsx';
import LanternForm from './components/LanternForm.jsx';
import { useState, useEffect } from 'react';

function App() {
  const [lanterns, setLanterns] = useState([]);
  const [lanternCount, setLanternCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', wish: '' });

  // Load from localStorage on initial render
  useEffect(() => {
    const savedCount = parseInt(localStorage.getItem('lanternCount')) || 0;
    const savedLanterns = JSON.parse(localStorage.getItem('lanterns')) || [];

    setLanternCount(savedCount);
    setLanterns(savedLanterns);
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
      topOff: 615, // Starting position
      animationFrame: null
    };

    setLanterns([...lanterns, newLantern]);
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
        <div className="lanterns-container">
          {lanterns.map(lantern => (
            <Lantern key={lantern.id} lantern={lantern} />
          ))}
        </div>

        <div className="ui-controls">
          <div className="start-buttons">
            <button
              onClick={handleToggleForm}
              className="lantern-button"
            >
              Release Lantern
            </button>
            <button
              className="krathong-button"
              disabled // Krathong feature not implemented yet
            >
              Create Krathong
            </button>
          </div>

          <div className="stats">
            <h1 id="krathong-stats">{lanternCount} lanterns released, </h1>
            <h1>0 krathongs created</h1>
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
      </main>
    </>
  );
}

export default App;