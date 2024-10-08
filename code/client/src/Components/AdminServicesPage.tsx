import {Button, Card, Container, Row, Navbar,Nav,Form,Dropdown} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState} from 'react'
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css"
import API from "../API/API";

function AdminServicesPage() {
    const navigate = useNavigate()
    // Use useState to manage the selected tab
  const [activeTab, setActiveTab] = useState('#add');
  const [serviceName, setServiceName] = useState('');
  const [serviceTime, setServiceTime] = useState('');

  // Define the content that changes based on the selected tab
  const handleAdd = () => {
    
  };

    return (
        <>
        
            <Container fluid>
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
               <Row className="justify-content-md-center">     
                <Card>
                  <Card.Header>
                    <Nav variant="tabs" 
                    defaultActiveKey="#add" 
                    onSelect={(selectedKey) => {
                        // Handle the case where selectedKey might be null
                        if (selectedKey) {
                          setActiveTab(selectedKey);
                        }
                      }}>
                      <Nav.Item>
                        <Nav.Link eventKey="#add">Add a service</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                         <Nav.Link eventKey="#edit">Edit a service</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                          <Nav.Link eventKey="#delete">Delete a service</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Card.Header>
                  {activeTab==="#add" ? (
                    <Card.Body>
                    <Card.Title>Add a Service</Card.Title>
                    <Form onSubmit={handleAdd}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Name of service</Form.Label>
                    <Form.Control
                      value={serviceName}
                      placeholder="Example: Delivery"
                      onChange={(ev) => setServiceName(ev.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Service time</Form.Label>
                    <Form.Control
                      value={serviceTime}
                      placeholder="Example: 10"
                      onChange={(ev) => setServiceTime(ev.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary">Add</Button>
                </Form>
                  </Card.Body>
                 ) : activeTab==="#edit" ?(
                    <Card.Body>
                    <Card.Title>Edit a Service</Card.Title>
                    <Dropdown data-bs-theme="dark">
                      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                        Choose a service
                      </Dropdown.Toggle>
                    <Dropdown.Menu>
                       <Dropdown.Item href="#/action-1">Financial Services</Dropdown.Item>
                       <Dropdown.Item href="#/action-2">Payment Services</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">International Services</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Information</Dropdown.Item>
                      <Dropdown.Item href="#/action-4">Delivery</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                    <Form onSubmit={handleAdd}>
                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Name of service</Form.Label>
                    <Form.Control
                      value={serviceName}
                      placeholder=""
                      onChange={(ev) => setServiceName(ev.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Service time</Form.Label>
                    <Form.Control
                      value={serviceTime}
                      placeholder=""
                      onChange={(ev) => setServiceTime(ev.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary">Edit</Button>
                </Form>
                    </Card.Body>
                 ) : (
                    <Card.Body>
                    <Card.Title>Delete a Service</Card.Title>
                    <Dropdown data-bs-theme="dark">
                      <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                        Choose a service
                      </Dropdown.Toggle>
                    <Dropdown.Menu>
                       <Dropdown.Item href="#/action-1">Financial Services</Dropdown.Item>
                       <Dropdown.Item href="#/action-2">Payment Services</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">International Services</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Information</Dropdown.Item>
                      <Dropdown.Item href="#/action-4">Delivery</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <br/>
                    <Button variant="primary">Delete</Button>
                  </Card.Body>
                 )
                }
            </Card>
          
        </Row>
      </Container>
    </div>
            </Container>
        </>
    )
}

export default AdminServicesPage