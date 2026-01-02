import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { TfiArrowCircleUp, TfiArrowCircleDown} from "react-icons/tfi";
import "../Styles/expenseTable.css";
import UpdateExpenseModel from "./UpdateExpenseModel";
import { useState } from "react";
import { deleteExpense } from "../apiServices/expenseService";
import ConfirmDelete from "./ConfirmDelete";
import toast from "react-hot-toast";

function ExpenseTable({ expenses, month, onExpenseUpdated, onExpenseDeleted }) {

  const [showModal, setShowModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");

const filteredExpenses = expenses.filter((exp) => {
  const searchValue = search.toLowerCase();

    return (
      exp.title.toLowerCase().includes(searchValue) ||
      exp.amount.toString().includes(searchValue) ||
      exp.date.toLowerCase().includes(searchValue)
    );
  });



  const [sortConfig, setSortConfig] = useState({
    key: null,        // 'amount' or 'date'
    direction: 'asc'  // 'asc' or 'desc'
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let valueA = a[sortConfig.key];
    let valueB = b[sortConfig.key];

    // Date sorting
    if (sortConfig.key === "date") {
      valueA = new Date(valueA);
      valueB = new Date(valueB);
    }

    // Amount sorting
    if (sortConfig.key === "amount") {
      valueA = Number(valueA);
      valueB = Number(valueB);
    }

    if (sortConfig.direction === "asc") {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
  };


  const totalMonthExpense = filteredExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

  const allMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  return (
    <div className="chart-section">
      <h3>  Expenses on {month !== null ? allMonths[month] : "Selected Month"}</h3>
      <div className="table-search">
        <input
          type="text"
          placeholder="Search by title, amount or date..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search && (
          <span className="clear-search" onClick={() => setSearch("")}>
            ✕
          </span>
        )}
      </div>


      <div className="table-wrapper">

        <table className="expense-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("date")} className="sortable">
                Date
                <span className="arrow">
                  {sortConfig.key === "date"
                    ? sortConfig.direction === "asc"
                      ? <TfiArrowCircleUp size={20}/>
                      : <TfiArrowCircleDown size={20}/>
                    : <TfiArrowCircleDown size={20}/>}
                </span>
              </th>

              <th>Note</th>
              
              <th onClick={() => handleSort("amount")} className="sortable">
                Amount
                <span className="arrow">
                  {sortConfig.key === "amount"
                    ? sortConfig.direction === "asc"
                      ? <TfiArrowCircleUp size={20}/>
                      : <TfiArrowCircleDown size={20}/>
                    : <TfiArrowCircleDown size={20}/>}
                </span>
              </th>
              <th className="action-col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-data">
                  No data for this month
                </td>
              </tr>
            ) : (
              <>
                {sortedExpenses.map((exp) => (
                  <tr key={exp._id}>
                    <td data-label="Date">{exp.date}</td>
                    <td data-label="Note">{exp.title}</td>
                    <td data-label="Amount">{exp.amount}</td>

                    <td data-label="Actions" className="action-col">
                      <button
                        className="icon-btn edit-btn"
                        title="Edit"
                        onClick={() => {
                          setSelectedExpense(exp);
                          setShowModal(true);
                        }}
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        className="icon-btn delete-btn"
                        title="Delete"
                          onClick={() => {
                          setDeleteId(exp._id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}

                {/* TOTAL ROW */}
                <tr className="total-row">
                  <td colSpan="2"><strong>Total</strong></td>
                  <td><strong>₹ {totalMonthExpense}</strong></td>
                  <td></td>
                </tr>
              </>
            )}
          </tbody>

        </table>
      </div>
      {showModal && selectedExpense && (
        <UpdateExpenseModel
          expense={selectedExpense}
          onClose={() => {
            setShowModal(false);
            setSelectedExpense(null);
          }}
          onExpenseUpdated={onExpenseUpdated}
        />
      )}
      {showDeleteModal && (
        <ConfirmDelete
          message="Are you sure you want to delete this expense?"
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={async () => {
            try{
              await deleteExpense(deleteId);
              onExpenseDeleted(deleteId);
              setShowDeleteModal(false);
              toast.success("Expense deleted successfully...");

            }catch(error){
              toast.error("Delete failed: ", error);
            }

          }}
        />
      )}
    </div>
  );
}

export default ExpenseTable;
