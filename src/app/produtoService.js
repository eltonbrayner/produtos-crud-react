const PRODUTOS = '_PRODUTOS';

export function ErroValidacao(erros) {
  return (this.erros = erros);
}

export default class ProdutoService {
  obterIndex = (sku) => {
    let index = null;
    this.obterProdutos().forEach((el, i) => {
      if (el.sku === sku) {
        index = i;
      }
    });
    return index;
  };

  salvar = (produto) => {
    this.validar(produto);

    let produtos = localStorage.getItem(PRODUTOS);
    if (!produtos) {
      produtos = [];
    } else {
      produtos = JSON.parse(produtos);
    }

    const index = this.obterIndex(produto.sku);

    if (index === null) {
      produtos.push(produto);
    } else {
      produtos[index] = produto;
    }

    localStorage.setItem(PRODUTOS, JSON.stringify(produtos));
  };

  obterProdutos = () => {
    const produtos = localStorage.getItem(PRODUTOS);
    return JSON.parse(produtos);
  };

  validar = (produto) => {
    const erros = [];

    if (!produto.nome) {
      erros.push('O campo nome é obrigatório.');
    }

    if (!produto.sku) {
      erros.push('O campo SKU é obrigatório.');
    }

    if (!produto.preco || produto.preco < 1) {
      erros.push(
        'O campo preço é obrigatório e deve ser maior do que zero (0).'
      );
    }

    if (!produto.fornecedor) {
      erros.push('O campo fornecedor é obrigatório.');
    }

    if (erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  };
}
