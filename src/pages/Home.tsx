import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaCoffee, FaLeaf, FaTruck,FaArrowLeft, FaArrowRight  } from "react-icons/fa";
import "./Home.css";
import Slider from "react-slick";
import Carousel from '../components/Carousel.tsx';
import Footer from "../components/Footer.tsx";


export function Home() {

  const productImages = [
    "/imgs/cafe_bolivia.jpg",
    "/imgs/cafe_colombia.jpg",
    "/imgs/cafe_etiopia.jpg",
  ];

  return (
    <Container className="home-page my-5">
      <Row className="text-center mb-4">
        <Col>
          <h1 className="home-title">Bienvenido a Don Julio Cafe</h1>
          <p className="home-lead">
            Descubre la experiencia del café de especialidad desde la comodidad de tu hogar. </p>
        </Col>
      </Row>

      <Carousel images={productImages} />

      <Row className="align-items-center mb-5">
        <Col md={6}>
          <h2 className="home-subtitle">Productos Destacados</h2>
          <p className="home-description">
            Cada uno de nuestros productos ha sido cuidadosamente seleccionado para ofrecerte una experiencia única. Desde el grano hasta la taza, en Don Julio vivimos el café.
          </p>
          <Button variant="primary" href="/store">
            Explorar la Tienda
          </Button>
        </Col>
        <Col md={6}>
          <img
            src="public/imgs/flat.jpg"
            alt="Café destacado"
            className="img-fluid home-img rounded shadow-lg"
          />
        </Col>
      </Row>


      <Row className="text-center mb-5">
        <Col md={4}>
          <Card className="home-card shadow-lg">
            <Card.Body>
              <FaCoffee size={32} className="home-icon mb-3" />
              <Card.Title>Café de Especialidad</Card.Title>
              <Card.Text>
                Experiencia en cada taza con los mejores granos de cada región.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="home-card shadow-lg">
            <Card.Body>
              <FaLeaf size={32} className="home-icon mb-3" />
              <Card.Title>Sostenibilidad</Card.Title>
              <Card.Text>
                Comprometidos con prácticas sostenibles y comercio justo.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="home-card shadow-lg">
            <Card.Body>
              <FaTruck size={32} className="home-icon mb-3" />
              <Card.Title>Envío Rápido</Card.Title>
              <Card.Text>
                Llevamos el sabor del café auténtico hasta la puerta de tu hogar.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer />
    </Container>


  );
}

export default Home;