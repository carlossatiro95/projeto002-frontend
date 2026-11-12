import { useEffect, useState } from "react";
import "./App.css";
import CardFunc from "./componentes/CardFunc";

function App() {
  const [dadosFuncionario, setDadosFuncionario] = useState({
    nome: "",
    cpf: "",
  });

  const [listaFuncionarios, setListaFuncionarios] = useState([]);

  async function carregarLista() {
    try {
      const resultado = await fetch("http://localhost:3000/funcionarios", {
        method: "GET",
      });

      const listaCarregada = await resultado.json();

      setListaFuncionarios(listaCarregada);
    } catch (error) {}
  }
  useEffect(() => {
    carregarLista();
  }, []);

  async function enviarDados(e) {
    e.preventDefault();

    try {
      const resultado = await fetch("http://localhost:3000/funcionarios", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(dadosFuncionario),
      });

      const funcionarioCadastrado = await resultado.json();

      setListaFuncionarios([...listaFuncionarios, funcionarioCadastrado]);
    } catch (error) {}
  }

  async function editarDadosFuncionario(
    idFuncionario,
    dadosEditadoFuncionario,
  ) {
    try {
      const resultado = await fetch(
        `http://localhost:3000/funcionarios/${idFuncionario}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(dadosEditadoFuncionario),
        },
      );

      const dadosAtualizadoFuncionario = await resultado.json();

      setListaFuncionarios(
        listaFuncionarios.map((dadosFuncionarioMap) =>
          dadosFuncionarioMap.id === dadosAtualizadoFuncionario.id
            ? dadosAtualizadoFuncionario
            : dadosFuncionarioMap,
        ),
      );
    } catch (error) {}
  }

  async function excluirFuncionario(idFuncionario) {
    try {
      await fetch(`http://localhost:3000/funcionarios/${idFuncionario}`, {
        method: "DELETE",
      });

      setListaFuncionarios(
        listaFuncionarios.filter(
          (dadosFuncionarioFilter) =>
            dadosFuncionarioFilter.id !== idFuncionario,
        ),
      );
    } catch (error) {}
  }
  async function excluirTudo() {
    try {
      await Promise.all(
        listaFuncionarios.map((dadosFuncionarioMap) =>
          fetch(
            `http://localhost:3000/funcionarios/${dadosFuncionarioMap.id}`,
            {
              method: "DELETE",
            },
          ),
        ),
      );

      setListaFuncionarios([]);
    } catch (error) {}
  }

  return (
    <div className="container">
      <div className="box-form">
        <form onSubmit={enviarDados}>
          <h1>Cadastro de Funcionarios</h1>
          <input
            type="text"
            placeholder="Nome"
            value={dadosFuncionario.nome}
            onChange={(e) =>
              setDadosFuncionario({ ...dadosFuncionario, nome: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="CPF"
            value={dadosFuncionario.cpf}
            onChange={(e) =>
              setDadosFuncionario({ ...dadosFuncionario, cpf: e.target.value })
            }
          />
          <button className="button-submit">Cadastrar</button>
        </form>
      </div>
      <div className="box-funcionarios">
        {listaFuncionarios.map((dadosFuncionarioMap) => (
          <CardFunc
            key={dadosFuncionarioMap.id}
            dadosFuncionarioCard={dadosFuncionarioMap}
            editarDadosFuncionarioCard={editarDadosFuncionario}
            excluirFuncionarioCard={excluirFuncionario}
          />
        ))}
        {listaFuncionarios.length > 0 && (
          <button className="delete-all" onClick={excluirTudo}>
            Excluir Tudo
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
