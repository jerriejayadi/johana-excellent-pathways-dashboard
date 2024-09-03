import { useState, useEffect } from "react";
import { PiXBold } from "react-icons/pi";

export interface ModalProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  withCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  withCloseButton = true,
}) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  return (
    <>
      <div
        className={`z-40 fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          showModal ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <div
        className={`fixed z-50  inset-x-0 bottom-0 bg-dark-surface rounded-t-lg p-6 transition-transform duration-300 transform ${
          showModal ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className={`flex items-center justify-between`}>
          <p className={`text-xl font-bold`}>{title ?? ""}</p>
          {withCloseButton && (
            <button onClick={onClose} className={``}>
              <PiXBold className={`size-6`} />
            </button>
          )}
        </div>
        <div className={`pt-6`}> {children}</div>
      </div>
    </>
  );
};

export default Modal;
