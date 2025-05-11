import { useEffect, useState } from "react"
import {
  Button,
  Container,
  Nav,
  Navbar as NavbarBs,
  Form,
  FormControl,
} from "react-bootstrap"
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext.tsx"
import { FaShoppingCart } from "react-icons/fa"

interface User {
  id: string
  name: string
  lastname: string
  email: string
  role?: string
}

const Navbar = () => {
  const { openCart, cartQuantity } = useShoppingCart()
  const location = useLocation()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState<User | null>(null)

  const loadUser = () => {
    const storedUser = localStorage.getItem("user")
    setUser(storedUser ? JSON.parse(storedUser) : null)
  }

  useEffect(() => {
    loadUser()
    window.addEventListener("storage", loadUser)
    return () => window.removeEventListener("storage", loadUser)
  }, [])

  useEffect(() => {
    loadUser()
  }, [location.pathname])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/store?search=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    navigate("/login")
  }

  return (
    <NavbarBs expand="lg" sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Link to="/">
          <img src="/imgs/logo.jpeg" alt="Logo Don Julio" style={{ width: "100px", cursor: "pointer" }} />
        </Link>

        <NavbarBs.Toggle aria-controls="navbar-nav" />
        <NavbarBs.Collapse id="navbar-nav">
          <Nav className="me-auto align-items-lg-center">
            <Nav.Link to="/" as={NavLink}>Inicio</Nav.Link>
            <Nav.Link to="/store" as={NavLink}>Tienda</Nav.Link>
            <Nav.Link to="/about" as={NavLink}>Nosotros</Nav.Link>
            {user && (
              <Nav.Link to="/my-orders" as={NavLink}>Mis Órdenes</Nav.Link>
            )}
          </Nav>

          {location.pathname === "/store" && (
            <Form className="d-flex me-lg-auto my-2 my-lg-0" onSubmit={handleSearchSubmit}>
              <FormControl
                type="search"
                placeholder="Buscar productos"
                className="me-2"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <Button variant="outline-success" type="submit">Buscar</Button>
            </Form>
          )}

          <div className="d-flex flex-column flex-lg-row align-items-lg-center gap-2 mt-3 mt-lg-0">
            {user ? (
              <>
                <span className="me-2">👋 Hola, {user.name} {user.lastname}</span>
                {user.role === "admin" && (
                  <Link to="/adm-store" className="btn btn-outline-dark btn-sm me-lg-2">
                    Panel Admin
                  </Link>
                )}
                <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Link to="/login" style={{ textDecoration: "none", color: "#0d6efd" }}>
                Iniciar sesión
              </Link>
            )}

            <Button
              onClick={openCart}
              style={{ width: "3rem", height: "3rem", position: "relative" }}
              variant="outline-primary"
              className="rounded-circle"
              aria-label="Ver carrito"
            >
              <FaShoppingCart size={18} />
              {cartQuantity > 0 && (
                <div
                  className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                  style={{
                    color: "white",
                    width: "1.5rem",
                    height: "1.5rem",
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    transform: "translate(25%, 25%)",
                    fontSize: "0.8rem"
                  }}
                >
                  {cartQuantity}
                </div>
              )}
            </Button>
          </div>
        </NavbarBs.Collapse>
      </Container>
    </NavbarBs>
  )
}

export default Navbar
