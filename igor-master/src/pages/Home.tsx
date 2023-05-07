import { useContext, useEffect } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { BsPlayFill } from "react-icons/bs";
import { GoListUnordered } from "react-icons/go";
import { IoCarSport } from "react-icons/io5";
import { Link } from "react-router-dom";
import CardPage from "../components/CardPage";
import Layout from "../components/Layout";
import { Context } from "../main";
import UserService from "../services/UserService";

const HomePage = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    UserService.getUserById(store.user.id)
      .then((response) => {
        store.setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [store]);

  return (
    <>
      <Layout>
        <h4>
          Здравствуйте, {store.user.username}{" "}
          <Badge bg="primary" pill>
            {store.user.role}
          </Badge>
        </h4>
        <Row>
          <Col md={3}>
            <Link to={`/auto`}>
              <CardPage variant="Danger" header="Взять автомобиль в аренду">
                <IoCarSport size={80} />
                <div>Быстро и дешево</div>
              </CardPage>
            </Link>
          </Col>
          <Col md={3}>
            <Link to={`/current-auto`}>
              <CardPage variant="Info" header="Активные сеансы в данный момент">
                <BsPlayFill size={80} />
                <div>Быстро и дешево</div>
              </CardPage>
            </Link>
          </Col>
          <Col md={3}>
            <Link to={`/ended-orders`}>
              <CardPage variant="Success" header="Законченные сеансы">
                <GoListUnordered size={80} />
                <div>Быстро и дешево</div>
              </CardPage>
            </Link>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default HomePage;
