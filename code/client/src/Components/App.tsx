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
import EmployeePage from './EmployeePage';

function App() {
    const [isLoaded, setIsLoaded] = useState<boolean>(false);
    const [services, setServices] = useState<{ id:number; name: string; serviceTime: number }[]>([]);
    const [counters, setCounters] = useState<{ id:number; name: string; }[]>([]);
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const getCounters = async () => {
        try {
            const counters = await API.getAllCounters();
            console.log(counters);
            setCounters(counters);
        } catch (err: any) {
            setError(err.message);
        }
    };

    const getServices = async () => {
        try {
            const services = await API.getServices();
            console.log(services);
            setServices(services);

            for (const service of services) {
                API.getQueue(service.id, new Date()).catch(err => {
                    API.addQueue(service.id, new Date());
                })
            }
        } catch (err: any) {
            setError(err.message);
        }
    };

    useEffect(() => {
        getServices().then();
        getCounters().then();
    }, []);

    return (
        <Container fluid style={{ padding: 0, height: "100%" }}>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Homepage services={services} />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/employee" element={<EmployeePage counters={counters}/>} />
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