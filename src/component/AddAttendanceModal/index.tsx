import { useState } from "react";
import Input from "../Input";
import Modal, { ModalProps } from "../Modal";
import { CgSpinner } from "react-icons/cg";
import { useRequest } from "ahooks";
import { postAttendance } from "@/service/attendance_module";

interface AddAttendanceModalProps extends ModalProps {
  onSuccess: () => void;
  id: string;
}

export default function AddAttendanceModal({
  ...props
}: AddAttendanceModalProps) {
  const [date, setDate] = useState<any>("");
  const [isLoading, setLoading] = useState<boolean>(false);

  const { runAsync, loading } = useRequest(postAttendance, { manual: true });

  const handleSubmit = () => {
    runAsync({ studentId: props.id, dateOfAttendance: date }).then((res) => {
      console.log(res);
      setDate("");
      props.onSuccess();
    });
    // setTimeout(() => {
    //   setLoading(false);
    //   props.onClose();
    //   setDate("");
    //   props.onSuccess();
    // }, 3000);
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
        type={`datetime-local`}
        placeholder={`DD/MM/YYYY`}
      />
      <button
        disabled={date === "" || loading}
        onClick={() => {
          handleSubmit();
        }}
        className={`bg-dark-primary w-full py-3 rounded-lg mt-4 active:bg-dark-primary/70 transition-all duration-150 disabled:bg-gray-600 flex items-center justify-center `}
      >
        {loading ? (
          <CgSpinner className={`size-6 animate-spin`} />
        ) : (
          "Tambah Presensi"
        )}
      </button>
    </Modal>
  );
}
