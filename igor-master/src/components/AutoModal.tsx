import { FC, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import { IAuto } from "../models/IAuto";
import AutoService from "../services/AutoService";
import OrderService from "../services/OrderService";
import AlertError from "./AlertError";
import { useNavigate } from "react-router-dom";

interface IAutoModal {
  autoId: number;
  orderId: number;
  titleButton: string;
  isEndButton: boolean;
}

const AutoModal: FC<IAutoModal> = ({
  autoId,
  orderId,
  titleButton,
  isEndButton,
}: IAutoModal) => {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [auto, setAuto] = useState({} as IAuto);

  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    AutoService.getAutoById(autoId)
      .then((response) => {
        setAuto(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [autoId]);

  const endOrder = (id: number) => {
    OrderService.endOrder(id)
      .then(() => {
        navigate(0);
      })
      .catch((error) => {
        console.log(error);
        setShowAlert(true);
      });
  };

  return (
    <>
      <AlertError
        header="Произошла ошибка!"
        message="Не удалось завершить сессию"
        show={showAlert}
        setShow={setShowAlert}
      />

      <Button variant="primary" onClick={handleShow}>
        {titleButton}
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{auto.mark}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image src="/car.png" alt="car" fluid />
          <p>
            Цвет: {auto.color}
            <br />
            Номер: {auto.number}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          {isEndButton && (
            <Button variant="primary" onClick={() => endOrder(orderId)}>
              Завершить сессию
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AutoModal;
