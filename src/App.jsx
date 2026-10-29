import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [produto, setProduto] = useState({
    nome: "",
    preço: "",
  });

  const [listaProdutos, setListaProdutos] = useState([]);

  async function carregarLista() {
    try {
      const resultado = await fetch("http://localhost:3000/produtos", {
        method: "GET",
      });

      const listaCarregada = await resultado.json();

      setListaProdutos(listaCarregada);
    } catch (error) {}
  }

  useEffect(() => {
    carregarLista();
  }, []);

  async function enviarForm(e) {
    e.preventDefault();

    try {
      const resultado = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(produto),
      });

      const produtoCadastrado = await resultado.json();

      setListaProdutos([...listaProdutos, produtoCadastrado]);
    } catch (error) {}
  }

  return (
    <div className="container">
      <div className="box-form">
        <form onSubmit={enviarForm}>
          <h1>Cadastro de produtos</h1>
          <input
            type="text"
            value={produto.nome}
            onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
          />
          <input
            type="number"
            value={produto.preço}
            onChange={(e) => setProduto({ ...produto, preço: e.target.value })}
          />
          <button className="button-submit">Cadastrar</button>
        </form>
      </div>
      <div className="box-produtos">
        {listaProdutos.map((produtoMap) => (
          <div className="produto">
            <div className="info-produto">
              <p>Nome: {produtoMap.nome}</p>
              <p>Preço: {produtoMap.preço}</p>
            </div>
            <div className="buttons-action">
              <button>Editar</button>
              <button>Excluir</button>
            </div>
          </div>
        ))}
        {listaProdutos.length > 0 && (
          <button className="delete-all">Excluir Tudo</button>
        )}
      </div>
    </div>
  );
}

export default App;
