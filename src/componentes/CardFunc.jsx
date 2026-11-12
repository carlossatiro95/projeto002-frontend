function CardFunc({dadosFuncionarioCard}) {
  return (
    <div className="funcionario">
      <div className="info-funcionario">
        <p>
          Nome: <span>{dadosFuncionarioCard.nome}</span>
        </p>
        <p>
          CPF: <span>{dadosFuncionarioCard.cpf}</span>
        </p>
      </div>
      <div className="buttons-action">
        <button>Editar</button>
        <button>Excluir</button>
      </div>
    </div>
  );
}
export default CardFunc;
