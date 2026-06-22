/**
 * Props:
 * isOpen
 * onClose
 * title
 * children
 */

import { useEffect } from "react";

function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-lg shadow-lg w-96">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-xl font-bold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-red-500 font-bold"
          >
            ✕
          </button>

        </div>

        <div>
          {children}
        </div>

      </div>

    </div>
  );
}

export default Modal;