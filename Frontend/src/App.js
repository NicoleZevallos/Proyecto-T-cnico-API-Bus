import React, {useState, useEffect} from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Row, Col, Alert } from "react-bootstrap";
import ClipLoader from "react-spinners/ClipLoader";

function App() {
  const [buses, setBuses] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedBus, setSelectedBus] = useState(null);
  const size = 2;
  useEffect(() => {
    axios.get(`http://localhost:8080/bus?page=${page}&size=${size}`)
        .then(response => {
          setBuses(response.data.content);
          setTotalPages(response.data.totalPages);
        })
        .catch(error => {
          console.error('Error getting buses: ', error);
        });
  }, [page]);

  const goToNextPage = () => {
      if (page < totalPages - 1){
          setPage(page + 1)
      }
  };

  const goToPreviousPage = () => {
      if(page > 0){
          setPage(page - 1);
      }
  };

  const showBusDetails = (id) => {
      axios.get(`http://localhost:8080/bus/${id}`)
          .then(response => {
              setSelectedBus(response.data);
          })
          .catch(error => {
              console.error('Error getting bus details: ', error);
          })
  };
  const handleCloseAlert = () => {
        setSelectedBus(null);
  };

  return (
      <Container className="mt-4">
          <Row className="mb-3">
              <Col>
                  <h1 className="text-center text-primary">Lista de Buses</h1>
              </Col>
          </Row>
          <Row>
              <Col>
                  <Table striped bordered hover>
                      <thead>
                      <tr>
                          <th>ID</th>
                          <th>Número de Bus</th>
                          <th>Placa</th>
                          <th>Características</th>
                          <th>Marca</th>
                          <th>Activo</th>
                      </tr>
                      </thead>
                      <tbody>
                      {buses.length > 0 ? (
                          buses.map(bus => (
                              <tr key={bus.id} onClick={() => showBusDetails(bus.id)} style={{cursor: 'pointer'}}>
                                  <td>{bus.id}</td>
                                  <td>{bus.numeroBus}</td>
                                  <td>{bus.placa}</td>
                                  <td>{bus.caracteristicas}</td>
                                  <td>{bus.marca?.nombre}</td>
                                  <td>{bus.activo ? 'Sí' : 'No'}</td>
                              </tr>
                          ))
                      ) : (
                          <tr>
                              <td colSpan="5" className="text-center">
                                  <ClipLoader size={35} color={"#007bff"} loading={true}/>
                              </td>
                          </tr>
                      )}
                      </tbody>
                  </Table>
              </Col>
          </Row>
          <Row className="justify-content-between">
              <Col xs="auto">
                  <Button variant="secondary" onClick={goToPreviousPage} disabled={page === 0}>
                      Anterior
                  </Button>
              </Col>
              <Col xs="auto">
                  <Button variant="primary" onClick={goToNextPage} disabled={page === totalPages - 1}>
                      Siguiente
                  </Button>
              </Col>
          </Row>
          <Row className="mt-3">
              <Col>
                  <p className="text-center">
                      Página {page + 1} de {totalPages}
                  </p>
              </Col>
          </Row>
          {selectedBus && (
              <Alert variant="info" onClose={handleCloseAlert} dismissible>
                  <Alert.Heading>Detalles del Bus</Alert.Heading>
                  <p>ID: {selectedBus.id}</p>
                  <p>Número de Bus: {selectedBus.numeroBus}</p>
                  <p>Placa: {selectedBus.placa}</p>
                  <p>Características: {selectedBus.caracteristicas}</p>
                  <p>Marca: {selectedBus.marca?.nombre}</p>
                  <p>Activo: {selectedBus.activo ? 'Sí' : 'No'}</p>
              </Alert>
          )}
      </Container>
  );
}

export default App;
