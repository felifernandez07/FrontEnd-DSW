import { Col, Row, Container, Button } from "react-bootstrap";
import { StoreAdmin } from "../components/StoreAdmin";
import { useEffect, useState } from "react";
import axios from "axios";
import { AddProductForm } from "../components/AddProductForm";

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

  const deleteProduct = async (id: string) => {
    await axios.delete(`http://localhost:3000/api/products/${id}`);
    // Reiniciar desde la primera página, sin llamar directamente a fetchProducts
    setPage(1);
    setProducts([]);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map((product) => (
          <Col key={product.id}>
            <StoreAdmin
              {...product}
              onEdit={() => handleEdit(product)}
              onDelete={() => deleteProduct(product.id)}
            />
          </Col>
        ))}
      </Row>

      {hasMore && (
        <div className="text-center mt-4">
          <Button onClick={() => setPage((prev) => prev + 1)}>Ver productos</Button>
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
    </>
  );
}