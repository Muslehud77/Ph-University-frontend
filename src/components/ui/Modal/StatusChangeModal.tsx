import { useState } from "react";
import { Button, Modal } from "antd";
import { useChangeUserStatusMutation } from "../../../redux/features/admin/userManagement.api";
import { useToastPromise } from "../../../hooks/useToastPromise";

type StatusChangeModalProps = {
  block: boolean;
  _id: string;
};

const StatusChangeModal = ({ block, _id }: StatusChangeModalProps) => {
  const { toastPromise } = useToastPromise();
  const [changeStatus] = useChangeUserStatusMutation();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    const data = { status: block ? "in-progress" : "blocked" };
    toastPromise(changeStatus, { data, _id }, "Updating status...");

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {block ? "Unblock" : "Block"}
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Are you sure you want to {block ? "Unblock" : "Block"} this user?
      </Modal>
    </>
  );
};

export default StatusChangeModal;
