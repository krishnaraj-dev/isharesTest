import { Modal } from "react-bootstrap";

interface ModalComponentProps {
  show: boolean;
  handleClose: () => void;
  action: string;
}

export const ModalComponent = ({
  show,
  handleClose,
  action,
}: ModalComponentProps) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="flex justify-between">
        <Modal.Title className="border-b-2 w-full mb-3 text-lg uppercase pb-2">
          {action === "sell" ? "Selling" : "Buying"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-9 text-center">
        Thank you for your interest
      </Modal.Body>
    </Modal>
  );
};
