import { useState, useEffect } from 'react';
import { useHistory, withRouter } from 'react-router-dom';

import ProdutoService from '../../app/produtoService';

function ConsultaProdutos() {
  const [dataProdutos, setDataProdutos] = useState([]);

  useEffect(() => {
    function receiveStorage() {
      let dataPrd = new ProdutoService().obterProdutos;
      return setDataProdutos(dataPrd);
    }

    receiveStorage();
  }, []);

  const history = useHistory();

  function preparaEditar(sku) {
    history.push(`/cadastro-produtos/${sku}`);
  }

  return (
    <div className="card">
      <div className="card-header text-center">Consulta Produtos</div>
      <div className="card-body">
        <table className="text-center table table-hover table-striped">
          <thead>
            <tr>
              <th>Nome</th>
              <th>SKU</th>
              <th>Preço</th>
              <th>Fornecedor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {dataProdutos &&
              dataProdutos.map((el, i) => {
                return (
                  <tr key={i}>
                    <td>{el.nome}</td>
                    <td>{el.sku}</td>
                    <td>{el.preco}</td>
                    <td>{el.fornecedor}</td>
                    <td>
                      <button
                        onClick={() => preparaEditar(el.sku)}
                        className="btn btn-warning mr-3"
                      >
                        Alterar
                      </button>
                      <button className="btn btn-danger">Excluir</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default withRouter(ConsultaProdutos);
