import { FC } from "react";
import { Alert } from "react-bootstrap";

interface IAlertError {
  header: string;
  message: string;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertError: FC<IAlertError> = ({
  header,
  message,
  show,
  setShow,
}: IAlertError) => {
  return (
    <Alert
      variant="danger"
      show={show}
      onClose={() => setShow(false)}
      dismissible
      style={{
        position: "absolute",
        bottom: "10px",
        right: "10px",
        margin: 0,
      }}
    >
      <Alert.Heading>{header}</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};

export default AlertError;
