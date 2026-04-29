import { useState } from 'react'

export default function AddEditCategory({ category, onSave, onCancel }) {

  const editMode = category !== null

  const [nameInput, setNameInput] = useState(editMode ? category.name : '')
  const [formError, setFormError] = useState('')

  function submitForm() {
    if (nameInput.trim() === '') {
      setFormError('Category name cannot be empty.')
      return
    }

    const newItem = {
      id: editMode ? category.id : null,
      name: nameInput.trim(),
    }

    onSave(newItem)
  }

  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitForm();
    }
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <button className="btn-back" onClick={onCancel}>
          &larr; Back
        </button>
        <h1 className="screen-title">
          {editMode ? 'Edit Category' : 'New Category'}
        </h1>
      </div>

      <div className="form-card">

        {formError !== '' && (
          <p className="form-error" style={{ color: 'red', marginBottom: '10px' }}>{formError}</p>
        )}

        <div className="form-group">
          <label className="form-label">Category Name</label>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. Food, Transport, Rent..."
            value={nameInput}
            onKeyDown={handleKeyDown} 
            onChange={(e) => {
              setNameInput(e.target.value)
              setFormError('')
            }}
          />
        </div>

        <div className="form-actions">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-primary" onClick={submitForm}>
            {editMode ? 'Save Changes' : 'Create Category'}
          </button>
        </div>

      </div>
    </div>
  )
}