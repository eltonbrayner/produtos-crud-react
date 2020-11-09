import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="jumbotron">
      <h1 className="display-3">Bem vindo!</h1>
      <p className="lead">
        Sistema de cadastro de produtos. Utilize a barra de navegação para
        acessar as páginas.
      </p>
      <hr className="my-5" />
      <p className="lead">
        <Link
          className="btn btn-primary btn-lg"
          to="/cadastro-produtos"
          role="button"
        >
          Cadastrar Produtos
        </Link>
      </p>
    </div>
  );
}
