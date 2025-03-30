import { useState, useEffect } from "react";
import { Container, Row, Col, Card, ListGroup, Button, Form, Modal, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AddBrandForm } from "../components/AddBrandForm";
import { AddClassForm } from "../components/AddClassForm";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { AutoScroll } from "../components/AutoScroll";

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
  const [selectedItem, setSelectedItem] = useState<{ id: string; name: string; type: "brand" | "class" } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(user);
    if (parsedUser.role !== "admin") {
      navigate("/unauthorized");
      return;
    }

    fetchBrands();
    fetchClasses();
    setLoading(false);
  }, [navigate]);

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product/brands", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setBrands(response.data.data);
    } catch (error) {
      console.error("Error al obtener las marcas", error);
    }
  };

  const fetchClasses = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/product/classes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setClasses(response.data.data);
    } catch (error) {
      console.error("Error al obtener las clases", error);
    }
  };

  const startEditingBrand = (brand: Brand) => {
    setEditingBrand(brand.id);
    setBrandEdits({ nombre: brand.nombre, descripcion: brand.descripcion });
  };

  const startEditingClass = (cl: Class) => {
    setEditingClass(cl.id);
    setClassEdits({ name: cl.name, description: cl.description });
  };

  const saveBrandEdit = async (brandId: string) => {
    try {
      await axios.put(`http://localhost:3000/api/product/brands/${brandId}`, brandEdits, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchBrands();
      setEditingBrand(null);
      setBrandEdits({ nombre: "", descripcion: "" });
    } catch (error) {
      console.error("Error al guardar la edición de la marca", error);
    }
  };

  const saveClassEdit = async (classId: string) => {
    try {
      await axios.put(`http://localhost:3000/api/product/classes/${classId}`, classEdits, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchClasses();
      setEditingClass(null);
      setClassEdits({ name: "", description: "" });
    } catch (error) {
      console.error("Error al guardar la edición de la clase", error);
    }
  };

  const confirmDelete = (id: string, name: string, type: "brand" | "class") => {
    setSelectedItem({ id, name, type });
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      if (selectedItem?.type === "brand") {
        await axios.delete(`http://localhost:3000/api/product/brands/${selectedItem.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        fetchBrands();
      } else if (selectedItem?.type === "class") {
        await axios.delete(`http://localhost:3000/api/product/classes/${selectedItem.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        fetchClasses();
      }
    } catch (error) {
      console.error("Error al eliminar", error);
    } finally {
      setShowDeleteModal(false);
      setSelectedItem(null);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Cargando...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Gestión de Marcas y Clases</h2>

      <AutoScroll targetId="edit-brand-form" trigger={editingBrand} offset={150} />
      <AutoScroll targetId="edit-class-form" trigger={editingClass} offset={150} />

      <Row>
        {/* Marcas */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="text-center">Agregar Nueva Marca</Card.Title>
              <AddBrandForm onBrandAdded={fetchBrands} />
            </Card.Body>
          </Card>
          <h4 className="mt-4">Marcas Existentes</h4>
          <ListGroup>
            {brands.map((brand) => (
              <ListGroup.Item key={brand.id} className="d-flex justify-content-between align-items-center">
                {editingBrand === brand.id ? (
                  <div id="edit-brand-form" style={{ width: "100%" }}>
                    <Form.Control
                      value={brandEdits.nombre}
                      onChange={(e) => setBrandEdits((prev) => ({ ...prev, nombre: e.target.value }))}
                      placeholder="Nombre de la Marca"
                    />
                    <Form.Control
                      value={brandEdits.descripcion}
                      onChange={(e) => setBrandEdits((prev) => ({ ...prev, descripcion: e.target.value }))}
                      placeholder="Descripción"
                    />
                    <div className="d-flex gap-2 mt-2">
                      <Button variant="success" onClick={() => saveBrandEdit(brand.id)}>Guardar</Button>
                      <Button variant="secondary" onClick={() => setEditingBrand(null)}>Cancelar</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span>{brand.nombre}</span>
                    <div className="d-flex gap-2">
                      <Button variant="warning" onClick={() => startEditingBrand(brand)}>Editar</Button>
                      <Button variant="danger" onClick={() => confirmDelete(brand.id, brand.nombre, "brand")}>Eliminar</Button>
                    </div>
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Clases */}
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title className="text-center">Agregar Nueva Clase</Card.Title>
              <AddClassForm onClassAdded={fetchClasses} />
            </Card.Body>
          </Card>
          <h4 className="mt-4">Clases Existentes</h4>
          <ListGroup>
            {classes.map((cl) => (
              <ListGroup.Item key={cl.id} className="d-flex justify-content-between align-items-center">
                {editingClass === cl.id ? (
                  <div id="edit-class-form" style={{ width: "100%" }}>
                    <Form.Control
                      value={classEdits.name}
                      onChange={(e) => setClassEdits((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Nombre"
                    />
                    <Form.Control
                      value={classEdits.description}
                      onChange={(e) => setClassEdits((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Descripción"
                    />
                    <div className="d-flex gap-2 mt-2">
                      <Button variant="success" onClick={() => saveClassEdit(cl.id)}>Guardar</Button>
                      <Button variant="secondary" onClick={() => setEditingClass(null)}>Cancelar</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <span>{cl.name}</span>
                    <div className="d-flex gap-2">
                      <Button variant="warning" onClick={() => startEditingClass(cl)}>Editar</Button>
                      <Button variant="danger" onClick={() => confirmDelete(cl.id, cl.name, "class")}>Eliminar</Button>
                    </div>
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que quieres eliminar <strong>{selectedItem?.name}</strong>?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={handleDelete}>Eliminar</Button>
        </Modal.Footer>
      </Modal>

      <ScrollToTopButton />
    </Container>
  );
}
