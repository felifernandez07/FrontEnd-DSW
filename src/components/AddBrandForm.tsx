import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { API_URL } from "../config/api";
import { toast } from "react-toastify";

interface AddBrandFormProps {
  onBrandAdded: (newBrand: { id: string; nombre: string; descripcion: string }) => void;
}

export function AddBrandForm({ onBrandAdded }: AddBrandFormProps) {
  const [brandData, setBrandData] = useState({ nombre: "", descripcion: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBrandData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/product/brands`, brandData);
      const newBrand = response.data.data;
      onBrandAdded(newBrand);
      setBrandData({ nombre: "", descripcion: "" });
      toast.success("Marca agregada con éxito");
    } catch (error: any) {
      console.error("Error al agregar la marca", error);
      toast.error("Error al agregar la marca");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          name="nombre"
          placeholder="Nombre de la Marca"
          value={brandData.nombre}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          name="descripcion"
          placeholder="Descripción"
          value={brandData.descripcion}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        Agregar Marca
      </Button>
    </Form>
  );
}
