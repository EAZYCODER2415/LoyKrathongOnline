import React from 'react';

const LanternForm = ({ showForm, onToggleForm, formData, onFormChange, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData.name, formData.wish);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormChange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!showForm) return null;

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>Make your wish come true!!</h1>
      <p>Preserve traditional Thai culture without having to waste any resources!!</p>
      <div>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          required
          value={formData.name || ''}
          onChange={handleInputChange}
        />
        <textarea
          rows="20"
          cols="54"
          name="wish-desc"
          id="wish-desc"
          placeholder="State your wish!"
          required
          value={formData.wish || ''}
          onChange={handleInputChange}
        />
        <input type="submit" value="Submit" />
      </div>
      <button type="button" onClick={onToggleForm}>
        Back
      </button>
    </form>
  );
};

export default LanternForm;