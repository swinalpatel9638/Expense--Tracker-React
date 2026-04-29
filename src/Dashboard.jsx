export default function Dashboard({ expenses, categories, onAdd }) {
  const safeExpenses = expenses || []

  const now = new Date()
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`

  const dailyTotal = safeExpenses
    .filter(function(exp) { return exp.date === today })
    .reduce(function(sum, exp) { return sum + Number(exp.amount) }, 0)

  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
  const sevenDaysAgoStr = `${sevenDaysAgo.getFullYear()}-${String(sevenDaysAgo.getMonth() + 1).padStart(2, '0')}-${String(sevenDaysAgo.getDate()).padStart(2, '0')}`

  const weeklyTotal = safeExpenses
    .filter(function(exp) { return exp.date && exp.date >= sevenDaysAgoStr })
    .reduce(function(sum, exp) { return sum + Number(exp.amount) }, 0)

  const monthlyTotal = safeExpenses
    .filter(function(exp) { return exp.date && exp.date.substring(0, 7) === today.substring(0, 7) })
    .reduce(function(sum, exp) { return sum + Number(exp.amount) }, 0)

  const yearlyTotal = safeExpenses
    .filter(function(exp) { return exp.date && exp.date.substring(0, 4) === today.substring(0, 4) })
    .reduce(function(sum, exp) { return sum + Number(exp.amount) }, 0)

  function catTotal(catId) {
    let total = 0
    for (let i = 0; i < safeExpenses.length; i++) {
      if (Number(safeExpenses[i].categoryId) === Number(catId)) {
        total = total + Number(safeExpenses[i].amount)
      }
    }
    return total.toFixed(2)
  }

  function findCatName(catId) {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id === catId) {
        return categories[i].name
      }
    }
    return 'Unknown'
  }

  function showDate(date) {
    const parts = date.split('-')
    return parts[1] + '-' + parts[2] + '-' + parts[0]
  }

  function getLatest() {
    return safeExpenses.slice(-5).reverse()
  }

  const latestList = getLatest()

  return (
    <div className="screen">
      <div className="screen-header">
        <h1 className="screen-title">My Dashboard</h1>
        <button className="btn-primary" onClick={onAdd}>+ Add Expense</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Daily</p>
          <p className="stat-value">${dailyTotal.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Weekly</p>
          <p className="stat-value">${weeklyTotal.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Monthly</p>
          <p className="stat-value">${monthlyTotal.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Yearly</p>
          <p className="stat-value">${yearlyTotal.toFixed(2)}</p>
        </div>
      </div>

      <div className="section card">
        <p className="section-title">Spending by Category</p>
        {categories && categories.length > 0 ? (
          categories.map(function(cat) {
            const total = catTotal(cat.id)
            if (total === '0.00') return null
            return (
              <div key={cat.id} className="cat-row">
                <span className="cat-name">{cat.name}</span>
                <span className="cat-total">${total}</span>
              </div>
            )
          })
        ) : (
          <p className="form-hint">No categories created yet.</p>
        )}
      </div>

      <div className="section card">
        <p className="section-title">Recent Transactions</p>
        {latestList.length === 0 ? (
          <p className="form-hint">No expenses yet!</p>
        ) : (
          <ul className="expense-list">
            {latestList.map(function(exp) {
              return (
                <li key={exp.id} className="expense-item">
                  <div className="expense-info">
                    <p className="expense-desc">{exp.description}</p>
                    <p className="expense-meta">
                      {findCatName(exp.categoryId)} &bull; {showDate(exp.date)}
                    </p>
                  </div>
                  <p className="expense-amount">${Number(exp.amount).toFixed(2)}</p>
                </li>
              )
            })}
          </ul>
        )}
      </div>

    </div>
  )
}