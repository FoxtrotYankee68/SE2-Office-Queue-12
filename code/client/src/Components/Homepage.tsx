import {Button, Card, Container, Row, Navbar, Form, Dropdown,Col} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css"
import API from "../API/API";

interface Service {
    id: number;
    name: string;
    serviceTime: number;
}

interface HomepageProps {
    services: Service[];

}



function Homepage( {services }: HomepageProps ) {
    const navigate = useNavigate()

    const [selectedService, setSelectedService] = useState('');
    const [selectedServiceId, setSelectedServiceId] = useState<number>(0);

    const [ticketNumber, setTicketNumber] = useState<number | null>(null);

    const [ticketCounter, setTicketCounter] = useState<number>(0);

    const [waitingTime, setWaitingTime] = useState<number>(0);




    const handleSelect = async (event: React.FormEvent) => {
        event.preventDefault();

        if(!selectedService) {
            alert("Please select a service before submitting.");
            return;
        }
        //todo here comes an API call
        console.log(selectedServiceId)
        const wt = await API.getWaitingTime(selectedServiceId);
        console.log(wt.waitingTime);
        const newTicketNumber = ticketCounter + 1;
        setTicketCounter(newTicketNumber);
        setTicketNumber(newTicketNumber);
        setWaitingTime(wt.waitingTime);

    }

    const formatTicketNumber = (number: number) => {
        return number.toString().padStart(5, '0');
    };

    const handleOkClick = () => {
        setTicketNumber(null);
        setSelectedService('');
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
                <Dropdown data-bs-theme="dark" className="ms-auto">
                    <Dropdown.Toggle id="dropdown-basic" variant="secondary">Switch to</Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                        key="0"
                        eventKey="admin"
                        onClick={() => navigate("/admin")}>
                            Admin                
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
        <Row className="justify-content-md-center">
          <Col md={8} lg={6}>
           
            <Card className="shadow-sm" style={{backgroundColor: 'rgb(250, 250, 210, 0.8)', padding: '10px', height: '300px'}}>
              <Card.Body>
              <Card.Title style={{ fontSize: '2rem', fontWeight: 'bold' }}>Welcome to the post office!</Card.Title>
              <Card.Text >
                   Get your ticket by choosing the service u want and clicking on the "Get Ticket" button
                </Card.Text>
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
                                            setSelectedServiceId(service.id)
                                          }}
                                        >
                                            {service.name}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                            <br/>
                            <Button
                              type="submit"
                              style={{ backgroundColor: '#FF7F50' }}
                              onClick={handleSelect}
                            >
                                Get Ticket
                            </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8} lg={6}>
            <Card className="shadow-sm" style={{backgroundColor: 'rgb(250, 250, 210, 0.8)', padding: '10px', height: '300px'}}>
        
              {ticketNumber !== null && ( 
                <Card.Body style={{backgroundColor: 'rgb(250, 250, 210, 0)'}}>
                <Card.Title>Your Ticket Number</Card.Title>
                <Card.Text style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                    {formatTicketNumber(ticketNumber)}
                </Card.Text>
                <p>Estimated waiting time: {waitingTime ? waitingTime : ''}</p>
                <Button style={{ backgroundColor: '#FF7F50' }} onClick={handleOkClick}>OK</Button>
                </Card.Body>
                    )}
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
            </Container>
        </>
    )
}

export default Homepage