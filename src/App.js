import React, { useEffect, useState } from "react";
import api from "./services/api";
import "./styles.css";

function App() {



  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
       setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const repository = {
      title: `Novo Respositório criado em ${Date.now()}`,
      url: `http://www.repositories.com/${Date.now()}`,
      techs: ['react','typescript','nodejs']
    }

    const response = await api.post('repositories', repository)
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
            <li key={ repository.id }>
            {repository.title}
          <button type="button" onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button type="button" onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
