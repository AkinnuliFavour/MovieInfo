import { useEffect } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast = ({
  message,
  type = "info",
  duration = 5000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />,
    error: <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />,
    info: <Info className="h-5 w-5 text-blue-500 flex-shrink-0" />,
  };

  const styles = {
    success: "bg-green-500/10 border-green-500/20 text-green-400",
    error: "bg-red-500/10 border-red-500/20 text-red-400",
    info: "bg-blue-500/10 border-blue-500/20 text-blue-400",
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md w-full sm:w-auto min-w-[300px] animate-slide-in-from-top`}
    >
      <div
        className={`${styles[type]} border rounded-lg p-4 shadow-lg flex items-start gap-3 backdrop-blur-sm`}
      >
        {icons[type]}
        <p className="text-sm flex-1 pt-0.5">{message}</p>
        <button
          onClick={onClose}
          className="hover:opacity-70 transition-opacity flex-shrink-0"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
