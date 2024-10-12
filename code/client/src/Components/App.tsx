import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import API from '../API/API';
import Homepage from './Homepage';
import AdminPage from './AdminPage';
import AdminServicesPage from './AdminServicesPage';
import AdminCountersPage from './AdminCountersPage';

function App() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [services, setServices] = useState<{ name: string; serviceTime: number }[]>([]);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const getServices = async () => {
        try {
            const s = await API.getServices();
            console.log(s);
            setIsLoaded(true);
            setServices(s);
        } catch (e: any) {
            setError(e.message);
        }
    };

    useEffect(() => {
        getServices();
    }, []);

    return (
        <Container fluid style={{ padding: 0, height: "100%" }}>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Homepage services={services} />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route
                    path="/admin/services"
                    element={<AdminServicesPage services={services} updateServices={getServices} />}
                />
                <Route
                    path="/admin/counters"
                    element={<AdminCountersPage services={services} />}
                />
            </Routes>
        </Container>
    );
}

export default App