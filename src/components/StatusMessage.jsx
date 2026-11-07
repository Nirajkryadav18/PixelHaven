import { FiAlertCircle } from "react-icons/fi";
import "./WallpaperGrid.css";

// Friendly error box with an optional "Try again" button.
function StatusMessage({ message, onRetry }) {
  return (
    <div className="status-message" role="alert">
      <FiAlertCircle size={28} />
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

export default StatusMessage;
