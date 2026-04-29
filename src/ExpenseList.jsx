import { useState } from 'react'

export default function ExpenseList({ expenses, categories, onAdd, onEdit, onDelete }) {

  const [pickedFilter, setPickedFilter] = useState('all')

  function findCatName(catId) {
    const found = categories.find(function(c) {
      return c.id === catId
    })
    if (found) { return found.name }
    return 'Unknown'
  }

  function filterList() {
    if (pickedFilter === 'all') { return expenses }
    return expenses.filter(function(e) {
      return e.categoryId === Number(pickedFilter)
    })
  }

  function getTotal() {
    const theList = filterList()
    let total = 0
    for (let i = 0; i < theList.length; i++) {
      total = total + Number(theList[i].amount)
    }
    return total.toFixed(2)
  }

  function showDate(date) {
    const parts = date.split('-')
    return parts[1] + '-' + parts[2] + '-' + parts[0]
  }

  function removeItem(id) {
    const confirmed = window.confirm('Delete this expense?')
    if (confirmed) { onDelete(id) }
  }

  const theList = filterList()

  return (
    <div className="screen">
      <div className="screen-header">
        <h1 className="screen-title">My Expenses</h1>
        <button className="btn-primary" onClick={onAdd}>
          + Add
        </button>
      </div>

      <div className="filter-row">
        <label className="filter-label">Filter by category:</label>
        <select
          className="filter-select"
          value={pickedFilter}
          onChange={function(e) { setPickedFilter(e.target.value) }}
        >
          <option value="all">All Categories</option>
          {categories.map(function(cat) {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            )
          })}
        </select>
      </div>

      <div className="summary-bar">
        <span>{theList.length} expense{theList.length !== 1 ? 's' : ''}</span>
        <span className="summary-total">Total: ${getTotal()}</span>
      </div>

      {theList.length === 0 ? (
        <div className="empty-state">
          <p>No expenses found!</p>
          <button className="btn-primary" onClick={onAdd}>Add one now</button>
        </div>
      ) : (
        <ul className="expense-list">
          {theList.map(function(exp) {
            return (
              <li key={exp.id} className="expense-item">
                <div className="expense-info">
                  <p className="expense-desc">{exp.description}</p>
                  <p className="expense-meta">
                    {findCatName(exp.categoryId)} &bull; {showDate(exp.date)}
                  </p>
                </div>
                <div className="expense-right">
                  <p className="expense-amount">${Number(exp.amount).toFixed(2)}</p>
                  <div className="action-buttons">
                    <button className="btn-edit" onClick={function() { onEdit(exp) }}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={function() { removeItem(exp.id) }}>
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}