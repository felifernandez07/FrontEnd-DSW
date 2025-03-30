import { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

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
            const response = await axios.post("http://localhost:3000/api/product/classes", classData);
            const newClass = response.data.data; // Asumimos que la API devuelve la nueva clase
            onClassAdded(newClass); // Notificar a ManageBrandsAndClasses sobre la nueva clase
            setClassData({ name: "", description: "" });
        } catch (error) {
            console.error("Error al agregar la clase", error);
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
