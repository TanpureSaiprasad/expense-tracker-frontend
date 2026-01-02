import { useState } from 'react';
import '../Styles/addExpenseModal.css';
import {addExpense} from '../apiServices/expenseService';
import toast from 'react-hot-toast';

function AddExpenseModal({ onClose, onExpenseAdded  }) {

    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');

     const [expense, setExpense] = useState({
      title: "",
      amount: "",
      date: ""
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
    }

    //true false variable for button enable disable
    const hasError = error.amount !== '' || error.note !== '' || error.date !== '' || amount === '' || name === '' || date === '';


    const SubmitHandler = async(e) => {
        e.preventDefault();
         try {
            const newExpense = await addExpense(expense);

            onExpenseAdded(newExpense); 
            toast.success("Expense added...");
            handleClose();
        } catch (error) {
          toast.error("Unauthorized or error: " + error.response.data.message);
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
        <h3>Add Expense</h3>

        <form onSubmit={SubmitHandler}>
          <label>
            Amount
            <input type="number" placeholder="Enter amount" value={amount} onChange={(e) => {setAmount(e.target.value); AmountValidation(e.target.value); setExpense({...expense, amount: e.target.value})}} />
            {error.amount && <span className="error-box">{error.amount}</span>}
          </label>

          <label>
            Note
            <input type="text" placeholder="Enter note" value={name} onChange={(e) => {setName(e.target.value); NoteValidation(e.target.value); setExpense({...expense, title: e.target.value})}} />
            {error.note && <span className="error-box">{error.note}</span>}
          </label>

          <label>
            Date
            <input type="date" value={date} onChange={(e) => {setDate(e.target.value); DateValidation(e.target.value); setExpense({...expense, date: e.target.value})}} />
            {error.date && <span className="error-box">{error.date}</span>}
          </label>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-add" disabled={hasError}>
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddExpenseModal;
