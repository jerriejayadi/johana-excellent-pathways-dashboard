import { useState } from "react";
import Input from "../Input";
import Modal, { ModalProps } from "../Modal";
import { CgSpinner } from "react-icons/cg";

interface AddAttendanceModalProps extends ModalProps {
  onSuccess: () => void;
}

export default function AddAttendanceModal({
  ...props
}: AddAttendanceModalProps) {
  const [date, setDate] = useState<any>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      props.onClose();
      setDate("");
      props.onSuccess();
    }, 3000);
  };
  return (
    <Modal {...props}>
      <Input
        onChange={(e) => {
          setDate(e.target.value);
        }}
        value={date}
        id={`attendance-date`}
        label={`Tanggal Masuk`}
        className={`appearance-none accent-dark-text`}
        type={`date`}
        placeholder={`DD/MM/YYYY`}
      />
      <button
        disabled={date === "" || isLoading}
        onClick={() => {
          handleSubmit();
        }}
        className={`bg-dark-primary w-full py-3 rounded-lg mt-4 active:bg-dark-primary/70 transition-all duration-150 disabled:bg-gray-600 flex items-center justify-center `}
      >
        {isLoading ? (
          <CgSpinner className={`size-6 animate-spin`} />
        ) : (
          "Tambah Presensi"
        )}
      </button>
    </Modal>
  );
}
