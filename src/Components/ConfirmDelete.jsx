import "../Styles/confirmDelete.css";

function ConfirmDeleteModal({ message, onConfirm, onCancel }) {
  return (
    <div className="confirm-delete-modal-overlay active">
      <div className="confirm-delete-modal active">
        <h3>Confirm Delete</h3>
        <p>{message}</p>

        <div className="confirm-delete-modal-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-delete" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
