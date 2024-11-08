import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./About.css";
import Map from "../components/Map.tsx"

export function About() {

  const title = "Sobre Don Julio";
  const title2 = "Nuestra Ubicacion:"
  const leadText = "Don Julio no es solo una tienda de café, es una experiencia. Ahora también puedes disfrutar de nuestros productos en línea, desde la comodidad de tu hogar.";
  const history = "Fundada en el corazón de la región cafetera, Don Julio surge de una pasión profunda por el café auténtico y sostenible. Trabajamos con agricultores locales que comparten nuestros valores para ofrecerte un café excepcional.";
  const values = "En Don Julio, creemos en el respeto, la sostenibilidad y en apoyar a las comunidades locales. Cada compra en línea respalda nuestro compromiso con el comercio justo y el desarrollo sostenible.";

  return (
    <Container className="about-page my-5">
      <Row className="text-center mb-4">
        <Col>
          <h1 className="about-title">{title}</h1>
          <p className="about-lead">{leadText}</p>
        </Col>
      </Row>
      <Row className="align-items-start mb-5">
        <Col md={5}>
          <img
            src="public/imgs/Coffee-Bean-Extract.png"
            alt="Café en taza"
            className="img-fluid about-img rounded shadow-lg"
          />
        </Col>
        <Col md={7}>
          <h2 className="about-subtitle">Nuestra Historia</h2>
          <p className="about-description">{history}</p>
          <h2 className="about-subtitle">Nuestros Valores</h2>
          <p className="about-description">{values}</p>
        </Col>
      </Row>

      <Row>
      <h2 className="about-title2" >{title2}</h2>
          <Map />
      </Row>

      <Row className="text-center mt-5">
        <Col>
          <Card className="about-card shadow-lg">
            <Card.Body>
              <Card.Title>Únete a la Comunidad Don Julio</Card.Title>
              <Card.Text>
                Sigue nuestras redes sociales y mantente al día con las últimas novedades,
                promociones y eventos. ¡Sé parte de la familia Don Julio!
              </Card.Text>
              <div className="social-icons">
                <Button variant="link" href="https://www.facebook.com/tostaderodecafe" target="_blank">
                  <FaFacebook size={24} className="social-icon" />
                </Button>
                <Button variant="link" href="https://www.instagram.com/tostaderodecafe/" target="_blank">
                  <FaInstagram size={24} className="social-icon" />
                </Button>
                <Button variant="link" href="https://twitter.com" target="_blank">
                  <FaTwitter size={24} className="social-icon" />
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}