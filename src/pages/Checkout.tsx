
import { Form, Button, Container, Row, Col, Card, ListGroup } from "react-bootstrap"
import axios from "axios"
import { useShoppingCart } from "../context/ShoppingCartContext"
import { useNavigate } from "react-router-dom"
import { formatCurrency } from "../utilities/formatCurrency"
import { useState, useEffect} from "react"

export function Checkout() {
  const { cartItems, products, clearCart } = useShoppingCart()
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("Tarjeta de crédito")
  const navigate = useNavigate()

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate("/") // redirige al home si no hay productos
    }
  }, [cartItems, navigate])

  const clientEmail = localStorage.getItem("clientEmail")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  
    try {
      const order = { 
        name, 
        address, 
        phone, 
        paymentMethod, 
        email: clientEmail, 
        items: cartItems }
        

      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/orders`, order)

      localStorage.setItem("lastOrderId", response.data.orderId)

      
      clearCart()
      navigate("/success", {
        state: {
          orderId: response.data.orderId,
          paymentMethod: paymentMethod
        }
      })
      
    } catch (error: any) {
      alert("Error al procesar la orden.")
    }
    
  }
  

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Finalizar compra</h2>
      <Row>
        <Col md={7}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre completo</Form.Label>
              <Form.Control
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ej: Juan Pérez"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder="Ej: Calle 1234"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Ej: 341 555 5555"
              />
            </Form.Group>
            <Form.Group className="mb-4">
             <Form.Label htmlFor="paymentMethod">Método de pago</Form.Label>
                <Form.Select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    aria-label="Seleccionar método de pago"
                    >
    <option>Tarjeta de crédito</option>
    <option>Transferencia bancaria</option>
    <option>Pago en efectivo al recibir</option>
  </Form.Select>
</Form.Group>

            <Button variant="success" type="submit">
              Confirmar Pedido
            </Button>
          </Form>
        </Col>

        <Col md={5}>
          <Card>
            <Card.Header>Resumen del pedido</Card.Header>
            <ListGroup variant="flush">
              {cartItems.map(item => {
                const product = products.find(p => p.id === item.id)
                if (!product) return null
                return (
                  <ListGroup.Item key={item.id}>
                    <div className="d-flex justify-content-between">
                      <span>{product.nombre} x{item.quantity}</span>
                      <span>{formatCurrency(product.precio * item.quantity)}</span>
                    </div>
                  </ListGroup.Item>
                )
              })}
              <ListGroup.Item className="fw-bold d-flex justify-content-between">
                <span>Total</span>
                <span>
                  {formatCurrency(
                    cartItems.reduce((total, item) => {
                      const product = products.find(p => p.id === item.id)
                      return total + (product?.precio || 0) * item.quantity
                    }, 0)
                  )}
                </span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
