import {Button, Card, Container, Row, Navbar, Form, Dropdown} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css"
import API from "../API/API";

interface Service {
    name: string;
    //serviceTime: number;
}

interface HomepageProps {
    services: Service[];

}



function Homepage( {services }: HomepageProps ) {
    const navigate = useNavigate()

    const [selectedService, setSelectedService] = useState('');


    const handleSelect = async (event: React.FormEvent) => {
        event.preventDefault();

        if(!selectedService) {
            alert("Please select a service before submitting.");
            return;
        }
        //todo here comes an API call

    }

    return (
        <>
        
            <Container fluid>
            <Navbar style={{ backgroundColor: '#FF7F50' }}>
             <Container background-colour="#FF7F50">
                <Navbar.Brand href="#home">
                <i className="bi bi-building"></i>{' '}
                  Office Queue
                </Navbar.Brand>
                <Button variant="outline-light" className="ms-auto" onClick={() => navigate("/admin")}>
                   Switch to Admin
                </Button>
             </Container>
            </Navbar>
                <Row style={{ textAlign: "center", margin: 0, padding: 0 }}>
                    <span className="adminTitle">Homepage</span>
                </Row>
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <Container>
                        <Row className="justify-content-md-center">
                            <Dropdown data-bs-theme="dark">
                                <Dropdown.Toggle id="dropdown-basic" variant="secondary">
                                    {selectedService ? selectedService : "Choose a Service" }
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    {services.map((service, index) => (
                                        <Dropdown.Item
                                          key={index}
                                          eventKey={service.name}
                                          onClick={() => {
                                            setSelectedService(service.name)
                                          }}
                                        >
                                            {service.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            {/*<Form onSubmit={handleSelect}>
                                <Form.Group className="mb-3" controlId="username">
                                    <Form.Label>Test</Form.Label>

                                </Form.Group>
                            </Form>*/}
                        </Row>
                        <Row className="justify-content-md-center">
                            <Button
                              type="submit"
                              style={{ backgroundColor: '#FF7F50' }}
                              onClick={handleSelect}
                            >
                                Submit
                            </Button>
                        </Row>
                    </Container>
                </div>
                
                {/*}
                <Row style={{ justifyContent: 'center', margin: 0, padding: 0, alignItems: "center", height: "100%" }}>
                    <Button onClick={() => API.getItem("0")}>
                        Get item
                    </Button>
                    <Button onClick={() => API.addItem("0")}>
                        Add item
                    </Button>
                </Row>
                */}
            </Container>
        </>
    )
}

export default Homepage