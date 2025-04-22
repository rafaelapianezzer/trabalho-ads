import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Modal, Button, Form } from 'react-bootstrap';
import MiniCard from './MiniCard.jsx';
import parking from "../../public/parking.png"

const floors = ['G1', 'G2', 'G3'];
const spotsPerFloor = 30;

const CardContainer = ({ floor, filter }) => {
    const floorIndex = floors.indexOf(floor);
    const startingId = floorIndex * spotsPerFloor;

    const [spots, setSpots] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedSpot, setSelectedSpot] = useState(null);
    const [reserverName, setReserverName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleClose = () => {
        setShowModal(false);
        setSelectedSpot(null);
        setReserverName('');
        setPaymentMethod('');
        setSubmitted(false);
    };

    useEffect(() => {
        const newSpots = Array.from({ length: spotsPerFloor }, (_, i) => ({
            id: startingId + i + 1,
            status: ((i + 1) % 7 === 0) ? 'occupied' : 'free'
        }));
        setSpots(newSpots);
        handleClose();
    }, [floor]);

    const visibleSpots = spots.filter(s => {
        if (filter === 'all') return true;
        return s.status === filter;
    });

    const handleSpotClick = (spot) => {
        setSelectedSpot(spot);
        setShowModal(true);
    };

    const handleConfirm = () => {
        setSpots(prev => prev.map(s => (
            s.id === selectedSpot.id ? { ...s, status: 'occupied' } : s
        )));
        toast.success('Vaga reservada com sucesso!');
        handleClose();
    };

    const handleConfirmAttempt = () => {
        setSubmitted(true);
        if (reserverName && paymentMethod) {
            handleConfirm();
        }
    };

    return (
        <div>
            <div className={"pb-5"}>
                <div className="card card-body m-4 border-light-subtle">
                    <div className="row row-cols-3 row-cols-md-5 g-3">
                        {visibleSpots.map(spot => (
                            <div key={spot.id} className="col d-flex justify-content-center">
                                <div onClick={() => handleSpotClick(spot)} style={{ cursor: 'pointer' }}>
                                    <MiniCard spot={spot} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Modal show={showModal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title> <span className={"text-primary"}>Vaga n.º </span> <span className={"text-success" }>{selectedSpot?.id}</span></Modal.Title>
                </Modal.Header>
                <Modal.Body className={" fw-semibold text-secondary"}>
                    {selectedSpot?.status === 'occupied' ? (
                        <p>Vaga ocupada no momento!</p>
                    ) : (
                        <>
                            <div className={"object-fit-cover justify-content-center align-items-center d-flex flex-column gap-2 mb-4 "}>
                                <span className={"fs-5 text-success"}>Disponível</span>
                                <img src={parking} alt="Parking Map" className="img-fluid w-50 rounded-3" />
                            </div>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome completo</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={reserverName}
                                    onChange={e => setReserverName(e.target.value)}
                                    isInvalid={submitted && !reserverName}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Campo obrigatório
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Forma de pagamento</Form.Label>
                                <Form.Select
                                    value={paymentMethod}
                                    onChange={e => setPaymentMethod(e.target.value)}
                                    isInvalid={submitted && !paymentMethod}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="cash">Cartão</option>
                                    <option value="card">Pix</option>
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Campo obrigatório
                                </Form.Control.Feedback>
                            </Form.Group>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    {selectedSpot?.status === 'occupied' ? (
                        <Button variant="secondary" onClick={handleClose}>
                            Selecionar outra vaga
                        </Button>
                    ) : (
                        <Button variant="primary" onClick={handleConfirmAttempt}>
                            Confirmar
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CardContainer;