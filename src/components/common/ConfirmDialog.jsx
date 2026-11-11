import Modal from "./Modal";

const ConfirmDialog = ({
  title = "Confirm Action",
  message,
  onConfirm,
  onCancel
}) => {
  return (
    <Modal title={title} onClose={onCancel}>
      <p>{message}</p>

      <div className="modal-actions">
        <button
          className="btn-secondary"
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          className="btn-danger"
          onClick={onConfirm}
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;