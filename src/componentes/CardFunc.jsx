import { useState } from "react";

function CardFunc({
  dadosFuncionarioCard,
  editarDadosFuncionarioCard,
  excluirFuncionarioCard,
}) {
  const [dadosEditadoFuncionario, setDadosEditadoFuncionario] = useState({
    nome: dadosFuncionarioCard.nome,
    cpf: dadosFuncionarioCard.cpf,
  });

  const [editando, setEditando] = useState(false);

  function salvardadosEditado() {
    editarDadosFuncionarioCard(
      dadosFuncionarioCard.id,
      dadosEditadoFuncionario,
    );
    setEditando(false);
  }

  return (
    <div className="funcionario">
      {editando ? (
        <div className="inputs-card">
          <input
            type="text"
            placeholder="Nome"
            value={dadosEditadoFuncionario.nome}
            onChange={(e) =>
              setDadosEditadoFuncionario({
                ...dadosEditadoFuncionario,
                nome: e.target.value,
              })
            }
          />
          <input
            type="number"
            placeholder="CPF"
            value={dadosEditadoFuncionario.cpf}
            onChange={(e) =>
              setDadosEditadoFuncionario({
                ...dadosEditadoFuncionario,
                cpf: e.target.value,
              })
            }
          />
        </div>
      ) : (
        <div className="info-funcionario">
          <p>
            Nome: <span>{dadosFuncionarioCard.nome}</span>
          </p>
          <p>
            CPF: <span>{dadosFuncionarioCard.cpf}</span>
          </p>
        </div>
      )}

      <div className="buttons-action">
        {editando ? (
          <button onClick={salvardadosEditado}>Salvar</button>
        ) : (
          <button onClick={() => setEditando(true)}>Editar</button>
        )}
        <button onClick={() => excluirFuncionarioCard(dadosFuncionarioCard.id)}>
          Excluir
        </button>
      </div>
    </div>
  );
}
export default CardFunc;
