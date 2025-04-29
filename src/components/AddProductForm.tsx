import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container, Image } from "react-bootstrap";
import { API_URL } from "../config/api";
import { toast } from "react-toastify";

interface AddProductFormProps {
  onProductAdded: () => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

type Product = {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  productBrand: string;
  productClass: string;
};

type Brand = {
  id: string;
  nombre: string;
  descripcion: string;
};

type Class = {
  id: string;
  name: string;
  description: string;
};

export function AddProductForm({
  onProductAdded,
  selectedProduct,
  setSelectedProduct,
}: AddProductFormProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    productBrand: "",
    productClass: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [brands, setBrands] = useState<Brand[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/product/brands`);
        setBrands(Array.isArray(response.data.data) ? response.data.data : []);
      } catch {
        toast.error("Error al obtener las marcas");
      }
    };

    const fetchClasses = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/product/classes`);
        setClasses(Array.isArray(response.data.data) ? response.data.data : []);
      } catch {
        toast.error("Error al obtener las clases");
      }
    };

    fetchBrands();
    fetchClasses();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        nombre: selectedProduct.nombre,
        descripcion: selectedProduct.descripcion,
        precio: selectedProduct.precio.toString(),
        stock: selectedProduct.stock.toString(),
        productBrand: selectedProduct.productBrand,
        productClass: selectedProduct.productClass,
      });
    }
  }, [selectedProduct]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (image) data.append("image", image);

    try {
      if (selectedProduct) {
        await axios.put(`${API_URL}/api/products/${selectedProduct.id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Producto actualizado correctamente");
        setSelectedProduct(null);
      } else {
        await axios.post(`${API_URL}/api/products`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Producto agregado correctamente");
      }

      onProductAdded();
      setFormData({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        productBrand: "",
        productClass: "",
      });
      setImage(null);
      setImagePreview(null);
    } catch (error) {
      toast.error("Error al agregar o actualizar producto");
    }
  };

  const handleNavigate = () => {
    navigate("/manage");
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Control
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              name="descripcion"
              placeholder="Descripción"
              value={formData.descripcion}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              name="precio"
              placeholder="Precio"
              value={formData.precio}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              name="stock"
              placeholder="Stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select
              name="productBrand"
              value={formData.productBrand}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una marca</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Select
              name="productClass"
              value={formData.productClass}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione una clase</option>
              {classes.map((cl) => (
                <option key={cl.id} value={cl.id}>
                  {cl.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imagen del producto</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Vista previa"
                thumbnail
                fluid
                className="mt-3"
              />
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            {selectedProduct ? "Actualizar Producto" : "Agregar Producto"}
          </Button>
        </Form>
        <Container className="mt-3">
          <Button variant="warning" onClick={handleNavigate} className="mb-4 w-100">
            Gestionar Marcas y Clases
          </Button>
        </Container>
      </Card.Body>
    </Card>
  );
}

