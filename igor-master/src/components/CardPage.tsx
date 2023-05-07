import { FC, ReactNode } from "react";
import Card from "react-bootstrap/Card";

interface ICardPage {
  variant:
    | "Primary"
    | "Secondary"
    | "Success"
    | "Danger"
    | "Warning"
    | "Info"
    | "Light"
    | "Dark";
  children: ReactNode;
  header: string;
}

const CardPage: FC<ICardPage> = ({ variant, children, header }: ICardPage) => {
  return (
    <Card
      bg={variant.toLowerCase()}
      key={variant}
      text={variant.toLowerCase() === "light" ? "dark" : "white"}
      className="mb-2 text-center"
    >
      <Card.Header>{header}</Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

export default CardPage;
