import {Button, Card, Container, Row} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "./style.css"
import API from "../API/API";

function Homepage() {
    const navigate = useNavigate()

    return (
        <>
            <Container fluid>
                <Row style={{ textAlign: "center", margin: 0, padding: 0 }}>
                    <span className="adminTitle">Homepage</span>
                </Row>
                <Row style={{ justifyContent: 'center', margin: 0, padding: 0, alignItems: "center", height: "100%" }}>
                    <Button onClick={() => API.getItem("0")}>
                        Get item
                    </Button>
                    <Button onClick={() => API.addItem("0")}>
                        Add item
                    </Button>
                </Row>
            </Container>
        </>
    )
}

export default Homepage