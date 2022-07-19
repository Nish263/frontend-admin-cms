import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useSelector, useDispatch } from "react-redux";
import { toggleModal } from "../../system-state/systemSlice";

export const VerticalModal = ({ children, title }) => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.system);
  return (
    <Modal
      onHide={() => dispatch(toggleModal(false))}
      show={showModal}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={() => dispatch(toggleModal(false))}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
