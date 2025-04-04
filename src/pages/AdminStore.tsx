import { Col, Row, Container, Button, Modal } from "react-bootstrap";
import { StoreAdmin } from "../components/StoreAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddProductForm } from "../components/AddProductForm";
import { ScrollToTopButton } from "../components/ScrollToTopButton"; // Asegúrate de que este componente exista

type Product = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  productBrand: string;
  productClass: string;
  imgUrl?: string;
};

export function StoreAdm() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 8;
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; nombre: string } | null>(null);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products?page=${page}&limit=${limit}`
      );
      const data = response.data;
      setProducts((prev) =>
        page === 1 ? data.data : [...prev, ...data.data]
      );
      setHasMore(page < data.totalPages);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const confirmDelete = (id: string, name: string) => {
    setItemToDelete({ id, nombre: name });
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (itemToDelete?.id) {
      try {
        await axios.delete(`http://localhost:3000/api/products/${itemToDelete.id}`);
        setPage(1);
        setProducts([]);
        setShowDeleteModal(false);
        setItemToDelete(null);
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        // Aquí podrías agregar alguna notificación al usuario sobre el error
      }
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Container>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map((product) => (
          <Col key={product.id}>
            <StoreAdmin
              {...product}
              onEdit={() => handleEdit(product)}
              onDelete={() => confirmDelete(product.id, product.nombre)}
            />
          </Col>
        ))}
      </Row>

      {hasMore && (
        <div className="text-center mt-4">
          <Button onClick={() => setPage((prev) => prev + 1)}>Ver más</Button>
        </div>
      )}

      <Container className="mt-5">
        <AddProductForm
          onProductAdded={() => {
            setPage(1);
            setProducts([]);
          }}
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
        />
      </Container>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres eliminar <strong>{itemToDelete?.nombre || ''}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <ScrollToTopButton />
    </Container>
  );
}