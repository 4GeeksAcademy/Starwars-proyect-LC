import React, { useEffect, useState } from "react";
import useGlobalReducer from "../store/useGlobalReducer";
import { CardItem } from "../components/CardItem";
import { Container, Row } from "react-bootstrap";

export const Vehicles = () => {
  const { store, dispatch } = useGlobalReducer();
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/vehicles")
      .then(res => res.json())
      .then(data => {
        const transformed = data.result.map(vehicle => ({
          id: vehicle.uid,
          name: vehicle.name
        }));
        setVehicles(transformed);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Container className="mt-4">
      <Row className="d-flex flex-wrap">
        {vehicles.map(vehicle => (
          <CardItem
            key={vehicle.id}
            item={vehicle}
            store={store}
            dispatch={dispatch}
          />
        ))}
      </Row>
    </Container>
  );
};
