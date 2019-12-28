import React, { useState, useEffect } from "react";

import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";
import { Container, Form, SubmitButton, List, Link } from "./styles";
import api from "../../services/api";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    const repositoriosLocalStorage = localStorage.getItem("repositorios");
    if (repositoriosLocalStorage) {
      setRepositorios(JSON.parse(repositoriosLocalStorage));
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (!newRepo) {
        return;
      }
      setLoading("true");

      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      const repositoriosPlus = repositorios;
      repositoriosPlus.push(data);

      // if (repositoriosPlus !== repositorios) {
      localStorage.setItem("repositorios", JSON.stringify(repositoriosPlus));
      setRepositorios(repositoriosPlus);
      // }

      setNewRepo("");
      setLoading("false");
    } catch (error) {
      console.log(error);
      setNewRepo("");
      setLoading("false");
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
          {loading === "true" ? (
            <FaSpinner color="#000" fontSize={14} />
          ) : (
            <FaPlus color="#fff" fontSize={14} />
          )}
        </SubmitButton>
      </Form>
      <List>
        {repositorios.map(repositorio => (
          <li key={repositorio.name}>
            <span>{repositorio.name}</span>
            <Link href="/re">Detalhes</Link>
          </li>
        ))}
      </List>
    </Container>
  );
}
