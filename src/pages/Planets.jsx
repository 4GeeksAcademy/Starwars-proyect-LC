import React, { useEffect, useState } from "react";
import useGlobalReducer from "../store/useGlobalReducer";
import { CardItem } from "../components/CardItem";
import { Container, Row } from "react-bootstrap";

export const Planets = () => {
  const { store, dispatch } = useGlobalReducer();
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/planets")
      .then(res => res.json())
      .then(data => {
        // SWAPI devuelve la data en data.result
        const transformed = data.result.map(planet => ({
          id: planet.uid,
          name: planet.name
        }));
        setPlanets(transformed);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Container className="mt-4">
      <Row className="d-flex flex-wrap">
        {planets.map(planet => (
          <CardItem
            key={planet.id}
            item={planet}
            store={store}
            dispatch={dispatch}
          />
        ))}
      </Row>
    </Container>
  );
};
