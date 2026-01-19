export default function ConfirmModal({ title, message, onCancel, onConfirm }) {
  return (
    <div className="modalBackdrop">
      <div className="modal">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="modalActions">
          <button type="button" onClick={onCancel}>Cancel</button>
          <button type="button" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
}