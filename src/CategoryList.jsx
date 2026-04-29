export default function CategoryList({ categories, expenses, onAdd, onEdit, onDelete }) {

 
  function countItems(catId) {
    return expenses.filter(exp => Number(exp.categoryId) === Number(catId)).length;
  }

  
  function catTotal(catId) {
    const total = expenses
      .filter(exp => Number(exp.categoryId) === Number(catId))
      .reduce((sum, exp) => sum + Number(exp.amount), 0);
    return total.toFixed(2);
  }

  function removeItem(cat) {
    const count = countItems(cat.id);
    let msg = `Delete category "${cat.name}"?`;

    if (count > 0) {
      msg = `This will also delete ${count} expense(s). Are you sure?`;
    }

    const confirmed = window.confirm(msg);
    if (confirmed) { 
      onDelete(cat.id); 
    }
  }

  return (
    <div className="screen">
      <div className="screen-header">
        <h1 className="screen-title">My Categories</h1>
        <button className="btn-primary" onClick={onAdd}>
          + Add Category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="empty-state">
          <p>No categories yet!</p>
          <button className="btn-primary" onClick={onAdd}>
            Create your first one
          </button>
        </div>
      ) : (
        <ul className="category-list">
          {categories.map((cat) => {
            const count = countItems(cat.id);
            return (
              <li key={cat.id} className="category-item">
                <div className="category-info">
                  <p className="category-name">{cat.name}</p>
                  <p className="category-meta">
                    {count} expense{count !== 1 ? 's' : ''} &bull; ${catTotal(cat.id)}
                  </p>
                </div>
                <div className="action-buttons">
                  <button className="btn-edit" onClick={() => onEdit(cat)}>
                    Edit
                  </button>
                  <button className="btn-delete" onClick={() => removeItem(cat)}>
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}