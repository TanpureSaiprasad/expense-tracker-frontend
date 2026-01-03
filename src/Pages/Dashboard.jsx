import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import YearlyChart from "../Components/YearlyChart";
import ExpenseTable from "../Components/ExpenseTable";
import '../Styles/dashboard.css'
import AddExpenseModal from "../Components/AddExpenseModel";
import { getExpenses } from "../apiServices/expenseService";

function Dashboard() {
  const [year, setYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    getExpenses().then(setExpenses);
  }, []);


  const isYearSelected = year !== "";

  // Filter by selected year
  const yearlyExpenses = expenses.filter((exp) => {
    return new Date(exp.date).getFullYear() === Number(year);
  });

  const handleExpenseAdded = (newExpense) => {
  setExpenses((prev) => [...prev, newExpense]);

  const expenseYear = new Date(newExpense.date).getFullYear();

  // Auto-select year if not selected or new year
  setYear(String(expenseYear));
  setSelectedMonth(null);
};

  
  
  // Get unique years from expenses
  const availableYears = [
    ...new Set(
      expenses.map((exp) => new Date(exp.date).getFullYear())
    )
  ].sort((a, b) => b - a); // latest year first


  // Total year expense
  const totalExpense = isYearSelected
    ? yearlyExpenses.reduce((sum, exp) => sum + exp.amount, 0)
    : 0;

  // Monthly totals for chart
  const monthlyTotals = Array(12).fill(0);

  if (isYearSelected) {
    yearlyExpenses.forEach((exp) => {
      const monthIndex = new Date(exp.date).getMonth();
      monthlyTotals[monthIndex] += exp.amount;
    });
  }

  // Filter expenses for selected month
  const monthlyExpenses =
    selectedMonth !== null
      ? yearlyExpenses.filter(
          (exp) => new Date(exp.date).getMonth() === selectedMonth
        )
      : [];

  const handleExpenseUpdated = (updatedExpense) => {
    setExpenses((prev) =>
      prev.map((exp) =>
        exp._id === updatedExpense._id ? updatedExpense : exp
      )
    );
  };

  const handleExpenseDeleted = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp._id !== id));
  };


  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        {/* HEADER */}
        <div className="dashboard-header">
          <h1>Dashboard</h1>

          <div className="filters">
            <span>Year</span>
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setSelectedMonth(null); // reset table on year change
              }}
            >
              <option value="">_ _</option>
              {
                availableYears.length > 0 ? (
                  availableYears.map((yr) => (
                    <option key={yr} value={yr}>
                      {yr}
                    </option>
                  ))
                ) : (
                  <option disabled>No expenses found</option>
                )
              }
            </select>
          </div>
        </div>

        <div className="Total-Add-Exp-Btn-container">
          <div className="total-card">
            <p>Total Year Expense</p>
            <h2>₹ {totalExpense}</h2>
          </div>

          <button
            className="add-expense-btn"
            onClick={() => setShowModal(true)}
          >
            + Add Expense
          </button>
        </div>

        {/* INFO */}
        {(!isYearSelected && expenses.length > 0) && (
          <p className="info-text">Please select a year to view data</p>
        )}

        {expenses.length === 0 && (
          <p className="info-text">No expenses added yet</p>
        )}


        {/* YEAR CHART */}
        {isYearSelected && (
          <YearlyChart
            monthlyTotals={monthlyTotals}
            onMonthClick={(monthIndex) => setSelectedMonth(monthIndex)}
          />
        )}

         {/* INFO */}
        {(isYearSelected && selectedMonth === null) && (
          <p className="info-text">Please select a month to view data</p>
        )}

        {/* MONTH TABLE */}
        {selectedMonth !== null && (
          <ExpenseTable
            expenses={monthlyExpenses}
            month={selectedMonth}
            onExpenseUpdated={handleExpenseUpdated}
            onExpenseDeleted={handleExpenseDeleted}/>
        )}

        {showModal && <AddExpenseModal onClose={() => setShowModal(false)} onExpenseAdded={handleExpenseAdded} />}
      </div>
    </>
  );
}

export default Dashboard;
