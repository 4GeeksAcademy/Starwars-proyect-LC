import React, { useEffect, useState } from "react";
import useGlobalReducer from "../store/useGlobalReducer";
import { CardItem } from "../components/CardItem";
import { Container, Row } from "react-bootstrap";

export const People = () => {
  const { store, dispatch } = useGlobalReducer();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch("https://www.swapi.tech/api/people")
      .then(res => res.json())
      .then(data => setPeople(data.result))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <Row>
        {people.map(person => (
          <CardItem 
            key={person.uid} 
            item={{ id: person.uid, name: person.name }} 
            store={store} 
            dispatch={dispatch} 
          />
        ))}
      </Row>
    </Container>
  );
};
