import { useState, useEffect } from 'react';
import Dashboard from './Dashboard.jsx';
import ExpenseList from './ExpenseList.jsx';
import CategoryList from './CategoryList.jsx';
import AddEditExpense from './AddEditExpense.jsx';
import AddEditCategory from './AddEditCategory.jsx';
import './App.css';

const allCategories = [
  { id: 1, name: 'Food' },
  { id: 2, name: 'Transportation' },
  { id: 3, name: 'Entertainment' },
  { id: 4, name: 'Health' },
  { id: 5, name: 'Shopping' },
  { id: 6, name: 'Utilities' },
  { id: 7, name: 'Travel' },
  { id: 8, name: 'Education' },
  { id: 9, name: 'Other' }
];

const allExpenses = [
  { id: 1, description: 'Verizon', amount: 120, categoryId: 9, date: '2026-03-10' },
  { id: 2, description: 'Gas', amount: 55.00, categoryId: 2, date: '2026-03-11' },
  { id: 3, description: 'Movie ticket', amount: 13.99, categoryId: 3, date: '2026-03-12' },
  { id: 4, description: 'Groceries', amount: 150, categoryId: 1, date: '2026-03-13' },
];

export default function App() {
  const [page, setPage] = useState('dashboard');
  const [activeExpense, setActiveExpense] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);

  
  const [nextId, setNextId] = useState(100);

  
  const [expenses, setExpenses] = useState(() => {
    localStorage.removeItem('expenses_data');
    return allExpenses;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('categories_data');
    return saved ? JSON.parse(saved) : allCategories;
  });

 
  useEffect(() => {
    localStorage.setItem('expenses_data', JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('categories_data', JSON.stringify(categories));
  }, [categories]);

  function makeId() {
    const id = nextId;
    setNextId(nextId + 1);
    return id;
  }

 
  function saveExpense(data) {
    
    const cleanData = {
      ...data,
      amount: Number(data.amount),
      categoryId: Number(data.categoryId)
    };

    if (cleanData.id) {
      
      const updated = expenses.map((e) => e.id === cleanData.id ? cleanData : e);
      setExpenses(updated);
    } else {
     
      const newItem = {
        ...cleanData,
        id: makeId(),
      };
      setExpenses([...expenses, newItem]);
    }
    setActiveExpense(null);
    setPage('expenses');
  }

  function deleteExpense(id) {
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
  }

  function editExpense(item) {
    setActiveExpense(item);
    setPage('addEditExpense');
  }

  function addExpense() {
    setActiveExpense(null);
    setPage('addEditExpense');
  }

  function saveCategory(data) {
    if (data.id) {
      const updated = categories.map((c) => c.id === data.id ? data : c);
      setCategories(updated);
    } else {
      const newItem = { id: makeId(), name: data.name };
      setCategories([...categories, newItem]);
    }
    setActiveCategory(null);
    setPage('categories');
  }

  function deleteCategory(id) {
    setCategories(categories.filter((c) => c.id !== id));
    
    setExpenses(expenses.filter((e) => e.categoryId !== id));
  }

  function editCategory(item) {
    setActiveCategory(item);
    setPage('addEditCategory');
  }

  function addCategory() {
    setActiveCategory(null);
    setPage('addEditCategory');
  }

 
  function showPage() {
    if (page === 'dashboard') {
      return (
        <Dashboard
          expenses={expenses}
          categories={categories}
          onAdd={addExpense}
        />
      );
    }
    if (page === 'expenses') {
      return (
        <ExpenseList
          expenses={expenses}
          categories={categories}
          onAdd={addExpense}
          onEdit={editExpense}
          onDelete={deleteExpense}
        />
      );
    }
    if (page === 'addEditExpense') {
      return (
        <AddEditExpense
          expense={activeExpense}
          categories={categories}
          onSave={saveExpense}
          onCancel={() => setPage('expenses')}
        />
      );
    }
    if (page === 'categories') {
      return (
        <CategoryList
          categories={categories}
          expenses={expenses}
          onAdd={addCategory}
          onEdit={editCategory}
          onDelete={deleteCategory}
        />
      );
    }
    if (page === 'addEditCategory') {
      return (
        <AddEditCategory
          category={activeCategory}
          onSave={saveCategory}
          onCancel={() => setPage('categories')}
        />
      );
    }
  }

  return (
    <div className="app-shell">
      <div className="screen-content">
        {showPage()}
      </div>

      <div className="bottom-nav">
        <button
          className={page === 'dashboard' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setPage('dashboard')}
        >
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </button>
        <button
          className={page === 'expenses' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setPage('expenses')}
        >
          <span className="nav-icon">💰</span>
          <span className="nav-label">Expenses</span>
        </button>
        <button
          className={page === 'categories' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => setPage('categories')}
        >
          <span className="nav-icon">📂</span>
          <span className="nav-label">Categories</span>
        </button>
      </div>
    </div>
  );
}