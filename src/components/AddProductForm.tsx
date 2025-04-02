import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card, Container } from "react-bootstrap";

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

export function AddProductForm({ onProductAdded, selectedProduct, setSelectedProduct }: AddProductFormProps) {
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        precio: "",
        stock: "",
        productBrand: "",
        productClass: ""
    });

    const [brands, setBrands] = useState<Brand[]>([]);
    const [classes, setClasses] = useState<Class[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/product/brands");
                setBrands(Array.isArray(response.data.data) ? response.data.data : []);
            } catch (error) {
                console.error("Error al obtener las marcas", error);
            }
        };

        const fetchClasses = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/product/classes");
                setClasses(Array.isArray(response.data.data) ? response.data.data : []);
            } catch (error) {
                console.error("Error al obtener las clases", error);
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
                productClass: selectedProduct.productClass
            });
        }
    }, [selectedProduct]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (selectedProduct) {
                await axios.put(`http://localhost:3000/api/products/${selectedProduct.id}`, formData);
                setSelectedProduct(null);
            } else {
                await axios.post("http://localhost:3000/api/products", formData);
            }
            onProductAdded();
            setFormData({
                nombre: "",
                descripcion: "",
                precio: "",
                stock: "",
                productBrand: "",
                productClass: ""
            });
        } catch (error) {
            console.error("Error al agregar o actualizar producto", error);
        }
    };

    const handleNavigate = () => {
        navigate("/manage");
    };

    return (
        <Card className="mb-4">
            <Card.Body>
                <Form onSubmit={handleSubmit}>
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
                            {brands.map(brand => (
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
                            {classes.map(cl => (
                                <option key={cl.id} value={cl.id}>
                                    {cl.name}
                                </option>
                            ))}
                        </Form.Select>
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