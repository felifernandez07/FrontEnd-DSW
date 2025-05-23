import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { API_URL } from "../config/api";
import { toast } from "react-toastify";

interface AddClassFormProps {
  onClassAdded: (newClass: { id: string; name: string; description: string }) => void;
}

export function AddClassForm({ onClassAdded }: AddClassFormProps) {
  const [classData, setClassData] = useState({ name: "", description: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClassData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/product/classes`, classData);
      const newClass = response.data.data;
      onClassAdded(newClass);
      setClassData({ name: "", description: "" });
      toast.success("Clase agregada con éxito");
    } catch (error: any) {
      console.error("Error al agregar la clase", error);
      toast.error("Error al agregar la clase");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          name="name"
          placeholder="Nombre de la Clase"
          value={classData.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Control
          name="description"
          placeholder="Descripción"
          value={classData.description}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="w-100">
        Agregar Clase
      </Button>
    </Form>
  );
}
