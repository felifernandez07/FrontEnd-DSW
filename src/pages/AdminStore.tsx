import { Col, Row, Container, Button, Modal } from "react-bootstrap";
import { StoreAdmin } from "../components/StoreAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddProductForm } from "../components/AddProductForm";
import { ScrollToTopButton } from "../components/ScrollToTopButton";
import { toast } from "react-toastify";
import { API_URL } from "../utilities/apiConfig";
import { LoadingSpinner } from "../components/LoadingSpinner.tsx";

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
  const [loading, setLoading] = useState(true);


  const fetchProducts = async () => {
    try {
      if (page === 1) setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/products?page=${page}&limit=${limit}`
      );
      const data = response.data;
      setProducts((prev) =>
        page === 1 ? data.data : [...prev, ...data.data]
      );
      setHasMore(page < data.totalPages);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      toast.error("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (id: string, name: string) => {
    setItemToDelete({ id, nombre: name });
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (itemToDelete?.id) {
      try {
        await axios.delete(`${API_URL}/api/products/${itemToDelete.id}`);
        setPage(1);
        setProducts([]);
        setShowDeleteModal(false);
        setItemToDelete(null);
        toast.success("Producto eliminado correctamente");
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        toast.error("Error al eliminar el producto");
      }
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    toast.info("Producto cargado para editar");
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (loading) return <LoadingSpinner />;

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
