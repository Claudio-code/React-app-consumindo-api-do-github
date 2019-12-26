import React, { useState } from "react";

import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";
import { Container, Form, SubmitButton } from "./styles";
import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (!newRepo) {
        return;
      }
      setLoading(true);

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      const repositoriosPlus = repositorios;
      repositoriosPlus.push(data);

      setRepositorios(repositoriosPlus);
      setNewRepo("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setNewRepo("");
      setLoading(false);
    }
  }

  return (
    <Container>
      <h1>
        <FaGithubAlt />
        Repositorios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar o repositorio"
          value={newRepo}
          onChange={newValue => setNewRepo(newValue.target.value)}
        />

        <SubmitButton loading={loading}>
          {loading ? (
            <FaSpinner color="#000" fontSize={14} />
          ) : (
            <FaPlus color="#fff" fontSize={14} />
          )}
        </SubmitButton>
      </Form>
    </Container>
  );
}
