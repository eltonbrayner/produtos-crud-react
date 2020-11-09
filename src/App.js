import { HashRouter } from 'react-router-dom';

import Navbar from './components/Navbar';
import Rotas from './routes';

function App() {
  return (
    <HashRouter>
      <div className="container">
        <Navbar />
        <Rotas />
      </div>
    </HashRouter>
  );
}

export default App;
