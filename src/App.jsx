// App.jsx в стиле Windows 11 + Glassmorphism (красно-чёрно-белый)
import { useState, useEffect } from 'react';
import {
  fetchEmployees,
  addEmployeeToSheet,
  fetchFinanceData,
  addFinanceRecord
} from './api/googleSheets';
import FinanceDashboard from './components/Finance/FinanceDashboard';
import EmployeeTable from './components/Employees/EmployeeTable';
import AddEmployeeModal from './components/Employees/AddEmployeeModal';
import AddFinanceModal from './components/Employees/AddFinanceModal';

function App() {
  const [employees, setEmployees] = useState([]);
  const [finance, setFinance] = useState({ income: 0, expenses: 0, profit: 0, records: [] });
  const [modals, setModals] = useState({ employee: false, income: false, expense: false });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [employeesData, financeData] = await Promise.all([
        fetchEmployees(),
        fetchFinanceData()
      ]);
      setEmployees(employeesData);
      setFinance(financeData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (employee) => {
    try {
      await addEmployeeToSheet(employee);
      await loadData();
      closeModal('employee');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddFinance = async (record) => {
    try {
      await addFinanceRecord(record);
      await loadData();
      closeModal(record.type === 'income' ? 'income' : 'expense');
    } catch (err) {
      setError(err.message);
    }
  };

  const openModal = (name) => setModals(prev => ({ ...prev, [name]: true }));
  const closeModal = (name) => setModals(prev => ({ ...prev, [name]: false }));

  useEffect(() => { loadData(); }, []);

  if (loading) return <div className="loader">Загрузка...</div>;

  return (
    <div className="app-wrapper">
      <header className="glass-header">
        <h1>🚘 Авто Батя</h1>
        <p>Управление персоналом и деньгами — по красоте</p>
      </header>

      {error && (
        <div className="glass-alert">
          Ошибка: {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <FinanceDashboard
        data={finance}
        onAddIncome={() => openModal('income')}
        onAddExpense={() => openModal('expense')}
      />

      <section className="glass-section">
        <div className="section-header">
          <h2>Сотрудники</h2>
          <button className="btn-red" onClick={() => openModal('employee')}>+ Добавить</button>
        </div>
        <EmployeeTable employees={employees} />
      </section>

      <AddEmployeeModal
        isOpen={modals.employee}
        onClose={() => closeModal('employee')}
        onAdd={handleAddEmployee}
      />
      <AddFinanceModal
        type="income"
        isOpen={modals.income}
        onClose={() => closeModal('income')}
        onAdd={handleAddFinance}
      />
      <AddFinanceModal
        type="expense"
        isOpen={modals.expense}
        onClose={() => closeModal('expense')}
        onAdd={handleAddFinance}
      />
    </div>
  );
}

export default App;
