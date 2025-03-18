import { Modal, Button } from "react-bootstrap";

interface DeleteConfirmationModalProps {
    show: boolean;
    onHide: () => void;
    onConfirm: () => void;
    itemName: string;
}

export function DeleteConfirmationModal({ show, onHide, onConfirm, itemName }: DeleteConfirmationModalProps) {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>¿Estás seguro de que quieres eliminar <strong>{itemName}</strong>? Esta acción no se puede deshacer.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cancelar</Button>
                <Button variant="danger" onClick={onConfirm}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    );
}
