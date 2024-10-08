import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import API from '../API/API';
import Homepage from './Homepage';
import AdminPage from './AdminPage';
import AdminServicesPage from './AdminServicesPage';

function App() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <Container fluid style={{ padding: 0, height: "100%" }}>
            <Routes>

                <Route path="/"
                       element={<Navigate to="/home" />}
                />

                <Route path="/home"
                       element={<Homepage />}
                />

                <Route path="/admin"
                       element={<AdminPage />}
                />
                <Route path="/admin/services"
                       element={<AdminServicesPage />}
                />

            </Routes>
        </Container>
    )
}



export default App