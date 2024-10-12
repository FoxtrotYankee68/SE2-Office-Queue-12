import {Button, Card, Container, Row, Navbar, Nav, Form, Dropdown} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState} from 'react'
import PropTypes from "prop-types";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css"
import API from "../API/API"; 

interface Service {
    name: string;
}

interface AdminCountersPageProbs {
    services: Service[];
}


function AdminCountersPage( {services }: AdminCountersPageProbs) {
    const navigate = useNavigate();

    const [counters, setCounters] = useState(Array(10).fill('Select an option'));

    const handleSelect = (selectedValue: string | null, index: number) => {
        if(selectedValue === null) return;
        const updatedCounters = [...counters];
        updatedCounters[index] = selectedValue;
        setCounters(updatedCounters);
    };

    const handleSubmit = async () => {
        if (counters.includes('Select an option')) {
            alert("Please select a service for all counters before submitting.");
            return;
        }

        try {
            // todo: API export
            
        } catch (error) {
            alert("An error occurred while saving the counters.");
        }
    };


    return (
        <>
            <Navbar style={{ backgroundColor: '#FF7F50' }}>
             <Container background-colour="#FF7F50">
                <Navbar.Brand href="#home">
                <i className="bi bi-building"></i>{' '}
                  Office Queue
                </Navbar.Brand>
                <Button variant="outline-light" className="ms-auto" onClick={() => navigate("/home")}>
                   Switch to Costumer
                </Button>
             </Container>
            </Navbar>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Container>
                    <Row className="justify-content-center">
                        {counters.map((counter, index) => (
                            <Card key={index} className="m-3" style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Counter {index + 1}</Card.Title>
                                    <Dropdown onSelect={(selectedValue) => handleSelect(selectedValue, index)}>
                                        <Dropdown.Toggle variant="primary" id={`dropdown-${index}`}>
                                            {counter}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            {services.map((service, serviceIndex) => (
                                                <Dropdown.Item
                                                  key={serviceIndex}
                                                  eventKey={service.name}
                                                >
                                                    {service.name}
                                                </Dropdown.Item>
                                            ))}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Card.Body>
                            </Card>
                        ))}
                    </Row>
                    <Row className="justify-content-center mt-3">
                        <Button variant="success" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default AdminCountersPage