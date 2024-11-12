import { Button, Container, Nav, Navbar as NavbarBs, Form, FormControl } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { Link } from 'react-router-dom'
import { useState } from "react";


const Navbar = () => {
    const { openCart, cartQuantity } = useShoppingCart();
    const location = useLocation(); // Hook para obtener la ruta actual
    const [searchQuery, setSearchQuery] = useState(""); // Estado para el valor de búsqueda

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery((e.target as HTMLInputElement).value);
    };

    const handleSearchSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Buscar:", searchQuery);
        //redirigir o realizar acciones según el valor de `searchQuery`

        // Realiza la búsqueda de productos
        if (searchQuery.trim()) {
            // Redirige a la página de tienda con el término de búsqueda
            window.location.href = `/store?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
            <Container>

                <div>
                    <Link to ="/"> <img 
        src={"../imgs/logo.jpeg"} 
        alt="Don Julio" 
        style={{ width: '100px', cursor: 'pointer' }} 
      /> </Link>
                </div>


                <Nav className="me-auto">
                    <Nav.Link to="/" as={NavLink}>
                        Home
                    </Nav.Link>
                    <Nav.Link to="/store" as={NavLink}>
                        Store
                    </Nav.Link>
                    <Nav.Link to="/about" as={NavLink}>
                        About
                    </Nav.Link>
                </Nav>

                {/* Barra de búsqueda solo en /store */}
                  {/*  location.pathname === "/store" && (
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
                )*/}


                {/* Mostrar el logo del carrito solo en la ruta /store */}
                {location.pathname === "/store" && (
                    <Button
                        onClick={openCart}
                        style={{ width: "3rem", height: "3rem", position: "relative" }}
                        variant="outline-primary"
                        className="rounded-circle"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                            <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
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
            </Container>
        </NavbarBs>
    );
}

export default Navbar