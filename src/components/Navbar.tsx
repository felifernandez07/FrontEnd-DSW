import { useEffect, useState } from "react"
import { Button, Container, Nav, Navbar as NavbarBs, Form, FormControl } from "react-bootstrap"
import { NavLink, useLocation, useNavigate, Link } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext.tsx"

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

  // Escuchar cambios en localStorage (como login o logout)
  useEffect(() => {
    const updateUserFromStorage = () => {
      const storedUser = localStorage.getItem("user")
      setUser(storedUser ? JSON.parse(storedUser) : null)
    }

    updateUserFromStorage()
    window.addEventListener("storage", updateUserFromStorage)

    return () => {
      window.removeEventListener("storage", updateUserFromStorage)
    }
  }, [])

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
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Link to="/">
          <img src="/imgs/logo.jpeg" alt="Don Julio" style={{ width: '100px', cursor: 'pointer' }} />
        </Link>

        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink}>Home</Nav.Link>
          <Nav.Link to="/store" as={NavLink}>Store</Nav.Link>
          <Nav.Link to="/about" as={NavLink}>About</Nav.Link>
        </Nav>

        {location.pathname === "/store" && (
          <Form className="d-flex me-auto" onSubmit={handleSearchSubmit}>
            <FormControl
              type="search"
              placeholder="Buscar productos"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <Button variant="outline-success" type="submit">Buscar</Button>
          </Form>
        )}

        {location.pathname === "/store" && (
          <Button
            onClick={openCart}
            style={{ width: "3rem", height: "3rem", position: "relative" }}
            variant="outline-primary"
            className="rounded-circle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor" height="24" width="24">
              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z"/>
            </svg>
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
                }}
              >
                {cartQuantity}
              </div>
            )}
          </Button>
        )}

        {/* Sección de usuario */}
        <div className="ms-3 d-flex align-items-center">
          {user ? (
            <>
              <span className="me-2">👋 Hola, {user.name} {user.lastname}</span>
              <Button variant="outline-secondary" size="sm" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <Link to="/login" style={{ textDecoration: "none", color: "#0d6efd" }}>
              Iniciar sesión
            </Link>
          )}
        </div>
      </Container>
    </NavbarBs>
  )
}

export default Navbar
