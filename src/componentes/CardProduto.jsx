import { useState } from "react";

function CardProduto({ produto, editarProduto, excluirProduto, darkMode }) {
  const [produtoEditado, setProdutoEditado] = useState({
    nome: produto.nome,
    preço: produto.preço,
  });

  const [editando, setEditadno] = useState(false);

  function salvarEdição() {
    editarProduto(produto.id, produtoEditado);
    setEditadno(false);
  }

  return (
    <div className={darkMode ? "produtoDark":"produto"}>
      {editando ? (
        <div className="inputs-produto">
          <input
            type="text"
            value={produtoEditado.nome}
            onChange={(e) =>
              setProdutoEditado({ ...produtoEditado, nome: e.target.value })
            }
          />

          <input
            type="number"
            value={produtoEditado.preço}
            onChange={(e) =>
              setProdutoEditado({ ...produtoEditado, preço: e.target.value })
            }
          />
        </div>
      ) : (
        <div className="info-produto">
          <p>
            Nome: <span>{produto.nome}</span>
          </p>
          <p>
            Preço: <span>{produto.preço}</span>
          </p>
        </div>
      )}

      <div className="buttons-action">
        {editando ? (
          <button onClick={salvarEdição}>Salvar</button>
        ) : (
          <button onClick={() => setEditadno(true)}>Editar</button>
        )}
        <button onClick={()=>(excluirProduto(produto.id))}>Deletar</button>
      </div>
    </div>
  );
}
export default CardProduto;
