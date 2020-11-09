import { useState, useEffect } from 'react';
import { withRouter, useRouteMatch } from 'react-router-dom';

import ProdutoService from '../../app/produtoService';

function CadastroProduto() {
  const initialValue = {
    nome: '',
    sku: '',
    descricao: '',
    preco: 0,
    fornecedor: '',
  };
  const initialAlert = {
    showErrors: [],
    showSuccess: false,
  };
  const [formInput, setFormInput] = useState(initialValue);
  const [showErrors, setShowErros] = useState(initialAlert.showErrors);
  const [showSuccess, setShowSuccess] = useState(initialAlert.showSuccess);

  function handleChange(event) {
    const { name, value } = event.target;
    return setFormInput({ ...formInput, [name]: value });
  }

  function handleSave(event) {
    setShowSuccess(false);
    setShowErros([]);
    event.preventDefault();
    try {
      let service = new ProdutoService();
      service.salvar(formInput);
      setFormInput(initialValue);
      setShowSuccess(true);
    } catch (erro) {
      console.log(erro);
      return setShowErros(erro);
    }
  }

  const match = useRouteMatch();

  useEffect(() => {
    function loadParams() {
      let sku = match.params.sku;
      if (sku) {
        let service = new ProdutoService();
        const result = service.obterProdutos().filter((el) => el.sku === sku);
        return setFormInput(...result);
      }
    }

    loadParams();
  }, []);

  return (
    <div className="card">
      <div className="card-header text-center font-weight-bold">
        Cadastro de Produto
      </div>
      <div className="card-body">
        <div
          className={
            !showSuccess ? 'hidden' : 'alert alert-dismissible alert-success'
          }
        >
          <button type="button" className="close" data-dismiss="alert">
            &times;
          </button>
          <strong>Concluido!</strong> Cadastro realizado com sucesso.
        </div>
        {showErrors.length > 0 &&
          showErrors.map((el) => {
            return (
              <div className="alert alert-dismissible alert-danger">
                <button type="button" className="close" data-dismiss="alert">
                  &times;
                </button>
                <strong>Atenção!</strong> {el}.
              </div>
            );
          })}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Nome: *</label>
              <input
                className="form-control"
                value={formInput.nome}
                name="nome"
                onChange={handleChange}
                placeholder="Nome do Produto"
                type="text"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>SKU: *</label>
              <input
                className="form-control"
                value={formInput.sku}
                name="sku"
                onChange={handleChange}
                placeholder="Numero do SKU"
                type="text"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="form-group">
              <label>Descrição:</label>
              <textarea
                className="form-control"
                value={formInput.descricao}
                name="descricao"
                onChange={handleChange}
                placeholder="Peso 30kg, público alvo crianças entre 5 e 10 anos"
              ></textarea>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label>Preço: *</label>
              <input
                value={formInput.preco}
                name="preco"
                onChange={handleChange}
                type="number"
                className="form-control"
                placeholder="R$ 100,20"
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label>Fornecedor: *</label>
              <input
                value={formInput.fornecedor}
                name="fornecedor"
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Telekids"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-1 float">
            <button
              className="btn btn-primary"
              onClick={() => setFormInput(initialValue)}
            >
              Limpar
            </button>
          </div>
          <div className="col-md-1" onClick={handleSave}>
            <button className="btn btn-success">Salvar</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CadastroProduto);
