import { FC, useContext } from "react";
import { Button, Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { HiBars3 } from "react-icons/hi2";
import { LinkContainer } from "react-router-bootstrap";
import { Context } from "../main";
import { IUser } from "../models/IUser";

const Header: FC = () => {
  const { store } = useContext(Context);

  const logout = () => {
    try {
      localStorage.removeItem("token");
      store.setAuth(false);
      store.setUser({} as IUser);
    } catch (e: any) {
      console.log(e.response?.data?.message);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" className="mb-3">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand>Car Sharing</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`}>
          <HiBars3 />
        </Navbar.Toggle>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
              Car Sharing
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3 text-center">
              <LinkContainer to="/">
                <Nav.Link>Главная</Nav.Link>
              </LinkContainer>
              <Button variant="light" onClick={() => logout()}>
                Выйти
              </Button>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default Header;
