import {Button, Card, Container, Row, Navbar} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style.css"
import API from "../API/API";

function Homepage() {
    const navigate = useNavigate()


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