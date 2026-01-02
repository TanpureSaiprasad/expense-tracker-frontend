import { useState } from 'react';
import '../Styles/addExpenseModal.css';
import{ updateExpense } from '../apiServices/expenseService';
import toast from 'react-hot-toast';

function AddExpenseModal({ expense, onClose, onExpenseUpdated  }) {


    const [form, setForm] = useState({
      title: expense.title,
      amount: expense.amount,
      date: expense.date.slice(0, 10) // convert ISO → yyyy-mm-dd
    });

    const [error,setError] = useState({
      amount: '',
      note : '',
      date: ''
    });

    //Input validations
    // Amount validation
    const AmountValidation = (value) => {
      if(value == ''){
        setError({...error, amount: 'Amount is required'});
      }else if(isNaN(value) || Number(value) <= 0){
        setError({...error, amount: 'Amount should be a positive number or greater than zero'});
      }else{
        setError({...error, amount: ''});
      }
    };

    // Note validation
    const NoteValidation = (value) => {
      if(value.trim() === ''){
        setError({...error, note: 'Note is required'});
      }else if (!/^[A-Za-z ]+$/.test(value)) {
        setError({ ...error, note: "must contain only letters" });
      }else{
        setError({ ...error, note: '' });
      }
    };

    //Date Validation
    const DateValidation = (value) =>{
        if(value.trim() === ''){
          setError({...error, date: 'Date is required'});
        }
        else{
          setError({...error, date: ''});
        }
    }

    //true false variable for button enable disable
    const hasError = error.amount !== '' || error.note !== '' || error.date !== '';


    const SubmitHandler = async(e) => {
        e.preventDefault();
        try{
          const updatedExpense = await updateExpense(expense._id, form);
          onExpenseUpdated(updatedExpense); // send to parent
          toast.success("Expense updated successfully...");
          onClose();
        } catch (error) {
          toast.error("Update failed: "+ error);
        }
    }

    const handleClose = () => {
      document.querySelector('.modal').classList.remove('active');
      document.querySelector('.modal-overlay').classList.remove('active');

      setTimeout(() => {
        onClose();
      }, 300);
    };


  return (
    <div className="modal-overlay active" onClick={handleClose}>
      <div className="modal active" onClick={(e) => e.stopPropagation()}>
        <h3>Update Expense</h3>

        <form onSubmit={SubmitHandler}>
          <label>
            Amount
            <input type="number" placeholder="Enter amount" defaultValue={expense.amount} onChange={(e) => {AmountValidation(e.target.value); setForm({...form, amount: e.target.value})}} />
            {error.amount && <span className="error-box">{error.amount}</span>}
          </label>

          <label>
            Note
            <input type="text" placeholder="Enter note" defaultValue={expense.title} onChange={(e) => {NoteValidation(e.target.value); setForm({...form, title: e.target.value})}} />
            {error.note && <span className="error-box">{error.note}</span>}
          </label>

          <label>
            Date
            <input type="date" defaultValue={expense.date.slice(0, 10)} onChange={(e) => {DateValidation(e.target.value); setForm({...form, date: e.target.value})}} />
            {error.date && <span className="error-box">{error.date}</span>}
          </label>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-add" disabled={hasError}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseModal;
