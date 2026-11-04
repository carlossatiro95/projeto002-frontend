import "./App.css";

function App() {
  return (
    <div className="container">
      <div className="box-form">
        <form>
          <h1>Cadastro de produtos</h1>

          <input type="text" placeholder="Nome" />

          <input type="number" placeholder="Preço" />

          <button className="button-submit">Cadastrar</button>
        </form>
      </div>

      <div className="box-produtos">
        <div className="produto">
          <div className="info-produto">
            <p>Nome:</p>
            <p>Preço:</p>
          </div>

          <div className="buttons-action">
            <button>Editar</button>
            <button>Deletar</button>
          </div>
        </div>
      </div>

      <button className="deletar-tudo">Deletar Tudo</button>
    </div>
  );
}

export default App;
