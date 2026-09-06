import React from 'react';

const KrathongForm = ({ formData, onFormChange, onSubmit, onToggleForm, labels }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData.name, formData.wish);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onFormChange(previous => ({ ...previous, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>{labels.krathongFormTitle}</h1>
      <p>{labels.krathongFormIntro}</p>
      <div>
        <input
          type="text"
          name="name"
          placeholder={labels.namePlaceholder}
          required
          value={formData.name || ''}
          onChange={handleInputChange}
        />
        <textarea
          rows="6"
          name="wish"
          placeholder={labels.wishPlaceholder}
          required
          value={formData.wish || ''}
          onChange={handleInputChange}
        />
        <input type="submit" value={labels.krathongSubmit} />
      </div>
      <button className="form-cancel" type="button" onClick={onToggleForm}>
        {labels.cancel}
      </button>
    </form>
  );
};

export default KrathongForm;
