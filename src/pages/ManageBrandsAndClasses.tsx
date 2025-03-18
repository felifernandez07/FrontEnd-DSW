import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, ListGroup, Button, Form } from "react-bootstrap";
import axios from "axios";
import { AddBrandForm } from "../components/AddBrandForm";
import { AddClassForm } from "../components/AddClassForm";
import { ScrollToTopButton } from "../components/ScrollToTopButton.tsx";
import {AutoScroll} from "../components/AutoScroll.tsx";
interface Brand {
    id: string;
    nombre: string;
    descripcion: string;
}

interface Class {
    id: string;
    name: string;
    description: string;
}

export function ManageBrandsAndClasses() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);
    const [editingBrand, setEditingBrand] = useState<string | null>(null);
    const [editingClass, setEditingClass] = useState<string | null>(null);
    const [brandEdits, setBrandEdits] = useState({ nombre: "", descripcion: "" });
    const [classEdits, setClassEdits] = useState({ name: "", description: "" });

    useEffect(() => {
        fetchBrands();
        fetchClasses();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/product/brands");
            setBrands(response.data.data);
        } catch (error) {
            console.error("Error al obtener las marcas", error);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/product/classes");
            setClasses(response.data.data);
        } catch (error) {
            console.error("Error al obtener las clases", error);
        }
    };

    // Activar edición de marca con autoscroll
    const startEditingBrand = (brand: Brand) => {
        setEditingBrand(brand.id);
        setBrandEdits({ nombre: brand.nombre, descripcion: brand.descripcion });
    };

    // Activar edición de clase con autoscroll
    const startEditingClass = (cl: Class) => {
        setEditingClass(cl.id);
        setClassEdits({ name: cl.name, description: cl.description });
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Gestión de Marcas y Clases</h2>

           
            <AutoScroll targetId="edit-brand-form" trigger={editingBrand} offset={150} />

          
            <AutoScroll targetId="edit-class-form" trigger={editingClass} offset={150} />

            <Row>
                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title className="text-center">Agregar Nueva Marca</Card.Title>
                            <AddBrandForm onBrandAdded={() => fetchBrands()} />
                        </Card.Body>
                    </Card>
                    <h4 className="mt-4">Marcas Existentes</h4>
                    <ListGroup>
                        {brands.map(brand => (
                            <ListGroup.Item key={brand.id} className="d-flex justify-content-between align-items-center">
                                {editingBrand === brand.id ? (
                                    <div id="edit-brand-form" style={{ width: "100%" }}>
                                        <Form.Control
                                            value={brandEdits.nombre}
                                            onChange={(e) => setBrandEdits(prev => ({ ...prev, nombre: e.target.value }))}
                                            placeholder="Nombre de la Marca"
                                            className="mb-2"
                                        />
                                        <Form.Control
                                            value={brandEdits.descripcion}
                                            onChange={(e) => setBrandEdits(prev => ({ ...prev, descripcion: e.target.value }))}
                                            placeholder="Descripción"
                                            className="mb-2"
                                        />
                                        <div>
                                            <Button variant="success" onClick={() => setEditingBrand(null)} className="me-2">Guardar</Button>
                                            <Button variant="secondary" onClick={() => setEditingBrand(null)}>Cancelar</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <span>{brand.nombre}</span>
                                        <div>
                                            <Button variant="warning" className="ms-2" onClick={() => startEditingBrand(brand)}>Editar</Button>
                                            <Button variant="danger" className="ms-2" onClick={() => console.log("Eliminar")}>Eliminar</Button>
                                        </div>
                                    </>
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>

                <Col md={6}>
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title className="text-center">Agregar Nueva Clase</Card.Title>
                            <AddClassForm onClassAdded={() => fetchClasses()} />
                        </Card.Body>
                    </Card>
                    <h4 className="mt-4">Clases Existentes</h4>
                    <ListGroup>
                        {classes.map(cl => (
                            <ListGroup.Item key={cl.id} className="d-flex justify-content-between align-items-center">
                                {editingClass === cl.id ? (
                                    <div id="edit-class-form" style={{ width: "100%" }}>
                                        <Form.Control
                                            value={classEdits.name}
                                            onChange={(e) => setClassEdits(prev => ({ ...prev, name: e.target.value }))}
                                            placeholder="Nombre de la Clase"
                                            className="mb-2"
                                        />
                                        <Form.Control
                                            value={classEdits.description}
                                            onChange={(e) => setClassEdits(prev => ({ ...prev, description: e.target.value }))}
                                            placeholder="Descripción"
                                            className="mb-2"
                                        />
                                        <div>
                                            <Button variant="success" onClick={() => setEditingClass(null)} className="me-2">Guardar</Button>
                                            <Button variant="secondary" onClick={() => setEditingClass(null)}>Cancelar</Button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <span>{cl.name}</span>
                                        <div>
                                            <Button variant="warning" className="ms-2" onClick={() => startEditingClass(cl)}>Editar</Button>
                                            <Button variant="danger" className="ms-2" onClick={() => console.log("Eliminar")}>Eliminar</Button>
                                        </div>
                                    </>
                                )}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>

            {/* Botón flotante para volver arriba */}
            <ScrollToTopButton />
        </Container>
    );
}