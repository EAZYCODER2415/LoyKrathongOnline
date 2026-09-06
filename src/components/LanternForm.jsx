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
      <h1>Send a wish into the night</h1>
      <p>Your light will join the river above.</p>
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
          rows="6"
          name="wish"
          id="wish-desc"
          placeholder="State your wish!"
          required
          value={formData.wish || ''}
          onChange={handleInputChange}
        />
        <input type="submit" value="Release lantern" />
      </div>
      <button className="form-cancel" type="button" onClick={onToggleForm}>
        Cancel
      </button>
    </form>
  );
};

export default LanternForm;