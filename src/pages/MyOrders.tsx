import { useEffect, useState } from "react"
import { Container, Card, ListGroup, Spinner } from "react-bootstrap"
import { API_URL } from "../utilities/apiConfig"
import { useNavigate } from "react-router-dom"

interface OrderItem {
  productId: string
  quantity: number
}

interface Order {
  _id: string
  name: string
  createdAt: string
  paymentMethod: string
  items: OrderItem[]
}

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return navigate("/login")

    fetch(`${API_URL}/api/orders/my-orders`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setOrders(data.data))
      .catch(err => {
        console.error("Error al cargar órdenes:", err)
      })
      .finally(() => setLoading(false))
  }, [navigate])

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Cargando historial de órdenes...</p>
      </Container>
    )
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Mis Órdenes</h2>

      {orders.length === 0 ? (
        <p>No tenés órdenes registradas aún.</p>
      ) : (
        orders.map(order => (
          <Card key={order._id} className="mb-4">
            <Card.Header>
              <strong>Orden #{order._id}</strong> — {new Date(order.createdAt).toLocaleDateString()}
            </Card.Header>
            <ListGroup variant="flush">
              {order.items.map((item, index) => (
                <ListGroup.Item key={index}>
                  Producto ID: {item.productId} — Cantidad: {item.quantity}
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <strong>Método de pago:</strong> {order.paymentMethod}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        ))
      )}
    </Container>
  )
}
