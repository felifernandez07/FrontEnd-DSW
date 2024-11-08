import React, {useState} from "react";
import { Container, Row, Col, Button, Form} from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import "./Footer.css"; // Si deseas agregar estilos adicionales

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Lógica para enviar el correo a una API o servicio de suscripción
      setMessage('¡Gracias por suscribirte!');
      setEmail('');
  } else {
      setMessage('Por favor, ingresa un correo electrónico válido.');
  }
};

  return (
    <footer className="footer-container">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-left">
            <h5>Don Julio Café</h5>
            <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
            <p>
              Contáctanos:{" "}
              <a href="mailto:contacto@donjulio.com" className="text-white">
                contacto@donjulio.com
              </a>
            </p>
          </Col>

          <Col md={6} className="text-center text-md-right">
            <h5>Síguenos en nuestras redes sociales</h5>
            <div>
              <a href="https://www.facebook.com/tostaderodecafe" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={30} className="text-white mx-2" />
              </a>
              <a href="https://www.instagram.com/tostaderodecafe/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={30} className="text-white mx-2" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={30} className="text-white mx-2" />
              </a>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={20} className=" text-center text-md-right">
        <div className="newsletter">
                    <h3>Suscríbete a nuestro newsletter</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email">
                            <Form.Control
                                type="email"
                                placeholder="Ingresa tu e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Suscribirse
                        </Button>
                    </Form>
                    {message && <p className="subscription-message">{message}</p>}
                </div>
                </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;