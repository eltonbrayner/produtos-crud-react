import { Switch, Route } from 'react-router-dom';

import Home from './views/Home';
import CadastroProduto from './views/produtos/Cadastro';
import ConsultaProdutos from './views/produtos/Consulta';

export default () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/cadastro-produtos/:sku?"
        component={CadastroProduto}
      />
      <Route exact path="/consulta-produtos" component={ConsultaProdutos} />
    </Switch>
  );
};
