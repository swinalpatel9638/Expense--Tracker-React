import { useState } from 'react'
export default function AddEditExpense({ expense, categories, onSave, onCancel }) {
  const editMode = expense !== null

  const getToday = () => {
    const d = new Date()
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
  }

  const firstCat = categories.length > 0 ? categories[0].id : ''
  const [descInput, setDescInput] = useState(editMode ? expense.description : '')
  const [amountInput, setAmountInput] = useState(editMode ? expense.amount : '')
  const [catInput, setCatInput] = useState(editMode ? expense.categoryId : firstCat)
  const [dateInput, setDateInput] = useState(editMode ? expense.date : getToday())
  const [formError, setFormError] = useState('')

  function submitForm() {
    if (descInput.trim() === '') {
      setFormError('Please enter a description.')
      return
    }
    if (amountInput === '' || Number(amountInput) <= 0) {
      setFormError('Please enter a valid amount.')
      return
    }
    if (dateInput === '') {
      setFormError('Please select a date.')
      return
    }
    if (!catInput) {
      setFormError('Please select a category.')
      return
    }
    const newItem = {
      id: editMode ? expense.id : null,
      description: descInput.trim(),
      amount: Number(amountInput),
      categoryId: Number(catInput),
      date: dateInput,
    }
    onSave(newItem)
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <button className="btn-back" onClick={onCancel}>
          &larr; Back
        </button>
        <h1 className="screen-title">
          {editMode ? 'Edit Expense' : 'Add Expense'}
        </h1>
      </div>
      <div className="form-card">
        {formError !== '' && (
          <p className="form-error" style={{ color: 'red', marginBottom: '10px' }}>{formError}</p>
        )}
        <div className="form-group">
          <label className="form-label">Description</label>
          <input
            className="form-input"
            type="text"
            placeholder="e.g. Coffee, Uber ride..."
            value={descInput}
            onChange={(e) => {
              setDescInput(e.target.value)
              setFormError('')
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Amount ($)</label>
          <input
            className="form-input"
            type="number"
            placeholder="0.00"
            value={amountInput}
            onChange={(e) => {
              setAmountInput(e.target.value)
              setFormError('')
            }}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          {categories.length === 0 ? (
            <p className="form-hint" style={{ color: 'orange' }}>No categories yet. Please add a category first.</p>
          ) : (
            <select
              className="form-input"
              value={catInput}
              onChange={(e) => setCatInput(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="form-group">
          <label className="form-label">Date</label>
          <input
            className="form-input"
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={submitForm}
            disabled={categories.length === 0}
            style={{ opacity: categories.length === 0 ? 0.5 : 1 }}
          >
            {editMode ? 'Save Changes' : 'Add Expense'}
          </button>
        </div>
      </div>
    </div>
  )
}