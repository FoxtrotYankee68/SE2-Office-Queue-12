import {Button, Card, Container, Row, Navbar, Nav, Form, Dropdown} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState} from 'react'
import PropTypes from "prop-types";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css"
import API from "../API/API";
import {Counter} from "../Models/counter";
import {Service} from "../Models/service";

interface AdminCountersPageProbs {
    services: Service[];
}


function AdminCountersPage( {services }: AdminCountersPageProbs) {
    const navigate = useNavigate();

    const [counters, setCounters] = useState(Array(10).fill(new Counter()));

    const handleSelect = (selectedValue: string | null, index: number) => {
        if(selectedValue === null) return;
        const updatedCounters = [...counters];
        updatedCounters[index] = new Counter(index + 1, selectedValue);
        setCounters(updatedCounters);
    };

    const handleSubmit = async () => {
        if (counters.includes('Select an option')) {
            alert("Please select a service for all counters before submitting.");
            return;
        }

        try{
            for (const counter of counters) {
                await API.findServiceByName(counter.name)
                    .then(async (service: Service) => {
                        await API.addCounterService(counter.id, service.id);
                    })
            }

            await API.resetQueues()
        } catch (err) {
            console.log(err);
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
                <Dropdown data-bs-theme="dark" className="ms-auto">
                    <Dropdown.Toggle id="dropdown-basic" variant="secondary">Switch to</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                        key="0"
                        eventKey="admin"
                        onClick={() => navigate("/home")}>
                            Customer               
                        </Dropdown.Item>
                        <Dropdown.Item
                        key="1"
                        eventKey="employee"
                        onClick={() => navigate("/employee")}>
                            Employee              
                        </Dropdown.Item>
                
                        </Dropdown.Menu>
                    </Dropdown>
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
                                            {counter.name}
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